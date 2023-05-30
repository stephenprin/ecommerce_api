import jwt from 'jsonwebtoken';

const genereateToken = (id: string, email: string) => { 
    return jwt.sign({ id, email }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN! });
} 

export default genereateToken;