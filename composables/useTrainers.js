import { useFetch, useRuntimeConfig } from "#app";

export default () => {
  const config = useRuntimeConfig();
  const response = useFetch(`${config.serverOrigin}/api/trainers`);
  return response;
};
