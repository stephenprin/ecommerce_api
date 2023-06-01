import { Request, Response } from "express";
import mongoose from "mongoose";

const validateMongooseId = (id:string) => { 
    const inValid = mongoose.Types.ObjectId.isValid(id);
    if (!inValid) {
        throw new Error("Invalid Id provided");
     }else{
         return true;
     }
}

export default validateMongooseId;