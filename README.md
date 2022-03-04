# lyceum-pokemon

ポケモン API を使った Nuxt+Express アプリ/サーバの開発演習

## 準備

- AWS 認証情報のアクセスキー ID とシークレットアクセスキーを生成してください
- AWS S3 バケットを作成してください

## 実行環境

- 本リポジトリをクローンして実行してください
- 環境変数は https://ja.vitejs.dev/guide/env-and-mode.html#env-files にしたがって `.env` などに設定してください

## 使い方

- `npm install`: npm パッケージのインストール
- `npm run dev`: 開発サーバーの起動
- `npm run build`: アプリケーションのプロダクションビルド
- `npm start`: プロダクションビルドを使ったローカルサーバーの起動
- `npm run lint`: コードリント
- `npm run format`: コード整形

## 環境変数

| 変数名                  | 説明                                                     | 初期値             |
| :---------------------- | :------------------------------------------------------- | :----------------- |
| `AWS_ACCESS_KEY_ID`     | AWS 認証情報のアクセスキー ID                            | なし               |
| `AWS_SECRET_ACCESS_KEY` | AWS 認証情報のシークレットアクセスキー                   | なし               |
| `REGION`                | AWS のリージョン                                         | `"ap-northeast-1"` |
| `BUCKET_NAME`           | 本アプリケーションのデータ永続化に用いる AWS S3 バケット | `""`               |
| `VITE_SERVER_ORIGIN`    | 用意したサーバー側 の API リクエストに用いるオリジン     | なし               |

## API エンドポイント

| エンドポイント                            | 説明                                           | パラメーター                       |
| :---------------------------------------- | :--------------------------------------------- | :--------------------------------- |
| `/pokeapi`                                | https://pokeapi.co/api/v2/ へのプロキシー      | なし                               |
| `/trainers`                               | トレーナーの一覧 GET: 取得                     | なし                               |
| `/trainer`                                | トレーナー POST: 追加                          | なし                               |
| `/trainer/:trainer`                       | トレーナー GET: 取得, POST: 更新, DELETE: 削除 | `trainer`: トレーナー名            |
| `/trainer/:trainer/pokemon/:pokemonOrder` | ポケモン PUT: 追加                             | `pokemonOrder`: ポケモン図鑑番号   |
| `/trainer/:trainer/pokemon/:pokemonId`    | ポケモン DELETE: 削除                          | `pokemonId` : 手持ちポケモン識別子 |

## ER 図

![トレーナー{名前（主キー）、手持ちポケモン}<-一（必須）対多（任意）->ポケモン{手持ちポケモン識別子（主キー）、ニックネーム、ポケモン図鑑番号、名前、スプライト（画像）}](https://github.com/webdino/lyceum-pokemon/raw/main/docs/pokemon.drawio.png)

## S3 バケットに作成するオブジェクトのサンプル

トレーナー名が `レッド` の場合

- `レッド.json`: S3 オブジェクトキー（ファイル名）
- 次のコードブロック: S3 オブジェクト値（ファイル内容）

```json:レッド.json
{
  "name": "レッド",
  "pokemons": [
    {
      "id": 1,
      "nickname": "",
      "order": 35,
      "name": "pikachu",
      "sprites": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
      }
    },
    {
      "id": 2,
      "nickname": "",
      "order": 220,
      "name": "espeon",
      "sprites": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/196.png"
      }
    }
  ]
}
```
