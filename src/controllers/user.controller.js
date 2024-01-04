 import { asyncHandler } from "../utils/asyncHandler.js";

 const registerUser = (async(req,res)=>{
     res.status(200).json({
        message:"hey bubuneverything is okay"
     })
 })

 export default registerUser