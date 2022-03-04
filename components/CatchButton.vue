<template>
  <NuxtLink :to="to" class="gamify-button">
    <div class="gamify-button__content">
      <img class="pokemon-ball" src="/pokemon_ball.svg" alt="ポケモンボール" />
      <slot />
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
    },
  },
};
</script>

<style scoped>
.gamify-button {
  position: relative;
  display: inline-block;
  line-height: 1;
}
.gamify-button:hover {
  color: #fff;
}
.gamify-button .pokemon-ball {
  width: 36px;
  height: 36px;
}

.gamify-button:hover .pokemon-ball {
  animation: bounce;
  animation-duration: 0.8s;
}

.gamify-button::before {
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
.gamify-button:hover::before {
  height: 100%;
}
.gamify-button__content {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0 1rem;
  font-weight: bold;
}
</style>
