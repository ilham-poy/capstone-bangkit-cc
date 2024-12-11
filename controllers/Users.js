import Users from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const getUsers = async(req,res)=>{
    try {
        const users = await Users.findAll(
            {attributes:['id','name','email']}
        );
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
        if(name && email && password !== null){
            await Users.create({
                name: name,
                email: email,
                password:hashPassword
            })
            res.json({msg:"Register Berhasil"})
        }else{
            res.json({msg:"Pastikan Nama, Email, Password Sudah Terisi"})
        }
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
        const accessToken = jwt.sign({userId,name,email},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'1m'
        })
        // const refereshToken = jwt.sign({userId,name,email},process.env.REFRESH_TOKEN_SECRET,{
        //     expiresIn:'1d'
        // })
        await Users.update({accessToken:accessToken},{
            where:{
                Id:userId
            }
        })
        // res.cookie('refreshToken',refereshToken,{
        //     httpOnly:true,
        //     maxAge:24*60*60*1000,
        //     secure:true
        // })
        // const data = [{userId,name,email}]
        res.json(
            {userId,
            name,
            accessToken})
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}
