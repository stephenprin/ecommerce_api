import { Request, Response } from 'express';
import User from '../model/userModel';
import expressAsyncHandler from 'express-async-handler';
import genereateToken from '../config/jwtToken';    


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
    const userJwt = genereateToken(user.id, user.email);
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
    const user = await User.findById(req.params.id);
    console.log(req.params.id)
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
    blockUser, unBlockUser
}