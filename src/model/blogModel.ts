
import mongoose from "mongoose";



export interface IBlog extends mongoose.Document { 
    
    title: string;
    numViews: number;
    category: string;
    description: string;
    isLiked: boolean;
    isDisliked: boolean;
    likes: Array<string>;
    dislikes: Array<string>;
    image: string;
    author: string;


 
}
 
 // Declare the Schema of the Mongo model
 const blogSchema = new mongoose.Schema<IBlog>({
     title: {
         type: String,
            required: true,
     },
     numViews: { 
         type: Number,
            default: 0
     },
     category: {
         type: String,
            enum: ["Technology", "Sports", "Politics", "Entertainment", "Fashion"]
     },
     description: { 
         type: String,
            required: true
     },
     isLiked: {
         type: Boolean,
         default: false
     },
     isDisliked: {
         type: Boolean,
            default: false
     },
     likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
     ],
     dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
               ref: "User"
        }
     ],
     image: {
            type: String,
     },
     author: {
         type: String,
    default: "Admin"
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
const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;