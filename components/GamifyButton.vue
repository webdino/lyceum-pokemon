<template>
  <button class="gamify-button">
    <slot />
  </button>
</template>

<style scoped>
.gamify-button {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 0.4em 1em;
  cursor: pointer;
  display: inline-block;
  background-color: #fff;
  color: #555;
  text-decoration: none;
}

.gamify-button:not(:disabled):hover {
  transform: translate(-1px, -1px);
  box-shadow: 1px 1px 0 #555;
}

.gamify-button:not(:disabled):active {
  transform: translate(1px, 1px);
  box-shadow: none;
}

.gamify-button:disabled {
  border-color: #aaa;
  cursor: default;
}
</style>
