Nuxtにおける動的なルーティングの提供方法の和訳

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
> 
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