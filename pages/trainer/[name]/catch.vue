<script>
import { VITE_SERVER_ORIGIN } from "~/utils/env";

export default {
  async setup() {
    const page = ref(0);
    const limit = ref(20);
    const offset = computed(() => page.value * limit.value);
    const { data: pokemons, refresh } = await useAsyncData(
      "/pokeapi/pokemon",
      () =>
        $fetch(`${VITE_SERVER_ORIGIN}/api/pokeapi/pokemon`, {
          params: { offset: offset.value, limit: limit.value },
        })
    );
    const hasPrev = computed(() => page.value > 0);
    const maxPage = computed(() =>
      Math.floor(pokemons.value.count / limit.value)
    );
    const hasNext = computed(() => page.value < maxPage.value);
    const onPrev = async () => {
      page.value--;
      await refresh();
    };
    const onNext = async () => {
      page.value++;
      await refresh();
    };
    return {
      page,
      maxPage,
      pokemons,
      hasPrev,
      hasNext,
      onPrev,
      onNext,
    };
  },
};
</script>

<template>
  <div>
    <h1>ポケモンをつかまえる</h1>
    <p>{{ pokemons.count }} しゅるいのポケモン</p>
    <p>{{ page + 1 }} / {{ maxPage + 1 }} ページ</p>
    <GamifyList>
      <GamifyItem v-for="pokemon in pokemons.results" :key="pokemon.url">
        <span class="pokemon-name">{{ pokemon.name }}</span>
      </GamifyItem>
    </GamifyList>
    <GamifyList direction="horizon">
      <GamifyItem>
        <GamifyButton @click="onPrev" :disabled="!hasPrev">まえへ</GamifyButton>
      </GamifyItem>
      <GamifyItem>
        <GamifyButton @click="onNext" :disabled="!hasNext">つぎへ</GamifyButton>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
