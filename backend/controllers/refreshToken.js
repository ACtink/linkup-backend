import { checkAuthentication } from "../middlewares/checkAuthentication.js";

import jwt from "jsonwebtoken";
import { createJsonWebToken } from "../utils/createjsontoken.js";

export const refreshToken = async(req, res) => {

  // const refreshToken = req.signedCookies.refreshToken;

  // console.log("refresh token aaya hai",refreshToken)

  // console.log("refresh function me aayi request")

  // jwt.verify(
  //   refreshToken,
  //   process.env.SECRET_FOR_JWT_TOKEN,
  //   (error, decoded) => {
  //     if (error) {
  //       return res.status(401).json({ message: "Unauthorized" });
  //     }


      // const expiryForAccessToken = "1m"

      // const accessToken = createJsonWebToken(user._id, user.email, user.username, expiryForAccessToken );

      
      // res.cookie("accessToken", accessToken, { httpOnly: true, secure: false, signed: true });

      // res.status(200).json({ message: "hello i have updated the accessToken" });

  //   }
  // );

//   console.log("refesh token function");

//   console.log(accessToken);

//   res.status(200).json({ message: "hello" });

  // res.status(403).json({message:"error can't refresh"})



  console.log("request aayi in refresh")

  console.log("req.id hai ye" , req.userId)


  const expiryForAccessToken = "1m"

  const accessToken = await createJsonWebToken(req.userId, req.email, req.username, expiryForAccessToken );

  console.log("accesstoken after refresh" , accessToken)

  
  res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: 'Strict', signed: true });


  res.status(200).json({ message: "hello i have updated the accessToken" });













};
