import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { findTrainers, findTrainer, upsertTrainer } from "./utils/trainer";
import { findPokemon } from "./utils/pokemon";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/pokeapi",
  createProxyMiddleware({
    target: "https://pokeapi.co",
    changeOrigin: true,
    pathRewrite: {
      "^/api/pokeapi": "/api/v2",
    },
  })
);

app.get("/", (_req, res) => {
  res.send("Hello World");
});

/** トレーナー名の一覧の取得 */
app.get("/trainers", async (_req, res, next) => {
  try {
    const trainers = await findTrainers();
    const trainerNames = trainers.map(({ Key }) => Key.replace(/\.json$/, ""));
    res.send(trainerNames);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの追加 */
app.post("/trainer", async (req, res, next) => {
  try {
    // TODO: トレーナー名が含まれていなければ400を返す
    // TODO: すでにトレーナーが存在していれば409を返す
    const result = await upsertTrainer(req.body.name, req.body);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの取得 */
app.get("/trainer/:trainerName", async (req, res, next) => {
  try {
    const { trainerName } = req.params;
    const trainer = await findTrainer(trainerName);
    res.send(trainer);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの更新 */
app.post("/trainer/:trainerName", async (req, res, next) => {
  try {
    const { trainerName } = req.params;
    // TODO: トレーナーが存在していなければ404を返す
    const result = await upsertTrainer(trainerName, req.body);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの削除 */
// TODO: トレーナーを削除する API エンドポイントの実装

/** ポケモンの追加 */
app.put(
  "/trainer/:trainerName/pokemon/:pokemonName",
  async (req, res, next) => {
    try {
      const { trainerName, pokemonName } = req.params;
      const trainer = await findTrainer(trainerName);
      const pokemon = await findPokemon(pokemonName);
      const {
        order,
        name,
        sprites: { front_default },
      } = pokemon;
      trainer.pokemons.push({
        id: (trainer.pokemons[trainer.pokemons.length - 1]?.id ?? 0) + 1,
        nickname: "",
        order,
        name,
        sprites: { front_default },
      });
      const result = await upsertTrainer(trainerName, trainer);
      res.status(result["$metadata"].httpStatusCode).send(result);
    } catch (err) {
      next(err);
    }
  }
);

/** ポケモンの削除 */
// TODO: ポケモンを削除する API エンドポイントの実装

export default app;
