
import mongoose from "mongoose";



export interface IBlogCategory extends mongoose.Document { 
    
    title: string;

 
}
 
 // Declare the Schema of the Mongo model
 const blogcategorySchema = new mongoose.Schema<IBlogCategory>({
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
const BlogCategory = mongoose.model<IBlogCategory>('BlogCategory', blogcategorySchema);
export default BlogCategory;