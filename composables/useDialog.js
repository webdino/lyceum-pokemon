export default () => {
  const dialog = ref(null);
  const onOpen = (value) => {
    dialog.value = value;
  };
  const onClose = () => {
    dialog.value = null;
  };
  return {
    dialog,
    onOpen,
    onClose,
  };
};
