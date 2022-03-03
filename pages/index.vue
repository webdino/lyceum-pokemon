<script>
export default {
  async setup() {
    const { data: trainers } = await useTrainers();
    return {
      trainers,
    };
  },
};
</script>

<template>
  <div>
    <h1>ポケットモンスター</h1>
    <GamifyList>
      <GamifyItem v-if="trainers.length > 0">
        <NuxtLink to="/trainer">つづきからはじめる</NuxtLink>
      </GamifyItem>
      <GamifyItem v-else>
        <span>つづきからはじめる</span>
      </GamifyItem>
      <GamifyItem>
        <NuxtLink to="/new">あたらしくはじめる</NuxtLink>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
