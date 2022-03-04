<template>
  <button @click="buttonClicked()">
    <slot />
  </button>
</template>

<script>
export default {
  setup(props, { emit }) {
    const buttonClicked = () => {
      emit("click-button");
    };
    return {
      buttonClicked,
    };
  },
};
</script>
