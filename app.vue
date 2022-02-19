<template>
  <div>
    なまえ: <input v-model="state.name" type="text" /> <br />
    ばんごう: <input v-model="state.order" type="text" /> <br />
    しんちょう: <input v-model="state.weight" type="text" /> <br />
    たいじゅう: <input v-model="state.height" type="text" /> <br />
  </div>
</template>

<script>
import { useLocalStorage } from "@vueuse/core";

export default {
  setup() {
    const state = useLocalStorage("my-storage", {
      name: "ditto",
      order: 214,
      weight: 40,
      height: 3,
    });
    return { state };
  },
};
</script>
