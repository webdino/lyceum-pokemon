<script setup>
const page = ref(0);
const limit = ref(20);
const offset = computed(() => page.value * limit.value);
const { data: pokemons, refresh } = await useFetch(
  () =>
    `https://pokeapi.co/api/v2/pokemon?offset=${offset.value}&limit=${limit.value}`,
  {
    default: () => [],
  },
);
const hasPrev = computed(() => page.value > 0);
const maxPage = computed(() => Math.floor(pokemons.value.count / limit.value));
const hasNext = computed(() => page.value < maxPage.value);
const onPrev = async () => {
  page.value--;
  await refresh();
};
const onNext = async () => {
  page.value++;
  await refresh();
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
        <GamifyButton :disabled="!hasPrev" @click="onPrev">まえへ</GamifyButton>
      </GamifyItem>
      <GamifyItem>
        <GamifyButton :disabled="!hasNext" @click="onNext">つぎへ</GamifyButton>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
