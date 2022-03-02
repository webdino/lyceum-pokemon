export default () => {
  const dialog = ref(false);
  const onOpen = () => {
    dialog.value = true;
  };
  const onClose = () => {
    dialog.value = false;
  };
  return {
    dialog,
    onOpen,
    onClose,
  };
};
