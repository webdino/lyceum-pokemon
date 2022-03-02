<script>
export default {
  async setup() {
    const {data: trainers} = await useTrainers();
    return {trainers}
  }
}
</script>

<template>
  <GamifyList>
    <GamifyItem v-for="trainer in trainers" :key="trainer">
      <NuxtLink :to="`/trainer/${trainer}`">{{trainer}}</NuxtLink>
    </GamifyItem>
  </GamifyList>
</template>
