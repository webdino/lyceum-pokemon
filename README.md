# lyceum-pokemon

ポケモン API を使った Nuxt+Express アプリ/サーバの開発演習

## 使い方

- `yarn install`: npm パッケージのインストール
- `yarn dev`: 開発サーバーの起動
- `yarn build`: アプリケーションのプロダクションビルド
- `yarn start`: プロダクションビルドを使ったローカルサーバーの起動
- `yarn lint`: コードリンティング
- `yarn format`: コード整形

## 環境変数

| 変数名                  | 説明                                                     | 初期値             |
| :---------------------- | :------------------------------------------------------- | :----------------- |
| `AWS_ACCESS_KEY_ID`     | AWS 認証情報のアクセスキー ID                            | なし               |
| `AWS_SECRET_ACCESS_KEY` | AWS 認証情報のシークレットアクセスキー                   | なし               |
| `REGION`                | AWS のリージョン                                         | `"ap-northeast-1"` |
| `BUCKET_NAME`           | 本アプリケーションのデータ永続化に用いる AWS S3 バケット | `""`               |
