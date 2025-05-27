import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser=asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exits: usrename, email
  // check for images,like avatar or cover image
  // upload images to cloudinary
  // create user object - create entry in database
  // remove password and refresh token field from response
  // check for user creation
  // send response to frontend


  const {fullname, email, username, password}=req.body
  console.log("email: ",email);

  if([fullname, email, username, password].some((field)=>field?.trim() === "")
  ){
    throw new ApiError(400,"All fields are required")
  }

  const exitedUser=User.findOne({
    $or:[{ email },{ username }]
  })
  if(exitedUser){
    throw new ApiError(409,"User already exists")
  }

 const avatarLocalPath=req.files?.avatar[0]?.path;
 const coverImagePath=req.files?.coverImage[0]?.path;

 if(!avatarLocalPath){
  throw new ApiError(400,"Avatar file is required")
 }

  const avatar=await uploadOnCloudinary(avatarLocalPath)
  const coverImage=await uploadOnCloudinary(coverImagePath);

  if(!avatar){
    throw new ApiError(400,"avatar file is required")
  }

  const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url ||"",
    email,
    password,
    username:username.toLowerCase(),
  })

  const createdUser=await User.findById(user._id).select("-password -refreshToken")
  if(!createdUser){
    throw new ApiError(500,"User creation failed")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User created successfully")
  )
})
 

export {registerUser} 