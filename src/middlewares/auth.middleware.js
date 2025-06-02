import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, _,next) => {
  try {
   console.log("Access Token (from cookie):", req.cookies?.accessToken);
   console.log("Authorization Header:", req.header("Authorization"));

   const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")



    
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    console.log("Token to verify:", token);
    console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);

    // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
