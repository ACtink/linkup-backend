

import User from "../models/user.js"
import bcrypt from 'bcrypt'
import { createJsonWebToken } from "../utils/createjsontoken.js"





export const signUpUser = async (req, res, next)=>{

    const {username,email, password} = req.body

    try{
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({username, email, password:hashedPassword})
    res.status(200).json({message:"Registration Successful, Please Login"})
   
    }catch(err){
        res.status(401).json({error:err.message})

    }

 


}

