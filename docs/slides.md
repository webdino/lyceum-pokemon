# ポケモンアプリの実装過程

---

- [chore: 周辺ツール(eslint, prettier)のセットアップ #2](https://github.com/webdino/lyceum-pokemon/pull/2)
  - あまり時間をかけなかった（伏線）
- [サーバーサイドの実装に必要な準備 #3](https://github.com/webdino/lyceum-pokemon/issues/3)
- [必要な API エンドポイントの実装 #4](https://github.com/webdino/lyceum-pokemon/issues/4)
  - 事前に検討した API エンドポイントの書き出し
  - 名前付け、必要なパラメーターの兼ね合いで、結局実装しながら流動的に仕様が変わった

---

- [AWS JS SDK をつかった AWS S3 のハンズオン #10](https://github.com/webdino/lyceum-pokemon/issues/10)
  - 今回の API エンドポイントの実装においてかなり実際的なコードの断片を得た
  - 参考にしたドキュメント
    - [Amazon S3 バケットの作成と使用 - AWS SDK for JavaScript](https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html) シナリオとともに今回必要な S3 関連の実装の 8 割くらいはここに分かりやすく記載されていた
    - [S3 Client - AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html) 必要なコマンドがどれかは勘で探していた

---

- [トレーナー、ポケモンのモデリング #11](https://github.com/webdino/lyceum-pokemon/issues/11)
  - 本アプリで取り扱うデータ構造を整理する必要があった
  - API エンドポイントの実装にあたって、タスクを分解することで手が止まらないようにしたかった
- [feat: API の実装 #13](https://github.com/webdino/lyceum-pokemon/pull/13)
  - [f772716](https://github.com/webdino/lyceum-pokemon/pull/13/commits/f772716c87fed32d455696826b902281192e1846) でコードの見通しがよくなった
  - [20ae2b1](https://github.com/webdino/lyceum-pokemon/pull/13/commits/20ae2b19e045cee2dc5347def9e79c23e3f70aed) ポケモンの採番処理はちょくちょく触っている（後述）
  - Express は使ったことがあったが [754b595](https://github.com/webdino/lyceum-pokemon/pull/13/commits/754b595bbc1d9087c7d6484e17541c2758840e59) を忘れていた

---

- [必要な画面の実装 #15](https://github.com/webdino/lyceum-pokemon/issues/15)
  - 画面構成の検討は逆に実装から着手したほうがかえって手が止まらなかったかもしれない
- [オリジンを省略せずに用意した API をたたく必要がある #20](https://github.com/webdino/lyceum-pokemon/issues/20)
  - ハマりポイントだった
- [feat: ページコンポーネントの実装 #22](https://github.com/webdino/lyceum-pokemon/pull/22)
  - この時点で（完成度はともかく）ほぼほぼサーバー側とクライアント側ができた
  - [de2ad73](https://github.com/webdino/lyceum-pokemon/pull/22/commits/de2ad73a968f99bbc7cdab574122a53963fb8358) 伏線

---

- [見た目とふるまいの調整 #26](https://github.com/webdino/lyceum-pokemon/issues/26)
  - 見た目の方針決めをおこなった
- [Cloud9 での動作の検証 #28](https://github.com/webdino/lyceum-pokemon/issues/28)
  - 依頼されておらず研修でも使うことがなかったが、アプリのデバッグ作業にもなった

---

- [fix: ポケモンの識別子が常に 0 で採番される #29](https://github.com/webdino/lyceum-pokemon/pull/29)
  - デバッグの成果
- [fix: あやまった v-for に関連する属性のバインド #30](https://github.com/webdino/lyceum-pokemon/pull/30)
  - デバッグの成果
- [ひでさんのローカルか Cloud9 での動作検証 #32](https://github.com/webdino/lyceum-pokemon/issues/32)
  - アプリのデバッグ作業にもなった
- [fix: オブジェクトがひとつもない場合配列ではなく undefined が得られる #34](https://github.com/webdino/lyceum-pokemon/pull/34)
  - デバッグの成果
- [名前のないトレーナーが作成できてしまう #35](https://github.com/webdino/lyceum-pokemon/issues/35)
  - サーバー側のバリデーションをもう少しちゃんとしようとした

---

- [feat: ゲーム風の見た目の提供 #37](https://github.com/webdino/lyceum-pokemon/pull/37)
  - 見た目のための作業（楽しい人は楽しいし楽しくない人は楽しくないらしい）
- [feat: ブラッシュアップ #38](https://github.com/webdino/lyceum-pokemon/pull/38)
  - 見た目のための作業（楽しい人は楽しいし楽しくない人は楽しくないらしい）
  - [536b7e1](https://github.com/webdino/lyceum-pokemon/pull/38/commits/536b7e12b74686f4183ca4c7a4a65e96c2ddfd65) は [de2ad73](https://github.com/webdino/lyceum-pokemon/pull/22/commits/de2ad73a968f99bbc7cdab574122a53963fb8358) の変更を戻していてただの勘違いだった（レビューを通すことで防げたかもしれない）
- [見た目や振る舞いを追加 #40](https://github.com/webdino/lyceum-pokemon/pull/40)
  - 環境構築（エディタ整備、CI の導入）が不十分だったため共同作業上のノイズが生じた
  - レビューを通して取り込んだ
  - 共同作業は難しいなと改めて思った

---

以降はアプリのレビューを通してゴソッとタスクが立ってゴソッとタスクが消える（はず）をやっている

---

## ふりかえり

---

2 月 19 日あたりから着手して大体完成まで 30 時間くらい（週 10 時間）

### あさいさんのコメント

> およそ想定通りの時間で収まっている、あるいは危惧したほどは掛からなかった印象です。
> (Vue/Nuxt 準備は想定時間を超えていたがこちらは全然越えていない)
>
> 綺麗に作って整理しての時間もあるので、実装力のある人が 10-20 時間程度で必要要件を実装出来る、初心者エンジニアとしてはもっと時間をかけて頑張るがある程度作っていける、そのくらいの規模という印象でもあります。

---

ソフトウェア開発において「炎上」という表現が使われるけど、今回は「炎上」したのか？~~たぶんしていないほうだと思う~~若干した？判定をおねがいします

### あさいさんのコメント

> 少し残業はしたかも知れないが、炎上はしなかったのだと考えます。

---

- 比較的開発とドキュメンテーションを平行しておこなえていたと思う。ドキュメンテーションは自分以外（未来の自分も自分以外に含める）に**開発参加してもらうとか利用してもらうのには必要**な作業
- 作業メモをとるのは大事（**粒度は細かければ細かいほどいい**けど無理のない範囲で。 GitHub なら issue とかそうでなくてもチケットを切るとか）

### あさいさんのコメント

> こういうところも伝わるような教材になると良いのかも知れません (どうすれば良いのだろう)

---

- 「この要素がないとこのアプリは作られない」というような部分は**比較的序盤に目星がついて**おり、技術的チャレンジ？は一応その時点で完了した
- 一方で「動く」レベルにもっていくにあたっては、さも「これが正解です」といわんばかりにヒントやスケルトンの提示をしたが、**実際には解は最初から分かっていない**し迷走もした
- 以降はデバッグ、見た目振る舞いの調整などの**作り込みで延々と時間をかけていった**印象

### あさいさんのコメント

> できあがった回答を見せると簡単そうだが実際に作るのはそれよりも遙かに難しい、開発や研究のあるあるですね。紆余曲折する中で学ぶので、学習目的という意味ではそういった試行錯誤が必要なボリューム感で良い感じになったのではと勝手に思ってます。

---

# その後（1 年後）

---

- [20 件ほど PR があった](https://github.com/webdino/lyceum-pokemon/pulls?q=is%3Apr+is%3Aclosed+created%3A%3E2022-04-01+) (2023 年 3 月時点)
- 2022 年 11 月に[Nuxt 3 安定版リリース](https://nuxt.com/blog/v3)
  - 破壊的変更への対応、非推奨機能の利用停止など
- ドキュメントの更新
  - Heroku のサポート、サポート廃止、ER 図の差し替え
- 「完成」した後も、**動作可能**な状態や**メンテナンスしやすい**状態を維持しつづけるためのコストがかかる
