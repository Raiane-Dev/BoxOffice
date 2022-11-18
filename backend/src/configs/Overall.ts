import AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3"; 

const Overall = 
{
    settupAWS: 
        AWS.config.update(
            {
                "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
                "secretAccessKey": process.env.AWS_SECRET_KEY,
                "region": process.env.AWS_REGION
            }
        ),

    settupS3: 
        new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
                secretAccessKey: String(process.env.AWS_SECRET_KEY)
              }
        }),

}

export default Overall;