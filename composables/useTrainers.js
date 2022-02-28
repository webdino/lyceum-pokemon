import { useFetch } from "#app";
export default () => {
  const response = useFetch("http://localhost:3000/express/trainers");
  return response;
};
