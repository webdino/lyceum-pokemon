import { S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import ProxyAgent from "proxy-agent";

const proxyHttpHandler = new NodeHttpHandler({
    httpAgent: new ProxyAgent(process.env.HTTP_PROXY),
    httpsAgent: new ProxyAgent(process.env.HTTPS_PROXY),
  });

const config = useRuntimeConfig();
const s3Client = new S3Client({ region: config.region, requestHandler: proxyHttpHandler, });

export default s3Client;
