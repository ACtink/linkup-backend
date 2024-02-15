import jwt from 'jsonwebtoken';

export const createJsonWebToken = async (userid, useremail, username, expiration) => {
  const newToken = await jwt.sign(
    {
      id: userid,
      email: useremail,
      username:username
    },
    process.env.SECRET_FOR_JWT_TOKEN,
     
    { expiresIn: expiration, 
    }
  );

  return newToken
};
