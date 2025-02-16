import axios from "axios";

const api = axios.create({
  withCredentials: true,
});
const NODE_API = process.env.REACT_APP_BASE_API;

export const findPositiveEvBets = async (
    live: boolean, leagueID: string, minOdds: number, maxOdds: number, minEV: number
) => {
  const response = await api.get(`${NODE_API}/positive-ev-bets`, {
    params: {
      live,
      leagueID,
      minOdds,
      maxOdds,
      minEV,
    },
  });
  return response.data;
}

export const findPinnyBets = async (
    live: boolean, leagueID: string, minOdds: number, maxOdds: number, minEV: number
) => {
  const response = await api.get(`${NODE_API}/pinny-bets`, {
    params: {
      live,
      leagueID,
      minOdds,
      maxOdds,
      minEV,
    },
  });
  return response.data;
}

export const fetchAccountLimits = async () => {
  const response = await api.get(`${NODE_API}/limits`);
  console.log(response.data);
  return parseFloat((response.data['rateLimits']['per-month']['current-entities'] /
      response.data['rateLimits']['per-month']['max-entities'] * 100).toFixed(1));
}