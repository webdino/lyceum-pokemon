import { ofetch } from "ofetch";

const createProxyAgent = async () => {
  if (!(process.env.HTTPS_PROXY || process.env.HTTP_PROXY)) return;
  const { ProxyAgent } = await import("undici");
  const dispatcher = new ProxyAgent(
    process.env.HTTPS_PROXY ?? process.env.HTTP_PROXY,
  );
  return dispatcher;
};

/** ポケモンの取得 */
export const findPokemon = async (name) => {
  const pokemon = await ofetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    dispatcher: await createProxyAgent(),
  });
  return pokemon;
};
