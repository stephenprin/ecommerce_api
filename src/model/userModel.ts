import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';



export interface IUser extends mongoose.Document { 
    [x: string]: any;
    firstname: string;
    lastname: string;
    email: string;
    mobile: string; 
    password: string;
    role: string;
    cart: Array<string | number>;
    address: Array<string>;
    wishlist: Array<string>;
    isBlocked: boolean;
    refreshToken: string;
    passwordChangedAt: Date;
    passwordResetToken: string;
    passwordResetExpires: Date;


 
}
 
 // Declare the Schema of the Mongo model
 const userSchema = new mongoose.Schema<IUser>({
     firstname:{
         type:String,
         required:true,
         index:true,
     },
     lastname:{
        type:String,
       
        index:true,
    },
     
     email:{
         type:String,
         required:true,
         unique: true,
         
     },
     mobile:{
         type:String,
         required:true,
         unique:true,
     },
     password:{
         type:String,
         required: true,
         minlength: 6,
         
     },
     role: {
         type: String,
         default: "user"
     },
     isBlocked: {
         type: Boolean,
            default: false
     },

     cart: {
         type: Array,
            default: []
     },
     address: [
         {
             type: mongoose.Schema.Types.ObjectId,
                ref: "Address"
         }
     ],
     wishlist: [
         {
             type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
     ]
     ,
     refreshToken: {
         type: String,
         
     },
     passwordChangedAt: Date,
     passwordResetToken: String,
     passwordResetExpires: Date,

    
     
 },
 {
    toJSON: {
        transform(doc, ret) { 
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
     },
     timestamps: true
     },
 
 
);
 
userSchema.pre<IUser>('save', async function (next) { 
    const user = this;
    const saltRounds = 10;
    if (user.isModified('password')) { 
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

userSchema.methods.correctPassword = async function (enteredPassword: string, userPassword: string) {
    try {
        const user = this;
        return await bcrypt.compare(enteredPassword, user.password)
    } catch (error) {
        return error
    }
}
 
userSchema.methods.createPasswordResetToken = function async () { 
    const user = this;
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}


const User = mongoose.model<IUser>('User', userSchema);
export default User;