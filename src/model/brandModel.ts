import mongoose from "mongoose";

export interface IBrand extends mongoose.Document { 
    
    title: string;
}
 
 // Declare the Schema of the Mongo model
 const brandSchema = new mongoose.Schema<IBrand>({
     title: {
         type: String,
         required: true,
         index: true,
         unique: true
     }
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
const Brand = mongoose.model<IBrand>('Brand', brandSchema);
export default Brand;