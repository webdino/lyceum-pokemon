import { useFetch, useRuntimeConfig } from "#app";

export default () => {
  const config = useRuntimeConfig();
  const response = useFetch(`${config.backendOrigin}/api/trainers`);
  return response;
};
