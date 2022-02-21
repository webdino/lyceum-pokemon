/** ポケモンの取得 */
export const findPokemon = async (order) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${order}`);
  const pokemon = await response.json();
  return pokemon;
};
