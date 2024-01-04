// //bubun123-password
















import dotenv from 'dotenv';



import mongoose  from "mongoose";

import express from 'express'
import connectDb from "./db/index.js";
import { app } from './app.js';

dotenv.config({ path: './env' });
connectDb().then(()=>{
    app.listen(process.env.PORT  || 8000 ,()=>{
         console.log(` server is connected on ${process.env.PORT}`)
    })
})
.catch((error)=>{
 console.log("MONGODB CONNECTION IS FAILED",error)
})

// (async()=>{

// try{
//   await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
// app.on("error",(error)=>{
//     console.log("cant connect app")
// })
// }
// catch(error){
//     console.log(error)
// }
// })
// app.listen(process.env.PORT,()=>{
//     console.log(`app is listen to ${process.env.PORT}`);
// })