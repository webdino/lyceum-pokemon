import { ofetch } from "ofetch";
import { EnvHttpProxyAgent } from "undici";

// NOTE: Warning: EnvHttpProxyAgent is experimental, expect them to change at any time
// See https://undici.nodejs.org/#/docs/api/EnvHttpProxyAgent.md
const envHttpProxyAgent = new EnvHttpProxyAgent();

/** ポケモンの取得 */
export const findPokemon = async (name) => {
  const pokemon = await ofetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    dispatcher: envHttpProxyAgent,
  });
  return pokemon;
};
