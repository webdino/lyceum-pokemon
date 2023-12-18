import { useFetch, useRuntimeConfig } from "#app";

export default () => {
  const config = useRuntimeConfig();
  const response = useFetch(`${config.public.backendOrigin}/api/trainers`, {
    default: () => [],
  });
  return response;
};
