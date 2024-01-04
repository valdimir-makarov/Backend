
 const asyncHandler =(fn)=>async(req,res,next)=>{


 try{
     await fn(req,res,next)

 }
    
catch(error){
    console.log("eRROR IN THE  asyncHandler function",error)
}


 }
 export {asyncHandler}