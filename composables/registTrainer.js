import { useFetch, useRuntimeConfig } from "#app";

export default (postData) => {
  const config = useRuntimeConfig();
  const response = useFetch(`${config.backendOrigin}/api/trainer`, {
    method: 'POST',
    body: postData,
  });
  return response;
};
