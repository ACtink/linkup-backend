
import { AuthenticationError } from "../services/AuthenticationError.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken"


export const checkAuthentication = async (req, res, next) => {

  try {
    const token = req.signedCookies.newToken;

    if (!token) {
     
      return res.status(401).json({message:"Unauthorized"});
    }

    jwt.verify(token, process.env.SECRET_FOR_JWT_TOKEN, (err, decoded) => {
      if (err) {
        console.log("inside err")
        return res.status(401).json({message:"Unauthorized"});
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.log("inside catch err")
    // next(new AuthenticationError(err.message));
    console.log(err)
  }
};
