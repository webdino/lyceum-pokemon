<script setup>
  const {data: trainers} = await useTrainers();
  console.log(trainers);
</script>

<template>
  <div>
    <h1>ポケットモンスター</h1>
    <GamifyList>
      <GamifyItem v-show="trainers">
        <NuxtLink to="/trainer">つづきからはじめる</NuxtLink>
      </GamifyItem>
      <GamifyItem>
        <NuxtLink to="/new">あたらしくはじめる</NuxtLink>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
