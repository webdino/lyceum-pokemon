<script setup>
defineProps({
  id: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
});
const emits = defineEmits(["close"]);
const onClose = () => {
  emits("close");
};
</script>
<template>
  <div class="gamify-dialog">
    <div class="overlay" @click="onClose" />
    <div
      :id="id"
      class="dialog"
      role="dialog"
      :aria-labelledby="`${id}-title`"
      aria-describedby="`${id}-description`"
    >
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.gamify-dialog > .overlay {
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  top: 0;
  left: 0;
}

.gamify-dialog > .dialog {
  background-color: white;
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>
