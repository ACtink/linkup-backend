import User from "../models/user.js"


export const signOutUser = async(req, res)=>{

  console.log("request came in logout")


  


  res.cookie('accessToken', '', { expires: new Date(0) });
  res.cookie('refreshToken', '', { expires: new Date(0) });


  // Respond as needed

 

    res.status(200).json({message:"successfully Signed out"})

}