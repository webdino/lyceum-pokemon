<script>
export default {
  setup() {
    const router = useRouter()
    const trainerName = ref("")
    const { VITE_SERVER_ORIGIN } = import.meta.env
    const onSubmit = async () => {
      const response = await fetch(`${VITE_SERVER_ORIGIN}/express/trainer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: trainerName.value
        })
      })
      if (!response.ok) return
      router.push(`/trainer/${trainerName.value}`)
    }
    return {
      trainerName,
      onSubmit
    }
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label>
      なまえ
      <input v-model="trainerName" />
    </label>
    <button type="button" @click="onSubmit">はじめる</button>
  </form>
</template>
