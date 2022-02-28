<script>
export default {
  async setup() {
    const route = useRoute()
    const router = useRouter()
    const page = ref(0)
    const limit = ref(20)
    const offset = computed(() => page.value * limit.value)
    const {data: pokemons, refresh} = await useAsyncData('/pokeapi/pokemon', () => $fetch('http://localhost:3000/express/pokeapi/pokemon', {params: {offset: offset.value, limit: limit.value}}))
    const hasPrev = computed(() => page.value > 0)
    const maxPage = computed(() => Math.floor(pokemons.value.count / limit.value))
    const hasNext = computed(() => page.value < maxPage.value)
    const onPrev = async () => {
      page.value--
      await refresh()
    }
    const onNext = async () => {
      page.value++
      await refresh()
    }
    const onCatch = async (pokemon) => {
      const response = await fetch(`http://localhost:3000/express/trainer/${route.params.name}/pokemon/${pokemon.name}`, {
        method: "PUT"
      })
      if (!response.ok) return
      router.push(`/trainer/${route.params.name}`)
    }
    return {page, maxPage, pokemons, hasPrev, hasNext, onPrev, onNext, onCatch}
  }
}
</script>

<template>
  <div>
    <p>{{pokemons.count}}しゅるいのポケモン</p>
    <ul>
      <li v-for="pokemon in pokemons.results" :key="pokemon.url">
        <button @click="onCatch(pokemon)">{{pokemon.name}}</button>
      </li>
    </ul>
    <p>{{page + 1}} / {{maxPage + 1}} ページ</p>
    <button @click="onPrev" :disabled="!hasPrev">まえへ</button>
    <button @click="onNext" :disabled="!hasNext">つぎへ</button>
  </div>
</template>
