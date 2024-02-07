import jwt from 'jsonwebtoken';

export const createJsonWebToken = (userid, useremail) => {
  const newToken = jwt.sign(
    {
      id: userid,
      name: useremail,
    },
    process.env.SECRET_FOR_JWT_TOKEN,
     
    { expiresIn: "7h", 
    }
  );

  return newToken
};
