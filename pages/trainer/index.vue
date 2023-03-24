<script setup>
    const {data: trainers} = await useTrainers(); 
    console.log(trainers)
</script>

<template>
  <div>
    <h1>つづきからはじめる</h1>
    <form @submit.prevent>
        <gamify-item v-for="trainer in trainers" :key="trainer.name">
            <NuxtLink to="/">{{ trainer }}</NuxtLink>
        </gamify-item>
    </form>
    <p>
    <gamify-button @click="()=>{$router.push('/')}">もどる</gamify-button>
    </p>
  </div>
</template>

<style scoped>
form {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

form > :not(:last-child) {
  display: block;
  margin-bottom: 1rem;
}

.item > label,
.item > span {
  display: block;
  margin-bottom: 0.25rem;
}
.item > span {
  font-size: 0.875rem;
}
</style>
