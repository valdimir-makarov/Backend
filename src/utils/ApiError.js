

 class ApiError extends Error{

     constructor(statusCode,
        message ="some thing went worng",
        error=[],
        stack =""){
            super(message)
            this.statusCode =statusCode
            this.date = null,
            this.success = false;
            this.errors = this.errors
   if(stack){
    this.stack =stack
   }
   else{
    Error.captureStackTrace (this,this.constructor)
   }
  
        }
 }
 export {ApiError}