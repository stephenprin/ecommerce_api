
import mongoose from "mongoose";



export interface ICategory extends mongoose.Document { 
    
    title: string;

 
}
 
 // Declare the Schema of the Mongo model
 const categorySchema = new mongoose.Schema<ICategory>({
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
const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;