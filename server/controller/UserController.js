const bcrypt = require("bcryptjs")
const UserModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")

const registeUser = async(req,res)=>{
    try{
        const {name,email,password,profile_pic} = req.body

        const checkEmail = await UserModel.findOne({email})

        if(checkEmail){
            res.status(400).json({
                message:"User already exist",
                error:true
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt) 
        const payload = {
            name,email,password:hashPassword,profile_pic
        }
        const user = new UserModel(payload)
        const userSave = await user.save()

        return res.status(200).json({
            message:"User signup success",
            data:userSave,
            success:true
        })
  

    }
    catch(error){
        return res.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

const checkEmail = async(req,res)=>{
    try{
        const {email} = req.body
        const checkEmail = await UserModel.findOne({email}).select("-password")

        if(!checkEmail){
            res.status(400).json({
                message:"User not found",
                error:true
            })
        }

        return res.status(200).json({
            message:"email verify",
            success:true,
            data:checkEmail
        })
  

    }
    catch(error){
        return res.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

const checkPassword = async(req,res)=>{
    try{
        const {userId,password} = req.body
        const user = await UserModel.findById(userId)

        const verifyPassword = await bcrypt.compare(password,user.password)
        if(!verifyPassword){
            return res.status(400).json({
                message:"please check password",
                error:true
            })
        }

        const tokenData = {
            id:user._id,
            email:user.email
        }

        const token = await jwt.sign(tokenData,'shdfkajsdflj',{expiresIn:'1d'})

        const cookieOptions = {
            http:true,
            secure:true
        }

        
        return res.cookie("token",token,cookieOptions).status(200).json({
            message:"Login in success",
            token:token,
            success:true
        })
    }
    catch(error){
        return res.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

const userDetails = async(req,res)=>{
    try{
        const token = req.cookies.token || '' 
        const user = await getUserDetailsFromToken(token)
        return res.status(200).json({
            messsage:"user details",
            data:user,
            success:true
        })
    }
    catch(error){
        return res.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

const logout = async(req,res)=>{
    try{
        const cookieOptions ={
            http:true,
            success:true
        }
        return res.cookie("token",'',cookieOptions).status(200).json({
            message:"session out",
            success:true
        })
    }
    catch(error){
        return res.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}





module.exports = {registeUser,checkEmail,checkPassword,userDetails,logout}

