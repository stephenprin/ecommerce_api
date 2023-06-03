
import mongoose from "mongoose";



export interface IProduct extends mongoose.Document { 
    
    title: string;
    slug: string;
    description: string;
    price: string;  
    category: mongoose.Schema.Types.ObjectId;
    brand: string;
    quantity: number;
    images: Array<string>;
    color:Array<string>
   
    sold: number;
  
    ratings: number


 
}
 
 // Declare the Schema of the Mongo model
 const productSchema = new mongoose.Schema<IProduct>({
     title:{
         type:String,
         required: true,
         trim: true,
         
     },
     slug:{
         type: String,
         required: true,
         unique: true,
            lowercase: true,
    },
     
     description:{
         type:String,
         required:true,
         unique: true,
         
     },
     price:{
         type:String,
         required:true,
         
     },
     category:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Category', 
        
         
     },
     brand: {
         type: String,
         enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"]
     },
     quantity: {
         type: Number,
         required: true
     },
     images: {
         type: [String],
     },
     sold: {
         type: Number,
            default: 0
     },

     color: {
        type: [String],
        enum: ["white", "black", "brown", "silver", "blue"]
      },
     ratings: [
         {
             star: Number,
             postedBy: { type: mongoose.Schema.Types.ObjectId,ref: "User"}
         }
     ]

 },
 {
    toJSON: {
        transform(doc, ret) { 
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
     },
     timestamps: true
     },
 
 
 );

//Export the model
const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;