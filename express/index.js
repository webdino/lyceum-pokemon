import express from "express";
import {
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import s3Client from "./utils/s3Client";
import { BUCKET_NAME } from "./utils/env";

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

/** トレーナーの一覧の取得 */
app.get("/trainers", async (req, res) => {
  try {
    const objects = await s3Client.send(
      new ListObjectsCommand({ Bucket: BUCKET_NAME })
    );
    res.send(objects.Contents);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** トレーナーの取得 */
app.get("/trainer/:trainerName", async (req, res) => {
  try {
    const object = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${req.params.trainerName}.json`,
      })
    );
    const body = await streamToString(object.Body);
    res.type("application/json").send(body);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** トレーナーの追加更新 */
app.post("/trainer", async (req, res) => {
  try {
    const result = await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${req.body.name}.json`,
        Body: JSON.stringify({ pokemons: req.body?.pokemons ?? [] }),
      })
    );
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** トレーナーの削除 */
app.delete("/trainer/:trainerName", async (req, res) => {
  try {
    const result = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${req.params.trainerName}.json`,
      })
    );
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** ポケモンの追加 */
app.put("/trainer/:trainerName/pokemon/:pokemonOrder", async (req, res) => {
  try {
    const object = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${req.params.trainerName}.json`,
      })
    );
    const trainer = JSON.parse(await streamToString(object.Body));
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${req.params.pokemonOrder}`
    );
    const {
      order,
      name,
      sprites: { front_default },
    } = await response.json();
    trainer.pokemons.push({
      id: trainer.pokemons.length + 2,
      nickname: "",
      order,
      name,
      sprites: { front_default },
    });
    const result = await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${req.params.trainerName}.json`,
        Body: JSON.stringify(trainer),
      })
    );
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** ポケモンの削除 */
app.delete("/trainer/:trainerName/pokemon/:pokemonId", async (req, res) => {
  try {
    const object = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${req.params.trainerName}.json`,
      })
    );
    const trainer = JSON.parse(await streamToString(object.Body));
    const index = trainer.pokemons.findIndex(
      (pokemon) => pokemon.id === req.params.pokemonId
    );
    trainer.pokemons.splice(index, 1);
    const result = await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${req.params.trainerName}.json`,
        Body: JSON.stringify(trainer),
      })
    );
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default app;
