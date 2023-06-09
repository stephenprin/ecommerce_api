import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './config/database';


import { auth, product, blog, prodcategory, blogcategory,  brand} from './routes';  
import { errorHandler, notFound } from './middlewares/errorHandle';
import cookieSession from 'cookie-session';
 
dotenv.config();
database();
import morgan from 'morgan';


const app: Express = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
        
    }
));
app.use(cookieSession({
  signed: false,
  secure: false,
  maxAge: 24 * 60 * 60 * 1000 

}));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use("/api/auth", auth);
app.use("/api/product", product);
app.use("/api/blog", blog);
app.use("/api/prodcategory", prodcategory);
app.use("/api/blogcategory", blogcategory);
app.use("/api/brand", brand);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});