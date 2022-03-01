<script>
export default {
  async setup() {
    const route = useRoute()
    const router = useRouter()
    const {data: trainer, refresh} = await useAsyncData(`/trainer/${route.params.name}`, () => $fetch(`http://localhost:3000/express/trainer/${route.params.name}`))
    const onDelete = async () => {
      const response = await fetch(`http://localhost:3000/express/trainer/${route.params.name}`, {
        method: "DELETE"
      })
      if (!response.ok) return
      router.push("/trainer")
    }
    const onRelease = async (pokemonId) => {
      const response = await fetch(`http://localhost:3000/express/trainer/${route.params.name}/pokemon/${pokemonId}`, {
        method: "DELETE"
      })
      if (!response.ok) return
      await refresh()
    }
    return {trainer, onDelete, onRelease}
  }
}
</script>

<template>
  <div>
    <p>トレーナー: {{trainer.name}}</p>
    <h3>てもちポケモン</h3>
    <ul>
      <li v-for="pokemon in trainer.pokemons" :key="pokemon.id">
        <img :src="pokemon.sprites.front_default" />
        {{pokemon.name}}
        <button @click="onRelease(pokemon.id)">ポケモンをはかせにおくる</button>
      </li>
    </ul>
    <button @click="onDelete">マサラタウンにかえる</button>
    <NuxtLink :to="`/trainer/${trainer.name}/catch`">ポケモンをつかまえる</NuxtLink>
  </div>
</template>
