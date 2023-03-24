<script setup>
  const router = useRouter()
  const newName = ref("");
  const validNewName = computed(() => trimAvoidCharacters(newName.value));
  async function registName() {
    const postData = {"name": validNewName.value, "pokemons": []}
    const {error} = await registTrainer(postData);
    if (!error.value) {
      router.push(`/trainer/${validNewName.value}`);
    } else if (error.value.status==409) {
      conflictOpen(true);
      console.log(error);
    } else if (error.value) {
      return;
    }
  };
  const { dialog, onOpen, onClose } = useDialog();
  const { dialog: conflictDialog, onOpen: conflictOpen, onClose: conflictClose } = useDialog();
</script>

<template>
  <div>
    <h1>あたらしくはじめる</h1>
    では　はじめに　きみの　なまえを　おしえて　もらおう！
    <form @submit.prevent>
      <p>なまえ</p>
      <p>
        とくていの　もじは　とりのぞかれるぞ！
      </p>
      <input v-model="newName" type="text" @keydown.enter="onOpen(true)">
      <gamify-button :disabled="validNewName.length==0" @click="onOpen(true)">けってい</gamify-button>
    </form>
    <gamify-dialog v-if="dialog" id="newName" title="かくにん" :description="`ふむ...　きみは　${validNewName}　と　いうんだな！`" @close="onClose">
      <gamify-list :border="false" direction="horizon">
        <gamify-item>
          <gamify-button @click="onClose">いいえ</gamify-button>
        </gamify-item>
        <gamify-item>
          <gamify-button @click="registName">はい</gamify-button>
        </gamify-item>
      </gamify-list>
    </gamify-dialog>
    <gamify-dialog v-if="conflictDialog" id="conflict" title="けいこく" description="おなじ　なまえ　の　データ　が　あるぞ！" @close="conflictClose">
      <gamify-item>
        <gamify-button @click="conflictClose">もどる</gamify-button>
      </gamify-item>
    </gamify-dialog>
    <p>
    <gamify-button @click="()=>{$router.push('/')}">もどる</gamify-button>
    </p>
  </div>
</template>

<style scoped>
form {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

form > :not(:last-child) {
  display: block;
  margin-bottom: 1rem;
}

.item > label,
.item > span {
  display: block;
  margin-bottom: 0.25rem;
}
.item > span {
  font-size: 0.875rem;
}
</style>
