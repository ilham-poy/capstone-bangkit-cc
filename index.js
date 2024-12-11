import express from 'express';
import Users from './models/UserModel.js';
import db from './config/Database.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express()

try{
    await db.authenticate();
    console.log("Database Connected")
    await Users.sync()
}catch(e){
    console.error(e)
}

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(router)
app.listen(3000, ()=> console.log('Server running at port 3000'))