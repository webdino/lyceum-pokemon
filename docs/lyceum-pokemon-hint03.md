削除系 API エンドポイントを利用しないかぎりポケモンは保持する差分

```diff
--- a/express/index.js
+++ b/express/index.js
@@ -69,9 +77,21 @@ app.put(
   async (req, res, next) => {
     try {
       const { trainerName, pokemonName } = req.params;
+      const trainer = await findTrainer(trainerName); // 先にトレーナーを取得する処理を実装する必要があります
       const pokemon = await findPokemon(pokemonName);
-      // TODO: 削除系 API エンドポイントを利用しないかぎりポケモンは保持する
-      const result = await upsertTrainer(trainerName, { pokemons: [pokemon] });
+      trainer.pokemons.push({
+        id: new Date().getTime(), // 何か衝突しない値の生成方法であればなんでもいいです
+        ...pokemon,
+      });
+      const result = await upsertTrainer(trainerName, trainer);
       res.status(result["$metadata"].httpStatusCode).send(result);
     } catch (err) {
       next(err);

```
