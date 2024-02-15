<script setup>
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const { data: pokemons } = await useFetch(
  () =>
    "https://pokeapi.co/api/v2/pokemon",
  {
    default: () => [],
  },
);

const { dialog, onOpen, onClose } = useDialog();

const onCatch = async (pokemon) => {
  const res = await $fetch(`/api/trainer/${route.params.name}/pokemon`, {
    baseURL: config.public.backendOrigin,
    method: "POST",
    body: {
      name: pokemon.name,
    },
  }).catch((e) => e);
  if (res instanceof Error) return;
  router.push(`/trainer/${route.params.name}`);
};

</script>

<template>
  <div>
    <h1>Get Pokemon</h1>
    <GamifyList>
      <GamifyItem v-for="pokemon in pokemons.results" :key="pokemon.url">
        <span class="pokemon-name">{{ pokemon.name }}</span>
        <GamifyButton @click="onOpen(pokemon)">Get</GamifyButton>
      </GamifyItem>
    </GamifyList>

    <GamifyDialog
      v-if="dialog"
      id="catch"
      title="Confirm"
      :description="`get ${dialog.name} ?`"
      @close="onClose"
    >
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <GamifyButton @click="onClose">no</GamifyButton>
        </GamifyItem>
        <GamifyItem>
          <GamifyButton @click="onCatch(dialog)">yes</GamifyButton>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
  </div>
</template>