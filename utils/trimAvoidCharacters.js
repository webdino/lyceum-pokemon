/**
 * S3 オブジェクトキーでは使用を避けた方がよい文字のトリミング
 * See https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/object-keys.html
 */
export default (string) =>
  string.replace(/[&$\x00-\x1F@=;:+ ,?\\{\x80-\xFF^}%\x60\]'"“>~<#|]/g, "");
