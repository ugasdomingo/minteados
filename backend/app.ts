//Import Tools
import 'dotenv/config';
import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from 'express-fileupload';

//Import Routes
import authRouter from './routes/authRouter';
import blogRouter from "./routes/blogRouter";
import arteRouter from "./routes/arteRouter";

//Define app
const app = express()

const allowedOrigins = [process.env.ORIGIN1 as string, process.env.ORIGIN2 as string];

//Middleware
app.use(cors({
  origin: function(origin: any, callback: any){
    if(!origin || allowedOrigins.includes(origin)){
      return callback(null, origin);
    }
    return callback('Error CORS, origin: '+origin+', No autorizado')
  },
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads'
}));

//Routes
app.use('/api', authRouter);
app.use('/api/blog', blogRouter);
app.use('/api/galery', arteRouter);

//Export app
export default app