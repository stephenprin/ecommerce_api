import { Request, Response, NextFunction } from "express";



export const requestAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new  Error("Not authorized");
    }
    next()
}