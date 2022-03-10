ダイアログを追加する差分

```diff
--- a/pages/new.vue
+++ b/pages/new.vue
@@ -1,7 +1,38 @@
 <script>
 export default {
   setup() {
-    return {};
+    const trainerName = ref("");
+    const { dialog, onOpen, onClose } = useDialog();
+    return {
+      trainerName,
+      dialog,
+      onOpen,
+      onClose,
+    };
   },
 };
 </script>
 @ -9,7 +40,40 @@ export default {
 <template>
   <div>
     <h1>あたらしくはじめる</h1>
     <form @submit.prevent></form>
+    <GamifyButton @click="onOpen(true)">ダイアログをひらく</GamifyButton>
+    <GamifyDialog
+      v-if="dialog"
+      id="confirm-submit"
+      title="かくにん"
+      :description="`ふむ・・・　きみは　${trainerName}　と　いうんだな！`"
+      @close="onClose"
+    >
+      <GamifyList :border="false" direction="horizon">
+        <GamifyItem>
+          <GamifyButton @click="onClose">いいえ</GamifyButton>
+        </GamifyItem>
+        <GamifyItem>
+          <GamifyButton @click="onClose">はい</GamifyButton>
+        </GamifyItem>
+      </GamifyList>
+    </GamifyDialog>
   </div>
 </template>
 
```