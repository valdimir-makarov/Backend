import express from "express";



 import  cors from "cors"
  import cookieParser from "cookie-parser";
const app =express()

app.use(cors({
//alowing origins: which frontend urls can talk with our backend -the orgin selects that
 origin :process.env.CORS_ORIGIN,
 credentials :true 

}))//middle wares


app.use(express.json({limit:"16kb"}))//this will monitor how much request can come at a time
app.use(express.urlencoded({extended:true,limit:"13kb"}))
app.use(express.static("public"))
app.use(cookieParser())


export {app}