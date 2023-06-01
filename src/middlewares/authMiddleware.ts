import User from "../model/userModel";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import {IUser} from "../model/userModel";


interface userPayload { 
    id: string;
    email: string;
    
}
declare global { 
    namespace Express { 
        interface Request { 
            user?: userPayload;
        }
    }
}

const auth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    if (!req.session?.jwt) {
        return next();
    }
    try { 
        const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as userPayload;
        
        req.user = payload;

        
    } catch (error) { 
        throw new Error("Not authorized");
    
    }

    next()

})

const isAdmin = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.user as userPayload;
    const adminUser = await User.findOne({ email: email });
    console.log(adminUser)
    if (adminUser?.role === "admin") { 
        next()
    } else {
        res.status(401)
        throw new Error("Not authorized as an admin")
    }
})

export { auth, isAdmin }

