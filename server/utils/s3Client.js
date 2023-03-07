import { S3Client } from "@aws-sdk/client-s3";

const config = useRuntimeConfig();
const s3Client = new S3Client({ region: config.region });

export default s3Client;
