import jwt from 'jsonwebtoken'
import User from "../Models/userModel.js"
import asyncHandler from "./asyncHandler.js"

const authenticate=asyncHandler(async(req,res,next)=>{
    let token;

    //Read JWT from the 'jwt' cookie
    token=req.cookies.jwt

    if(token){
        try{
            //Verify the JWT token
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            //Get the user from the database
            req.user=await User.findById(decoded.userId).select('-password')
            next();

        }catch(err){
            return res.status(401).json({success:false,message:"Not authorized,token failed"})
        }
    }else{
        return res.status(401).json({success:false,message:"Not authorized,no token"})
    }
})

//Check for the admin
const authorizeAdmin=asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        return res.status(401).json({success:false,message:"Not authorized,admin required"})
    }
})

export {authenticate,authorizeAdmin} 