
import User from "../models/user.js"
import { createJsonWebToken } from "../utils/createjsontoken.js"
import { isPasswordCorrect } from "../utils/isPasswordCorrect.js";



export const loginUser = async (req, res, next) => {
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

        const token = createJsonWebToken(user._id, user.email);

        res.cookie("newToken", token, { httpOnly: true, secure: false, signed: true });

        res.json({ success: true, message: 'Login successfull' });
    } catch (err) {
        
        // next(err);
        res.status(401).json({error:err.message})
    }
};