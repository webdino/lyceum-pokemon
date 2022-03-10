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
