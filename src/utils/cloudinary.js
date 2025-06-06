import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';



  // Configuration
  cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const uploadOnCloudinary = async (localFilePath) => {
  
    try {
      if (!localFilePath) return null;
      // Uploading to cloudinary
      const response= await cloudinary.uploader.upload(localFilePath, {
        resource_type: 'auto',
      })
      // file has been uploaded
      // console.log("File uploaded to cloudinary",response.url);
      fs.unlinkSync(localFilePath) // delete the file from local storage
      return response;
      
    } catch (error) {
      fs.unlinkSync(localFilePath)// delete the file from local storage
      return null;
    }
  }
  
  export { uploadOnCloudinary };