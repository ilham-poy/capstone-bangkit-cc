import Users from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const getUsers = async(req,res)=>{
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 export const Register = async(req, res)=>{
    const {name, email, password} = req.body;

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password,salt)
    try{
        await Users.create({
            name: name,
            email: email,
            password:hashPassword
        })
        res.json({msg:"Register Berhasil"})
    }catch(e){
        console.log(e)
    }
 }

 export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const data = [{userId,name,email}]
        res.json(data)
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}
