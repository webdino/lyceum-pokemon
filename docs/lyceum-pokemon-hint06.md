クライアント側から用意したサーバー API を取得するコード（実際には使用していないコードなので注意）

```js
// オリジンを省略しないように記述する必要があります（Nuxtの挙動の都合）
import { VITE_SERVER_ORIGIN } from "~/utils/env";

// data: リアクティブなレスポンスボディ
// refresh: 再読み込みする関数
const { data, refresh } = useFetch(`${VITE_SERVER_ORIGIN}/trainer/satoshi`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newTrainer),
});

// 特定のケースでは動的にリクエスト先のURLを変更したい場合がありますが
// useFetch ではキャッシュされた結果が返って変化しないようなので
// useAsyncData を使う必要があります
const { data, refresh } = useAsyncData(
  "/trainer/satoshi", // アクセスしたいデータと対応する一意なキー
  () =>
    $fetch(
      // $fetch は useFetch でも内部的に使われているハンドラー関数（ Fetch API の fetch とは同じ使い方にならないことに注意）
      `${VITE_SERVER_ORIGIN}/trainer/satoshi`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrainer),
      }
    )
);
```

参考: https://v3.nuxtjs.org/docs/usage/data-fetching
