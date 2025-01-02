import dotenv from "dotenv";
import connection from "./db/dbConnection.js";
import { app } from "./app.js";
import { v2 as cloudinary } from "cloudinary";

// const ipAddress = "192.168.1.9";

// Load environment variables
dotenv.config({
    path: "./.env"
});





cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

// Use the port from the environment variable or default to 3000
const port = process.env.PORT || 3000;



connection()
    .then(() => {
        app.listen(port,'0.0.0.0', () => {
            console.log(`Server running at http://localhost:${port}/`);
        });



    })
    .catch((err) => console.log("MongoDB connection failed", err));
