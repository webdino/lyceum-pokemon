<script>
export default {
  async setup() {
    const {data: trainers} = await useTrainers()
    return {
      trainers,
    }
  }
}
</script>

<template>
  <GamifyList>
    <GamifyItem v-if="trainers.length > 0">
      <NuxtLink to="/trainer">つづきからはじめる</NuxtLink>
    </GamifyItem>
    <GamifyItem v-else>つづきからはじめる</GamifyItem>
    <GamifyItem>
      <NuxtLink to="/new">あたらしくはじめる</NuxtLink>
    </GamifyItem>
  </GamifyList>
</template>
