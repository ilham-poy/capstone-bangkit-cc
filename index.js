import express from 'express';
import Users from './models/UserModel.js';
import db from './config/Database.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
const PORT = process.env.PORT || 8080;

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
app.get('/', (req, res) => {
    res.send('Hello from Cloudrun!');
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
  })