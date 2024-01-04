import {v2 as cloudinary} from 'cloudinary';
import fs from "fs" ;//file system this help use to manage the files..add remove etc 




cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET 
});



const uploadOnCloudinary = async (localFilePath) => {
     try{
 
if(!localFilePath) return null
  //upload file on cloudinary
  const response = await  cloudinary.uploader.upload(localFilePath,{
    resource_type: "auto"
  })

  console.log("file is uploaded on cloudinary")
  console.log(response.url)
  return response
     }
     catch(error){
fs.unlinkSync(localFilePath)//remove  the locally saved temp file as the upload operation got failed

     }
}






  export {uploadOnCloudinary}