<script>
export default {
  setup() {
    const router = useRouter()
    const trainerName = ref("")
    const {VITE_SERVER_ORIGIN} = import.meta.env
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
  <div>
    <h1>あたらしくはじめる</h1>
    <p>では はじめに きみの なまえを おしえて もらおう！</p>
    <form @submit.prevent="onSubmit">
      <div class="item">
        <label for="name">なまえ</label>
        <input id="name" v-model="trainerName" />
      </div>
      <button type="button" @click="onSubmit">けってい</button>
    </form>
  </div>
</template>

<style scoped>
form {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

form > :not(:last-child) {
  display: block;
  margin-bottom: 1rem;
}

.item > label {
  display: block;
  margin-bottom: 0.25rem;
}
</style>
