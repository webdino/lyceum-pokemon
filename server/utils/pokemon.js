import { ofetch } from "ofetch";
import { EnvHttpProxyAgent } from "undici";

const envHttpProxyAgent = new EnvHttpProxyAgent();

/** ポケモンの取得 */
export const findPokemon = async (name) => {
  const pokemon = await ofetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    dispatcher: envHttpProxyAgent,
  });
  return pokemon;
};
