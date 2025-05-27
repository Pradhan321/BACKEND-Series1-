import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" 

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN , 
  credentials: true,
})) 
// here we are using the cors middleware to allow cross-origin requests from the specified origin
// and also allowing credentials to be included in the requests
// this is useful when we want to send cookies or authorization headers with the requests
app.use(express.json({limit: "10kb" }))
app.use(express.urlencoded({limit: "10kb", extended: true}))
app.use(express.static("public"))
app.use(cookieParser())
// here we are using the cookie-parser middleware to parse cookies from the request headers
// and make them available in req.cookies object
// this is useful when we want to read cookies from the requests
// and use them for authentication or other purposes
// here we are using the express.json middleware to parse json data from the request body
// and make it available in req.body object
// this is useful when we want to read json data from the requests
// and use it for processing or storing in the database
// here we are using the express.urlencoded middleware to parse urlencoded data from the request body
// and make it available in req.body object
// this is useful when we want to read urlencoded data from the requests
// and use it for processing or storing in the database
// here we are using the express.static middleware to serve static files from the public directory
// and make them available in the requests
// this is useful when we want to serve images, css, js files or any other static files from the server
// and make them available in the requests


//routes import
import userRouter from "./routes/user.routes.js";


//routes declaration
app.use("/api/v1/users", userRouter)
// here we are using the userRouter to handle all the requests that start with /users
//http://localhost:3000/api/v1/users/register

export {app}