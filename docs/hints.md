# ヒント集

---

## ヒント 01

開発サーバーを立てるスクリプト `npm run dev` は差分ビルドをおこなうので `npm run build` は不要です

ようするにとりあえず開発するのであれば `npm run dev` しておけば大丈夫です

`.env` を編集し環境変数の内容を変更した場合は Ctrl + C を入力して開発サーバーを停止・再起動してください（変更前の `.env` ファイルが読まれ続けるため）

---

## ヒント 02

@aws-sdk/client-s3 の使い方が載っているドキュメント

- [S3 Client - AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html)
- [Amazon S3 バケットの作成と使用 - AWS SDK for JavaScript](https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html)

---

## ヒント 03

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

---

## ヒント 04

トレーナーがいなければ「つづきからはじめる」に遷移不可能にする差分

```diff
--- a/pages/index.vue
+++ b/pages/index.vue
@@ -1,7 +1,10 @@
 <script>
 export default {
   async setup() {
-    return {};
+    const { data: trainers } = await useTrainers();
+    return {
+      trainers,
+    };
   },
 };
 </script>
@@ -10,9 +13,12 @@ export default {
   <div>
     <h1>ポケットモンスター</h1>
     <GamifyList>
-      <GamifyItem>
+      <GamifyItem v-if="trainers.length > 0">
         <NuxtLink to="/trainer">つづきからはじめる</NuxtLink>
       </GamifyItem>
+      <GamifyItem v-else>
+        <span>つづきからはじめる</span>
+      </GamifyItem>
       <GamifyItem>
         <NuxtLink to="/new">あたらしくはじめる</NuxtLink>
       </GamifyItem>
```

---

## ヒント 05

Nuxt における動的なルーティングの提供方法の和訳

> ## 動的ルート
>
> かぎ括弧で囲った中に何かを記述した場合、その部分は動的ルートパラメーターに変換されます。
> ファイル名かディレクトリに対して、複数のパラメーターもしくは静的なテキストを組み合わせることができます。
> （省略）
>
> ### 例
>
> ```
> -| pages/
> ---| index.vue
> ---| users-[group]/
> -----| [id].vue
> ```

---

> 上記の例では、 `$route` オブジェクトから group / id にアクセスすることができます
>
> ```
> <template>
>   {{ $route.params.group }}
>   {{ $route.params.id }}
> </template>
> ```
>
> `/users-admins/123` に移動すると以下のように表示されます
>
> ```
> admins 123
> ```

https://v3.nuxtjs.org/docs/directory-structure/pages#dynamic-routes

---

## ヒント 06

フロントエンド側から用意したサーバー API を取得するコードサンプル

useFetch を使う場合

```js
const config = useRuntimeConfig();

// data: リアクティブなレスポンスボディ
// refresh: 再読み込みする関数
const { data, refresh } = useFetch(`${config.backendOrigin}/api/trainers`);

// 動的な URL に対しては文字列を返す関数を引数に渡します
const { data, refresh } = useFetch(
  () => `${config.backendOrigin}/api/trainer/${trainerName}`
);
```

参考: https://v3.nuxtjs.org/docs/usage/data-fetching

---

## ヒント 07

トレーナー名をリクエストボディに含めてトレーナー追加 API を叩く差分

```diff
--- a/pages/new.vue
+++ b/pages/new.vue
@@ -1,7 +1,38 @@
 <script>
uexport default {
   setup() {
-    return {};
+    const router = useRouter();
+    const config = useRuntimeConfig();
+    const trainerName = ref("");
+    const onSubmit = async () => {
+      const response = await fetch(`${config.backendOrigin}/api/trainer`, {
+        method: "POST",
+        headers: {
+          "Content-Type": "application/json",
+        },
+        body: JSON.stringify({
+          name: trainerName.value,
+        }),
+      });
+      if (!response.ok) return;
+      router.push(`/trainer/${trainerName.value}`);
+    };
+    return {
+      trainerName,
+      onSubmit,
+    };
   },
 };
 </script>
```

---

## ヒント 08

フロントエンド側でトレーナー名を入力しているかバリデーション（検証）する差分

```diff
--- a/pages/new.vue
+++ b/pages/new.vue
@@ -1,7 +1,38 @@
 <script>
 export default {
   setup() {
-    return {};
+    const trainerName = ref("");
+    const valid = computed(() => trainerName.value.length > 0);
+    return {
+      trainerName,
+      valid,
+    };
   },
 };
 </script>
```

---

## ヒント 09

トレーナー名から S3 オブジェクトキーとしての使用を避けたい文字を取り除く差分

```diff
--- a/pages/new.vue
+++ b/pages/new.vue
@@ -1,7 +1,38 @@
 <script>
 export default {
   setup() {
-    return {};
+    const trainerName = ref("");
+    const safeTrainerName = computed(() =>
+      trimAvoidCharacters(trainerName.value)
+    );
+    return {
+      trainerName,
+      safeTrainerName,
+    };
   },
 };
 </script>
```

---

## ヒント 10

トレーナーを追加する入力フォームの差分

```diff
--- a/pages/new.vue
+++ b/pages/new.vue
@@ -9,7 +40,40 @@ export default {
 <template>
   <div>
     <h1>あたらしくはじめる</h1>
-    <form @submit.prevent></form>
+    <p>では　はじめに　きみの　なまえを　おしえて　もらおう！</p>
+    <form @submit.prevent>
+      <div class="item">
+        <label for="name">なまえ</label>
+        <span id="name-description"
+          >とくていの　もじは　とりのぞかれるぞ！</span
+        >
+        <input
+          id="name"
+          @keydown.enter="onSubmit"
+          v-model="trainerName"
+          aria-describedby="name-description"
+        />
+      </div>
+      <GamifyButton type="button" @click="onSubmit">けってい</GamifyButton>
+    </form>
   </div>
 </template>

```

---

## ヒント 11

ダイアログを追加する差分

```diff
--- a/pages/new.vue
+++ b/pages/new.vue
@@ -1,7 +1,38 @@
 <script>
 export default {
   setup() {
-    return {};
+    const trainerName = ref("");
+    const { dialog, onOpen, onClose } = useDialog();
+    return {
+      trainerName,
+      dialog,
+      onOpen,
+      onClose,
+    };
   },
 };
 </script>
 @ -9,7 +40,40 @@ export default {
 <template>
   <div>
     <h1>あたらしくはじめる</h1>
     <form @submit.prevent></form>
+    <GamifyButton @click="onOpen(true)">ダイアログをひらく</GamifyButton>
+    <GamifyDialog
+      v-if="dialog"
+      id="confirm-submit"
+      title="かくにん"
+      :description="`ふむ・・・　きみは　${trainerName}　と　いうんだな！`"
+      @close="onClose"
+    >
+      <GamifyList :border="false" direction="horizon">
+        <GamifyItem>
+          <GamifyButton @click="onClose">いいえ</GamifyButton>
+        </GamifyItem>
+        <GamifyItem>
+          <GamifyButton @click="onClose">はい</GamifyButton>
+        </GamifyItem>
+      </GamifyList>
+    </GamifyDialog>
   </div>
 </template>

```
