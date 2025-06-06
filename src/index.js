import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';


dotenv.config({path: './.env'});

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 5000, () => {
    console.log(`⚙️  Server is running at port : ${process.env.PORT}`)
  })
  // app.on("error",(err)=>{
  //   console.log("ERROR: ",err)
  //   throw err
  })

.catch((err)=>{
    console.log("Database connection failed !!!", err);
})