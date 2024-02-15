<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const { data: trainer } = await useFetch (
    () => `/api/trainer/${route.params.name}`,
    { 
        default: () => [],
        baseUrl: config.public.backendOrigin,
    }
);

</script>

<template>
  <div>
    <h1>Trainer Info</h1>
    <GamifyList>
      <img src="/avatar.png" />
      <span>{{ trainer.name }}</span>
    </GamifyList>
    <h2>My Pokemon</h2>
    <CatchButton :to="`/trainer/${route.params.name}/catch`">Get Pokemon</CatchButton>
    <GamifyList>
        <GamifyItem v-for="pokemon in trainer.pokemons" :key="pokemon.id">
            <img :src="pokemon.sprites.front_default" />
            <span class="pokemon-name">{{ pokemon.nickname || pokemon.name }}</span>
            <GamifyButton @click="onOpenNickname(pokemon)">Set Nickname</GamifyButton>
            <GamifyButton @click="onOpenRelease(pokemon)">Release</GamifyButton>
        </GamifyItem>
    </GamifyList>
  </div>
</template>