import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
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
// TODO: トレーナーを取得する S3 クライアント処理の実装

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
// TODO: トレーナーを削除する S3 クライアント処理の実装
