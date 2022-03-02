<script>
export default {
  async setup() {
    const route = useRoute()
    const router = useRouter()
    const { VITE_SERVER_ORIGIN } = import.meta.env
    const page = ref(0)
    const limit = ref(20)
    const offset = computed(() => page.value * limit.value)
    const {data: pokemons, refresh} = await useAsyncData('/pokeapi/pokemon', () => $fetch(`${VITE_SERVER_ORIGIN}/express/pokeapi/pokemon`, {params: {offset: offset.value, limit: limit.value}}))
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
      const response = await fetch(`${VITE_SERVER_ORIGIN}/express/trainer/${route.params.name}/pokemon/${pokemon.name}`, {
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
    <h1>ポケモンをつかまえる</h1>
    <p>{{pokemons.count}}しゅるいのポケモン</p>
    <p>{{page + 1}} / {{maxPage + 1}} ページ</p>
    <GamifyList>
      <GamifyItem v-for="pokemon in pokemons.results" :key="pokemon.url">
        <button @click="onCatch(pokemon)">{{pokemon.name}}</button>
      </GamifyItem>
    </GamifyList>
    <GamifyList>
      <GamifyItem>
        <button @click="onPrev" :disabled="!hasPrev">まえへ</button>
      </GamifyItem>
      <GamifyItem>
        <button @click="onNext" :disabled="!hasNext">つぎへ</button>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
