トレーナー名から S3 オブジェクトキーとしての使用を避けたい文字を取り除く差分

```diff
--- a/pages/new.vue
+++ b/pages/new.vue
@@ -1,7 +1,38 @@
 <script>
+import trimAvoidCharacters from "~/utils/trimAvoidCharacters";
+
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