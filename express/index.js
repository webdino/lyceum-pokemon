import express from "express";
import {
  findTrainers,
  findTrainer,
  upsertTrainer,
  deleteTrainer,
} from "./utils/trainer";
import { findPokemon } from "./utils/pokemon";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

/** トレーナーの一覧の取得 */
app.get("/trainers", async (req, res) => {
  try {
    const trainers = await findTrainers();
    res.send(trainers);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** トレーナーの取得 */
app.get("/trainer/:trainerName", async (req, res) => {
  try {
    const { trainerName } = req.params;
    const trainer = await findTrainer(trainerName);
    res.send(trainer);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** トレーナーの追加更新 */
app.post("/trainer", async (req, res) => {
  try {
    const result = await upsertTrainer(req.body.name, req.body);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** トレーナーの削除 */
app.delete("/trainer/:trainerName", async (req, res) => {
  try {
    const { trainerName } = req.params;
    const result = await deleteTrainer(trainerName);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/** ポケモンの追加 */
app.put(
  "/trainer/:trainerName/pokemon/:pokemonOrder",
  async (req, res) => {
    try {
      const { trainerName, pokemonOrder } = req.params;
      const trainer = await findTrainer(trainerName);
      const pokemon = await findPokemon(pokemonOrder);
      const {
        order,
        name,
        sprites: { front_default },
      } = pokemon;
      trainer.pokemons.push({
        id: trainer.pokemons.length + 2,
        nickname: "",
        order,
        name,
        sprites: { front_default },
      });
      const result = await upsertTrainer(trainerName, trainer);
      res.status(result["$metadata"].httpStatusCode).send(result);
    } catch (err) {
    res.status(500).send(err);
    }
  }
);

/** ポケモンの削除 */
app.delete(
  "/trainer/:trainerName/pokemon/:pokemonId",
  async (req, res) => {
    try {
      const { trainerName, pokemonId } = req.params;
      const trainer = await findTrainer(trainerName);
      const index = trainer.pokemons.findIndex(
        (pokemon) => pokemon.id === pokemonId
      );
      trainer.pokemons.splice(index, 1);
      const result = await upsertTrainer(trainerName, trainer);
      res.status(result["$metadata"].httpStatusCode).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

export default app;
