import { ProxyAgent } from "proxy-agent";
import { ofetch } from "ofetch";

const agent = new ProxyAgent();
/** ポケモンの取得 */
export const findPokemon = async (name) => {
  const pokemon = await ofetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    agent,
  });
  return pokemon;
};
