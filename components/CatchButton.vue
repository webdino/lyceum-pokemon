<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NuxtLink :to="to" class="catch-button">
    <div class="catch-button__content">
      <img class="pokemon-ball" src="/pokemon_ball.svg" alt="ポケモンボール" />
      <slot />
    </div>
  </NuxtLink>
</template>

<style scoped>
.catch-button {
  position: relative;
  line-height: 1;
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 0.4em 1em;
  cursor: pointer;
  display: inline-block;
  background-color: #fff;
  color: #555;
  text-decoration: none;
}
.catch-button:hover {
  transform: translate(-1px, -1px);
  box-shadow: 1px 1px 0 #555;
  color: #fff;
}
.catch-button:active {
  transform: translate(1px, 1px);
  box-shadow: none;
}
.catch-button .pokemon-ball {
  width: 36px;
  height: 36px;
}

.catch-button:hover .pokemon-ball {
  animation: bounce;
  animation-duration: 0.8s;
}

.catch-button::before {
  content: "";
  display: block;
  width: 100%;
  height: 0;
  background: #555;
  transition: height 0.2s;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 0.2rem;
}
.catch-button:hover::before {
  height: 100%;
}
.catch-button__content {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0 1rem;
  font-weight: bold;
}
</style>
