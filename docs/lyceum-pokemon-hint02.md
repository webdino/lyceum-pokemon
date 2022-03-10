トレーナー名をリクエストボディに含めてトレーナー追加APIを叩く差分

```diff
--- a/pages/new.vue
+++ b/pages/new.vue
@@ -1,7 +1,38 @@
 <script>
+import { VITE_SERVER_ORIGIN } from "~/utils/env";
+
 export default {
   setup() {
-    return {};
+    const router = useRouter();
+    const trainerName = ref("");
+    const onSubmit = async () => {
+      const response = await fetch(`${VITE_SERVER_ORIGIN}/api/trainer`, {
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