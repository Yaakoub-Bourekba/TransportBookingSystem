import express, { urlencoded } from 'express';  
const app = express();
import userRoutes from './routes/routes.js'; 
import {} from 'dotenv/config';
import { connectDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(express.json());
connectDB();
app.use('/',userRoutes);
app.listen(3000,()=>console.log("the server is running on port", process.env.PORT || 3000))