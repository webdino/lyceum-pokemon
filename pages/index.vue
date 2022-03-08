<script>
export default {
  async setup() {
    return {};
  },
};
</script>

<template>
  <div>
    <h1>ポケットモンスター</h1>
    <GamifyList>
      <GamifyItem>
        <NuxtLink to="/trainer">つづきからはじめる</NuxtLink>
      </GamifyItem>
      <GamifyItem>
        <NuxtLink to="/new">あたらしくはじめる</NuxtLink>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
