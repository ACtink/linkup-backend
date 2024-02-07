import express from "express"
import dotenv from "dotenv"

dotenv.config()

import appRouter from "./routes/allroutes.js"
import connectToDb from "./connectToDb.js"
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js"
import { checkAuthentication } from "./middlewares/checkAuthentication.js"
import cors from "cors"
import User from "./models/user.js"
const app = express()


app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));

import cookieParser from "cookie-parser"


app.use(express.json());
app.use(cookieParser("hahaha"));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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




app.use("/api",appRouter)








app.get("/getallusers" , async(req, res, next)=>{

   const allusers = await User.find({})

   res.json({allusers})

})


 



  
app.get('/allrecipes', checkAuthentication, async(req, res, next)=>{

    const signedCookies = req.signedCookies
    console.log("cookies" ,signedCookies)

    // console.log("cookie token recieved from client" , token)

    // res.cookie("token-2", "72827282728gdgdb9y38b")
    // res.setHeader('Set-Cookie', 'myCookie=myCookieValue; HttpOnly; Secure; SameSite=None; Max-Age=3600');

 

    res.json({message:"take your recipes"})

    

    


})



// Use cookie-parser middleware


app.get('/readcookie', (req, res) => {
  // Access the value of 'testCookie' from req.cookies
  const cookieValue = req.signedCookies.testCookie2
  console.log(req.signedCookies)
  console.log(req.cookies)

  if (cookieValue) {
    res.send(`Cookie value: ${cookieValue}`);
  } else {
    res.send('Cookie not found!');
  }
});


app.get("/auth", checkAuthentication, (req, res)=>{

  console.log(req.userId)

  res.json({message:"inside"})




})



app.use(errorHandlerMiddleware)



app.listen(5000, ()=>{
    console.log("APP is listening on port 5000")
})