import { ofetch } from "ofetch";

const agentFactory = async () => {
  if (!(process.env.HTTPS_PROXY || process.env.HTTP_PROXY)) return {};
  const nodeVer = process.version.match(
    /^v(?<major>[0-9]+)\.(?<minor>[0-9]+)\.(?<patch>[0-9]+)/,
  );
  const nodeMajorVer = Number(nodeVer.groups.major);
  if (nodeMajorVer < 18) {
    const { ProxyAgent } = await import("proxy-agent");
    const agent = new ProxyAgent();
    return { agent };
  }
  const { ProxyAgent } = await import("undici");
  const dispatcher = new ProxyAgent(
    process.env.HTTPS_PROXY ?? process.env.HTTP_PROXY,
  );
  return { dispatcher };
};

/** ポケモンの取得 */
export const findPokemon = async (name) => {
  const pokemon = await ofetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    await agentFactory(),
  );
  return pokemon;
};
