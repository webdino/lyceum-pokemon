<template>
  <li class="gamify-item">
    <span class="selector" aria-hidden>▶</span>
    <slot />
  </li>
</template>

<style scoped>
.gamify-item {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}

.gamify-item > .selector {
  visibility: hidden;
}

.gamify-item:hover > .selector,
.gamify-item:focus-within > .selector {
  visibility: visible;
}

.gamify-item > :deep(:not(:last-child)) {
  margin-right: 0.5rem;
}

.gamify-item :deep(.pokemon-name) {
  width: 10em;
  display: inline-block;
}
</style>
