<script setup>
  const router = useRouter();
  const config = useRuntimeConfig();
  const trainerName = ref('');
  const { dialog, onOpen, onClose } = useDialog();
  const onSubmit = async () => {
  const response = await $fetch("/api/trainer", {
    baseURL: config.public.backendOrigin,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: trainerName.value,
    }),
  }).catch((e) => e);
  if (response instanceof Error) return;
  router.push(`/trainer/${trainerName.value}`);
};
</script>

<template>
  <div>
    <h1>あたらしくはじめる</h1>
    <form @submit.prevent>
      <div class="item">
        <label for="name">Name</label>
        <input id="name" v-model="trainerName"/>
      </div>
      <GamifyButton type="button" @click="onOpen(true)">OK</GamifyButton>
    </form>
    <GamifyDialog 
      v-if="dialog"
      id="confirm-dialog"
      title="Confirm"
      description="Use this name?"
      @close="onClose"
    >
      <GamifyButton @click="onClose">no</GamifyButton>
      <GamifyButton @click="onSubmit">yes</GamifyButton>
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

.item > label,
.item > span {
  display: block;
  margin-bottom: 0.25rem;
}
.item > span {
  font-size: 0.875rem;
}
</style>
