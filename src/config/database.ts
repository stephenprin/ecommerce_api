import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const database = async () => { 
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(process.env.DATABASE_URL as string, )
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection failed", error)
    }
}

export default database;  