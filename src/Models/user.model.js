import mongoose, {Schema} from "mongoose";
var jwt = require('jsonwebtoken');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }


    )


    userSchema.pre('save',  function(next) {
        if (!this.isModified("password")){
           
   next()
          }
           this.password =  bcrypt.hash(this.password,10)
             
        next();
      });

 userSchema.methods.isPasswordCorrect = async function(password){

    return await    bcrypt.compare(password,this.password)

 }

  userSchema.methods.generateAccessToken = async function(password){

 const token = await jwt.sign({

       id:this.id,
       email:this.email,
       username:this.username,
        fullName:this.fullName



 },process.env.ACCESS_TOKEN_SECRET , {expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
 return token
     
  }


  userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


 userSchema.methods.passwordVerify = async function(token){


  jwt.verify(token,ACCESS_TOKEN_SECRET,  function(err,data){

 if(err){
     console.log("jwt Verification error")
 }
 else{
     console.log("verified successfully")
 }

  })

 }



export const User = mongoose.model("User", userSchema)