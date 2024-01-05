 import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
 const registerUser =asyncHandler (async(req,res)=>{
     



   
   const {fullName,email,password,username }=   req.body
   console.log("email:",email)

 if([fullName,email,password].some((item)=>item?.trim()===""))
 {
     throw new ApiError(400,"ALL filed  is required")
 }
const existedUser =  await User.findOne({$or:[{username}, {email}]})

 if(existedUser){
    throw new ApiError(400,"user exist")
 }
 
 const avatarLocalPath = req.files?.avatar?.[0]?.path;
 const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
 
 if(!avatarLocalPath){
     throw new ApiError(200," avatar local file is required")
 }
const avatar = await  uploadOnCloudinary(avatarLocalPath);
const coverImage =await uploadOnCloudinary(coverImageLocalPath);
if(!avatar){
     throw new ApiError(201,"avatar is not there")
}

const user =  await User.create({
    fullName,
    avatar:avatar.url,
    // coverImage: coverImage.url || "",
    email,
    password,
    username:username.toLowerCase()
})
const createdUser = await User.findById(user._id).select("-password -refreshToken")
 if(!createdUser){
    throw new ApiError (500 ,"error while registering the error")
 }

return res.status(201).json(

    new ApiResponse(200,createdUser,"user registered Succcesfully")
)

 })

 export default registerUser