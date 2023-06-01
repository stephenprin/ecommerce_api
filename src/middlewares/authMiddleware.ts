import User from "../model/userModel";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";


interface UserPayload { 
    id: string;
    email: string;
}
declare global { 
    namespace Express { 
        interface Request { 
            user?: UserPayload
        }
    }
}

const auth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    if (!req.session?.jwt) {
        return next();
    }
    try { 
        const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as UserPayload;
        
        req.user = payload;

        
    } catch (error) { 
        throw new Error("Not authorized");
    
    }

    next()

})


export { auth }

