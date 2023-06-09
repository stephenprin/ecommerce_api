import { Request, Response } from 'express';
import User from '../model/userModel';
import expressAsyncHandler from 'express-async-handler';
import generateToken from '../config/jwtToken';    
import validateMongooseId from '../utils/validateMongoseId';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendEmailWithArguments } from './emailController';




const register = expressAsyncHandler(async (req: Request, res: Response) => { 
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.status(201).json({
            message: "User created successfully",
            data: newUser
        });
    } else {
        res.status(400);
        throw new Error("User already exists");
    }
})

const login = expressAsyncHandler(async ( req: Request, res: Response) => { 
    const { email, password } = req.body;

    if (!email || !password) {
           res.status(400)
           throw new Error("Please provide email and password")
      }
  
      const user = await User.findOne({ email }).select("+password");
    const correct = await user?.correctPassword(password, user.password);
    
    if (!user || !correct) { 
        res.status(401);
        throw new Error("Incorrect email or password");
    }
    const userJwt = generateToken(user.id, user.email);
    req.session = {
        jwt: userJwt
     }

    res.status(200).json({
        message: "User logged in successfully",
        data: {
            user: user,
            token: userJwt
        }
    });
    
})


const getAllUser = expressAsyncHandler(async (req: Request, res: Response) => { 
    try {
        const users = await User.find({});
    res.status(200).json({
        message: "All users",
        data: users
    });
    } catch (error) {
        throw new Error("Something went wrong");
    }
})

const getUserById = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    validateMongooseId(id)
    const user = await User.findById({ id: id });
   
   
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        message: "User found",
        data: user
    } );
})
const deleteUser = expressAsyncHandler(async (req: Request, res: Response) => { 
    try {
        const deleterUser = await User.findByIdAndDelete(req.params.id);
        if (!deleterUser) { 
            res.status(404);
            throw new Error("User not found");
        }
        res.status(200).json({
            message: "User deleted successfully",
        });
        
    } catch (error) {
        throw new Error("Something went wrong");
        
    }
})

const updateUser = expressAsyncHandler(async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        validateMongooseId(id)
        const updateUser = await User.findByIdAndUpdate(id, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,

        }, { new: true });

        res.status(200).json({
            message: "User updated successfully",
            data: updateUser
        });
        
    } catch (error) {
        throw new Error("  Something went wrong");
    }
})
const blockUser = expressAsyncHandler(async (req: Request, res: Response) => { 
    const { id } = req.params;
    validateMongooseId(id)
    try {
        const blockUser = await User.findByIdAndUpdate(id, {
            isBlocked: true
        }, { new: true });
        res.status(200).json({
            message: "User blocked successfully",
            data: blockUser
        })
        
    } catch (error) {
        res.status(404).json({
            message: "User not found",
            error
        })
    }
})
const unBlockUser = expressAsyncHandler(async (req: Request, res: Response) => { 
    const { id } = req.params;
    validateMongooseId(id)
    try {
        const unblockUser = await User.findByIdAndUpdate(id, {
            isBlocked: false
        }, { new: true });
        res.status(200).json({
            message: "User unblocked successfully",
            data: unblockUser
        })
    } catch (error) {
        res.status(404).json({
            message: "User not found",
            error
        })
    }
})

const refreshToken = expressAsyncHandler(async (req: Request, res: Response) => { 
    const refreshToken = req.session?.jwt;
    if (!refreshToken) {  
        res.status(401);
        throw new Error("You are not authenticated");
    }
    
    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET! );
        const user = await User.findOne({ payload });

        if (!user) {
            res.status(401);
            throw new Error("user not found");
        }
        const newAccessToken = generateToken(user.id, user.email);
        res.status(200).json({
            message: "Token refreshed successfully",
            accessToken: newAccessToken
        })
    } catch (error) {
        res.status(401);
        throw new Error("You are not authenticated");
    }
})



const updatePassword = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user;
    const { password } = req.body;
    validateMongooseId(id);

    try {
        const user = await User.findById(id);

        if (!password) {
            res.status(400).json({ message: "Please provide a password" });
            return;
        }

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isPasswordMatch = await user.correctPassword (password, user.password);

        if (isPasswordMatch) {
            res.status(400).json({ message: "Please provide a new password" });
            return;
        }

        user.password = password;
        const updatedUser = await user.save();

        res.status(200).json({
            message: "Password updated successfully",
            data: updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

const forgotPasswordToken = expressAsyncHandler(async (req: Request, res: Response) => { 
    const { email } = req.body;
    if (!email) {
      throw new Error("Please provide an email");
    }
    const user = await User.findOne({ email: email });
    if (!user) { 
        throw new Error("User not found");
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`
    const message = `Forgot your password? Please follow this link to reset your password ${resetUrl}.\nIf you didn't forget your password, please ignore this email!`;
    try { 
        const emailData={
            to: user.email,
            subject: "Your password reset token (valid for 10 min)",
            text:user.firstname,
            html:message
        }
        sendEmailWithArguments(emailData)
       .then(() => {
        console.log('Email sent successfully');
        })
       .catch((error) => {
        console.error('Error sending email:', error);
       });
        
        res.status(200).json({
            message: "Token sent to email",
            data: resetToken
        })

    }catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        throw new Error("Something went wrong");
    }

})

const resetPassword = expressAsyncHandler(async (req: Request, res: Response) => { 
    const { token } = req.params;
    const { password } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    try {
        const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
        if(!user){
            throw new Error("Token is invalid or has expired");
        }
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.status(200).json({
            message: "Password reset successfully",
            data: user
        });
    
   } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });
   }
})

const logout = expressAsyncHandler(async (req: Request, res: Response) => { 
    try {
        req.session = null;
        res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        throw new Error("Something went wrong");
    }
})
export {
    register, login,
    getAllUser, logout,
    getUserById, deleteUser,
    updateUser,
    blockUser, unBlockUser,
    refreshToken,
    updatePassword,
    forgotPasswordToken,
    resetPassword
}