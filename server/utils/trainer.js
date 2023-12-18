import {
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

const config = useRuntimeConfig();

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
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
  const trainer = JSON.parse(await streamToString(object.Body));
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
