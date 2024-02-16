
import { AuthenticationError } from "../services/AuthenticationError.js";

export const errorHandlerMiddleware = (err, req, res, next)=>{

    if(err instanceof AuthenticationError ){

        return res.status(err.status).json({ error: err.message });

    }



    

}