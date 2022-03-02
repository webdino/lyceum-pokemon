<template>
  <ul class="gamify-list">
    <slot />
  </ul>
</template>

<style scoped>
.gamify-list {
  list-style-type: none;
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}
</style>
