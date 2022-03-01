import { useFetch } from "#app";
const { VITE_SERVER_ORIGIN } = import.meta.env;
export default () => {
  const response = useFetch(`${VITE_SERVER_ORIGIN}/express/trainers`);
  return response;
};
