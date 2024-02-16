import express from "express"
import dotenv from "dotenv"

dotenv.config()

import multer from "multer";

import appRouter from "./routes/allroutes.js"
import connectToDb from "./connectToDb.js"
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js"
import { checkAuthentication } from "./middlewares/checkAuthentication.js"
import cors from "cors"
import User from "./models/user.js"
const app = express()

const port = process.env.PORT || 5000


// app.use(cors({
//   origin:"http://localhost:3000",
//   credentials:true
// }));


// app.use(cors({
//   origin: "*",
//   credentials:true
// }));




import cookieParser from "cookie-parser"
import { connectToS3 } from "./utils/s3Service.js";
import { getMulterObject } from "./utils/multerconfig.js";


app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.setHeader('access-control-expose-headers', 'true')
 
    if (req.method === 'OPTIONS') {
      res.sendStatus(204); // Respond to OPTIONS with 204 No Content
    } else {
      next(); // Pass control to the next middleware for non-OPTIONS requests
    }
  });
  
// app.use(cors({
//   origin: true,
//   credentials: true,
// }));




connectToDb()

connectToS3()





app.use("/api",appRouter)








app.get("/getallusers" , async(req, res, next)=>{

   const allusers = await User.find({})

   res.json({allusers})

})


 



  













app.use((error, req, res, next)=>{
  if(error instanceof multer.MulterError){

          return res.status(400).json({message:error.code})
      
     
  }
  else{
    return res.status(400).json({message:error})
  }


})



app.use(errorHandlerMiddleware)



app.listen(port, ()=>{
    console.log(`APP is listening on port ${port}`)
})