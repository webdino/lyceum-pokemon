トレーナーを追加する入力フォームの差分

```diff
--- a/pages/new.vue
+++ b/pages/new.vue
@@ -9,7 +40,40 @@ export default {
 <template>
   <div>
     <h1>あたらしくはじめる</h1>
-    <form @submit.prevent></form>
+    <p>では　はじめに　きみの　なまえを　おしえて　もらおう！</p>
+    <form @submit.prevent>
+      <div class="item">
+        <label for="name">なまえ</label>
+        <span id="name-description"
+          >とくていの　もじは　とりのぞかれるぞ！</span
+        >
+        <input
+          id="name"
+          @keydown.enter="onSubmit"
+          v-model="trainerName"
+          aria-describedby="name-description"
+        />
+      </div>
+      <GamifyButton type="button" @click="onSubmit">けってい</GamifyButton>
+    </form>
   </div>
 </template>
 
```