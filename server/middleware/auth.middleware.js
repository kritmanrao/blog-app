import jwt from "jsonwebtoken";
import User from "../module/User.js";

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({ message: "Unauthorized - token invalid" });
    }
    const user = await User.findById(decode.UserId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protected route middleWare", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
}
