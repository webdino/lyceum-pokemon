<script>
export default {
  async setup() {
    const {params: {name}} = useRoute()
    const {data: trainer} = await useFetch(`http://localhost:3000/express/trainer/${name}`)
    return {trainer}
  }
}
</script>

<template>
  <div>
    <p>トレーナー: {{trainer.name}}</p>
    <h3>手持ちポケモン</h3>
    <ul>
      <li v-for="pokemon in trainer.pokemons" :id="pokemon.id">{{pokemon.name}}</li>
    </ul>
    <NuxtLink :to="`/trainer/${trainer.name}/catch`">ポケモンをつかまえる</NuxtLink>
  </div>
</template>
