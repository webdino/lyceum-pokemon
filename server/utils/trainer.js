import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { ProxyAgent } from "proxy-agent";

const config = useRuntimeConfig();

const agent = new ProxyAgent();

const s3Client = new S3Client({
  region: config.region,
  requestHandler: new NodeHttpHandler({ httpAgent: agent, httpsAgent: agent }),
});

/** トレーナーの一覧の取得 */
export const findTrainers = async () => {
  const objects = await s3Client.send(
    new ListObjectsCommand({ Bucket: config.bucketName }),
  );
  return objects.Contents ?? [];
};

/** トレーナーの取得 */
export const findTrainer = async (name) => {
  const object = await s3Client.send(
    new GetObjectCommand({
      Bucket: config.bucketName,
      Key: `${name}.json`,
    }),
  );
  const trainer = JSON.parse(await object.Body.transformToString());
  return trainer;
};

/** トレーナーの追加更新 */
export const upsertTrainer = async (name, trainer) => {
  const result = await s3Client.send(
    new PutObjectCommand({
      Bucket: config.bucketName,
      Key: `${name}.json`,
      Body: JSON.stringify({ name: "", pokemons: [], ...trainer }),
    }),
  );
  return result;
};

/** トレーナーの削除 */
export const deleteTrainer = async (name) => {
  const result = await s3Client.send(
    new DeleteObjectCommand({
      Bucket: config.bucketName,
      Key: `${name}.json`,
    }),
  );
  return result;
};
