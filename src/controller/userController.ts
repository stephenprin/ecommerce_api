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
export { register , login, getAllUser,logout}