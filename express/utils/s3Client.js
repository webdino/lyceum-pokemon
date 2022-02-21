import { S3Client } from "@aws-sdk/client-s3";
import { REGION } from "./env";

const s3Client = new S3Client({ region: REGION });

export default s3Client;
