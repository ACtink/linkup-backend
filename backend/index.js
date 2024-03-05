import express from "express"
import dotenv from "dotenv"
import http from "http"
import {Server} from "socket.io"

dotenv.config()

import multer from "multer";

import appRouter from "./routes/allroutes.js"
import connectToDb from "./connectToDb.js"
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js"
import cors from "cors"
import User from "./models/user.js"
const app = express()

const port = process.env.PORT || 5000





const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this according to your CORS policy
  },
});






// const server = http.createServer(app);
// const io = new Server(server);
// const socket = io.on("connection", (socket) => {
//   console.log("this is a socket ##############" , socket)

// });






console.log("mode" ,process.env.MODE)


console.log("this is environment console.log" ,process.env.NODE_ENV)


  app.use(cors({
    origin:process.env.NODE_ENV =='production' ? "https://linkup-frontend-service.onrender.com" : "http://localhost:3000",
    credentials:true
  }));

  









import cookieParser from "cookie-parser"
import { connectToS3 } from "./utils/s3Service.js";


app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
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
  





connectToDb()

connectToS3()





app.use("/api",appRouter)



app.get("/" , async(req, res, next)=>{

   res.send("Welcome to backend API")

})




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



server.listen(port, ()=>{
    console.log(`APP is listening on port ${port}`)
})