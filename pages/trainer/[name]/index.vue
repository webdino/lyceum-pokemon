<script>
export default {
  async setup() {
    const route = useRoute()
    const router = useRouter()
    const {VITE_SERVER_ORIGIN} = import.meta.env
    const {data: trainer, refresh} = await useAsyncData(`/trainer/${route.params.name}`, () => $fetch(`${VITE_SERVER_ORIGIN}/express/trainer/${route.params.name}`))
    const onDelete = async () => {
      const response = await fetch(`${VITE_SERVER_ORIGIN}/express/trainer/${route.params.name}`, {
        method: "DELETE"
      })
      if (!response.ok) return
      router.push("/trainer")
    }
    const onRelease = async (pokemonId) => {
      const response = await fetch(`${VITE_SERVER_ORIGIN}/express/trainer/${route.params.name}/pokemon/${pokemonId}`, {
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
    <h1>メニュー</h1>
    <p>トレーナー: {{trainer.name}}</p>
    <button @click="onDelete">マサラタウンにかえる</button>
    <h2>てもちポケモン</h2>
    <GamifyList>
      <GamifyItem v-for="pokemon in trainer.pokemons" :key="pokemon.id">
        <img :src="pokemon.sprites.front_default" />
        <span>{{pokemon.name}}</span>
        <button @click="onRelease(pokemon.id)">ポケモンをはかせにおくる</button>
      </GamifyItem>
      <GamifyItem>
        <NuxtLink :to="`/trainer/${trainer.name}/catch`">ポケモンをつかまえる</NuxtLink>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
