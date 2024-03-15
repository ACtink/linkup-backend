
import User from "../models/user.js"
import { createJsonWebToken } from "../utils/createjsontoken.js"
import { isPasswordCorrect } from "../utils/isPasswordCorrect.js";
import { refreshToken } from "./refreshToken.js";



export const signInUser = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email , password)

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Wrong email or password");
        }

        const passwordMatches = await isPasswordCorrect(password, user.password);
        
        console.log("passwordmatches" , passwordMatches)

        if (!passwordMatches) {
            throw new Error("Wrong email or password");
        }

       const expiryForAccessToken = "1m"
     const expiryForRefreshToken = "7d"



        const accessToken = await createJsonWebToken(user._id, user.email,  user.username, expiryForAccessToken );
        const refreshToken = await createJsonWebToken(user._id, user.email, user.username, expiryForRefreshToken );

        res.cookie("accessToken", accessToken, { httpOnly: true,   signed: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true,   signed: true });



        res.json({ success: true, message: 'Login successfull', userName:user.username , userId:user._id });
    } catch (err) {
        
        // next(err);
      return res.status(401).json({message:err.message})
    }
};