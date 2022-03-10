クライアント側でトレーナー名を入力しているかバリデーション（検証）する差分

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