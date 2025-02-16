import axios from "axios";

const api = axios.create({
  withCredentials: true,
});
const NODE_API = process.env.REACT_APP_BASE_API;

export const findGoodBets = async (
    live: boolean, leagueID: string, minOdds: number, maxOdds: number, minEV: number, comparePinnacle: boolean, bankroll: number, limit: number,
) => {
  const response = await api.get(`${NODE_API}/good-bets`, {
    params: {
      live,
      leagueID,
      minOdds,
      maxOdds,
      minEV,
      comparePinnacle,
      bankroll,
      limit,
    },
  });
  return response.data;
}

export const fetchAccountLimits = async () => {
  const response = await api.get(`${NODE_API}/limits`);
  return parseFloat((response.data['rateLimits']['per-month']['current-entities'] /
      response.data['rateLimits']['per-month']['max-entities'] * 100).toFixed(1));
}