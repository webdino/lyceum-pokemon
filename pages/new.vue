<script>
export default {
  setup() {
    const router = useRouter();
    const trainerName = ref("");
    const { VITE_SERVER_ORIGIN } = import.meta.env;
    const onSubmit = async () => {
      const response = await fetch(`${VITE_SERVER_ORIGIN}/express/trainer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trainerName.value,
        }),
      });
      if (!response.ok) return;
      router.push(`/trainer/${trainerName.value}`);
    };
    const { dialog, onOpen, onClose } = useDialog();
    return {
      trainerName,
      onSubmit,
      dialog,
      onOpen,
      onClose,
    };
  },
};
</script>

<template>
  <div>
    <h1>あたらしくはじめる</h1>
    <p>では はじめに きみの なまえを おしえて もらおう！</p>
    <form @submit.prevent>
      <div class="item">
        <label for="name">なまえ</label>
        <input id="name" @keydown.enter="onOpen(true)" v-model="trainerName" />
      </div>
      <button type="button" @click="onOpen(true)">けってい</button>
    </form>
    <GamifyDialog
      v-if="dialog"
      id="confirm-submit"
      title="かくにん"
      :description="`ふむ・・・　きみは　${trainerName}　と　いうんだな！`"
      @close="onClose"
    >
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <button @click="onClose">いいえ</button>
        </GamifyItem>
        <GamifyItem>
          <button @click="onSubmit">はい</button>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
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

.item > label {
  display: block;
  margin-bottom: 0.25rem;
}
</style>
