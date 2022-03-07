import { useFetch } from "#app";
import { VITE_SERVER_ORIGIN } from "~/utils/env";

export default () => {
  const response = useFetch(`${VITE_SERVER_ORIGIN}/express/trainers`);
  return response;
};
