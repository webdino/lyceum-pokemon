<script>
export default {
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const {VITE_SERVER_ORIGIN} = import.meta.env;
    const {data: trainer, refresh} = await useAsyncData(
      `/trainer/${route.params.name}`,
      () => $fetch(`${VITE_SERVER_ORIGIN}/express/trainer/${route.params.name}`)
    );
    const onDelete = async () => {
      const response = await fetch(
        `${VITE_SERVER_ORIGIN}/express/trainer/${route.params.name}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) return;
      router.push("/");
    };
    const nickname = ref("");
    const onRename = async (pokemon) => {
      const newTrainer = trainer.value;
      const index = newTrainer.pokemons.findIndex(
        ({id}) => id === pokemon.id
      );
      newTrainer.pokemons[index].nickname = nickname.value;
      nickname.value = "";
      const response = await fetch(
        `${VITE_SERVER_ORIGIN}/express/trainer/${route.params.name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTrainer),
        }
      );
      if (!response.ok) return;
      await refresh();
      onCloseRename();
    };
    const onRelease = async (pokemonId) => {
      const response = await fetch(
        `${VITE_SERVER_ORIGIN}/express/trainer/${route.params.name}/pokemon/${pokemonId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) return;
      await refresh();
      onCloseRelease();
    };
    const {
      dialog: deleteDialog,
      onOpen: onOpenDelete,
      onClose: onCloseDelete,
    } = useDialog();
    const {
      dialog: nicknameDialog,
      onOpen: onOpenRename,
      onClose: onCloseRename,
    } = useDialog();
    const {
      dialog: releaseDialog,
      onOpen: onOpenRelease,
      onClose: onCloseRelease,
    } = useDialog();
    return {
      trainer,
      nickname,
      onDelete,
      onRename,
      onRelease,
      deleteDialog,
      onOpenDelete,
      onCloseDelete,
      nicknameDialog,
      onOpenRename,
      onCloseRename,
      releaseDialog,
      onOpenRelease,
      onCloseRelease,
    };
  },
};
</script>

<template>
  <div>
    <h1>メニュー</h1>
    <h2>トレーナー: {{trainer.name}}</h2>
    <button @click="onOpenDelete(true)">マサラタウンにかえる</button>
    <h2>てもちポケモン</h2>
    <NuxtLink :to="`/trainer/${trainer.name}/catch`" class="button">
      <img class="pokemon-ball" src="/pokemon_ball.svg" alt="ポケモンボール" />
      ポケモンをつかまえる
    </NuxtLink>
    <GamifyList>
      <GamifyItem v-for="pokemon in trainer.pokemons" :key="pokemon.id">
        <img :src="pokemon.sprites.front_default" />
        <span>{{pokemon.nickname || pokemon.name}}</span>
        <button @click="onOpenRename(pokemon)">ニックネームをつける</button>
        <button @click="onOpenRelease(pokemon)">はかせにおくる</button>
      </GamifyItem>
    </GamifyList>
    <GamifyDialog
      v-if="deleteDialog"
      id="confirm-delete"
      title="かくにん"
      description="ほんとうに　マサラタウンに　かえるんだな！　この　そうさは　とりけせないぞ！"
      @close="onCloseDelete"
    >
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <button @click="onCloseDelete">いいえ</button>
        </GamifyItem>
        <GamifyItem>
          <button @click="onDelete">はい</button>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
    <GamifyDialog
      v-if="nicknameDialog"
      id="confirm-nickname"
      title="ニックネーム"
      :description="`${nicknameDialog.name}　の　ニックネームは？`"
      @close="onCloseRename"
    >
      <div class="item">
        <label for="name">ニックネーム</label>
        <input id="name" @keydown.enter="onRename(nicknameDialog)" v-model="nickname" />
      </div>
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <button @click="onCloseRename">キャンセル</button>
        </GamifyItem>
        <GamifyItem>
          <button @click="onRename(nicknameDialog)">けってい</button>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
    <GamifyDialog
      v-if="releaseDialog"
      id="confirm-release"
      title="かくにん"
      :description="`ほんとうに　${releaseDialog.nickname || releaseDialog.name
      }　を　はかせに　おくるんだな！　この　そうさは　とりけせないぞ！`"
      @close="onCloseRelease"
    >
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <button @click="onCloseRelease">いいえ</button>
        </GamifyItem>
        <GamifyItem>
          <button @click="onRelease(releaseDialog.id)">はい</button>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
  </div>
</template>

<style scoped>
.item > label {
  display: block;
  margin-bottom: 0.25rem;
}
</style>
