import jwt from "jsonwebtoken";

export const checkRefreshTokenValidity = async (req, res, next) => {
  try {
    const token = req.signedCookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET_FOR_JWT_TOKEN, (error, decoded) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          console.log("Token has expired");
          console.log("Expired at:", error.expiredAt);
          return res
            .status(403)
            .json({ message: "Unauthorized token expire ho gaya hai bhai" });
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }

      req.userId = decoded.id;
      req.username = decoded.username;
      req.email = decoded.email;

      next();
    });
  } catch (error) {
    console.log("inside catch err");
    // next(new AuthenticationError(err.message));
    console.log(error);
  }
};
