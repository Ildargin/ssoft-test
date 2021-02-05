export const LINKS = {
  COMPETITIONS_LINK: 'https://api.football-data.org/v2/competitions/',
  TEAMS_LINK: 'https://api.football-data.org/v2/teams/',
  COMPETITION_LINK: (id) => `https://api.football-data.org/v2/competitions/${id}`,
  COMPETITION_STANDINGS: (id) => `https://api.football-data.org/v2/competitions/${id}/standings`,
  TEAM_LINK: (id) => `https://api.football-data.org/v2/teams/${id}`,
  TEAM_MATCHES_LINK: (id) => `https://api.football-data.org/v2/teams/${id}/matches`
}
