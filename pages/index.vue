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
  <ul>
    <li v-if="trainers.length > 0">
      <NuxtLink to="/trainer">つづきからはじめる</NuxtLink>
    </li>
    <li v-else>つづきからはじめる</li>
    <li>
      <NuxtLink to="/new">あたらしくはじめる</NuxtLink>
    </li>
  </ul>
</template>
