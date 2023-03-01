<script setup>
defineProps({
  border: {
    default: true,
    type: Boolean,
  },
  direction: {
    default: "vertical",
    type: String,
  },
});
</script>

<template>
  <ul class="gamify-list" :class="{ border, horizon: direction === 'horizon' }">
    <slot />
  </ul>
</template>

<style scoped>
.gamify-list {
  list-style-type: none;
}

.gamify-list.border {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

.gamify-list.horizon {
  display: flex;
}

.gamify-list.horizon > :not(:last-child) {
  margin-right: 0.5rem;
}
</style>
