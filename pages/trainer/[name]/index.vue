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
      onCloseRelease()
    }
    const {dialog: deleteDialog, onOpen: onOpenDelete, onClose: onCloseDelete} = useDialog()
    const {dialog: releaseDialog, onOpen: onOpenRelease, onClose: onCloseRelease} = useDialog()
    return {trainer, onDelete, onRelease, deleteDialog, onOpenDelete, onCloseDelete, releaseDialog, onOpenRelease, onCloseRelease}
  }
}
</script>

<template>
  <div>
    <h1>メニュー</h1>
    <h2>トレーナー</h2>
    <p>{{trainer.name}}</p>
    <button @click="onOpenDelete(true)">マサラタウンにかえる</button>
    <h2>てもちポケモン</h2>
    <GamifyList>
      <GamifyItem v-for="pokemon in trainer.pokemons" :key="pokemon.id">
        <img :src="pokemon.sprites.front_default" />
        <span>{{pokemon.name}}</span>
        <button @click="onOpenRelease(pokemon)">はかせにおくる</button>
      </GamifyItem>
      <GamifyItem>
        <NuxtLink :to="`/trainer/${trainer.name}/catch`">ポケモンをつかまえる</NuxtLink>
      </GamifyItem>
    </GamifyList>
    <GamifyDialog
      v-if="deleteDialog"
      id="confirm-delete"
      title="かくにん"
      description="ほんとうに　マサラタウンに　かえるんだな！　この そうさは　とりけせないぞ！"
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
      v-if="releaseDialog"
      id="confirm-release"
      title="かくにん"
      :description="`ほんとうに　${releaseDialog.name}　を　はかせに　おくるんだな！　この　そうさは　とりけせないぞ！`"
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
