
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';







export const connectToS3 = ()=>{

   const client = new S3Client({
        Region: process.env.AWS_REGION,
    
        AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
        AWS_ACCESS_KEY_ID : process.env.AWS_ACCESS_KEY_ID,
      });
    
      return client
    
}




export const uploadToS3 = async (client ,fileLocation, fileData) => {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: fileLocation,
      Body: fileData,
    });
  
    try {
      const response = await client.send(command);

      console.log(response)
      
      return response
      
    } catch (err) {
       throw new Error(err)
  
    }
  };








  



















