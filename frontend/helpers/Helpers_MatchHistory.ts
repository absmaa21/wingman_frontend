import {Color} from '../../Settings';
import {
  ETeamId,
  IPlayerInfo,
  ITeam,
} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchDetails';

export function getPositionOfPlayer(
  matchDetails: any,
  puuid: string,
  playerTeam: string,
): string {
  const playerList = matchDetails.players;
  playerList.sort((a: any, b: any) => b.stats.score - a.stats.score);

  let position = 0;
  let playerIsTeamMVP: boolean = true;
  // @ts-ignore
  playerList.map(player => {
    position++;
    if (
      player.teamId === playerTeam &&
      player.subject !== puuid &&
      playerIsTeamMVP
    ) {
      playerIsTeamMVP = false;
    }

    if (player.subject === puuid) {
      return position === 1
        ? 'MVP'
        : playerIsTeamMVP
        ? 'TMVP'
        : position === 2
        ? String(position) + 'nd'
        : position === 3
        ? String(position) + 'rd'
        : String(position) + 'th';
    }
  });

  return String(position) + 'th';
}

export function getPlayerPositionColor(playerPosition: string): string {
  if (playerPosition === 'MVP') {
    return Color.gold;
  }
  if (playerPosition === '2nd') {
    return Color.silver;
  }
  if (playerPosition === '3rd') {
    return Color.bronze;
  }
  if (playerPosition === 'TMVP') {
    return Color.blue;
  }

  return Color.grey;
}

export function getPlayerObject(players: IPlayerInfo[], playerUUID: string) {
  let playerObj: IPlayerInfo | undefined;
  for (let i = 0; i < players.length; i++) {
    if (players[i].subject === playerUUID) {
      return players[i];
    }
  }

  return playerObj;
}

export function getWonTeam(teams: any): any {
  if (teams[0].won) {
    return teams[0].teamId;
  } else if (teams[1].won) {
    return teams[1].teamId;
  } else {
    return 'Tie';
  }
}

export function getWinIndicatorColor(
  playerTeam: string,
  wonTeam: string,
): string {
  if (wonTeam === playerTeam) {
    return Color.valorantCyanDark;
  } else if (wonTeam === 'Tie') {
    return Color.valorantYellow;
  } else {
    return Color.valorantRedDark;
  }
}

export function getBlueRoundsWon(teams: ITeam[] | null): number {
  if (!teams) {
    return 0;
  }
  if (teams[0].teamId === ETeamId.BLUE) {
    return teams[0].roundsWon;
  } else {
    return teams[1].roundsWon;
  }
}

export function getRedRoundsWon(teams: ITeam[] | null): number {
  if (!teams) {
    return 0;
  }
  if (teams[0].teamId === ETeamId.RED) {
    return teams[0].roundsWon;
  } else {
    return teams[1].roundsWon;
  }
}

export function getTeamBlueKills(players: IPlayerInfo[]): number {
  let count: number = 0;
  players.map(player => {
    if (player.teamId === ETeamId.BLUE) {
      count += player.stats?.kills ?? 0;
    }
  });
  return count;
}

export function getTeamRedKills(players: IPlayerInfo[]): number {
  let count: number = 0;
  players.map(player => {
    if (player.teamId === ETeamId.RED) {
      count += player.stats?.kills ?? 0;
    }
  });
  return count;
}

export function getTeamBlueDeaths(players: IPlayerInfo[]): number {
  let count: number = 0;
  players.map(player => {
    if (player.teamId === ETeamId.BLUE) {
      count += player.stats?.deaths ?? 0;
    }
  });
  return count;
}

export function getTeamRedDeaths(players: IPlayerInfo[]): number {
  let count: number = 0;
  players.map(player => {
    if (player.teamId === ETeamId.RED) {
      count += player.stats?.deaths ?? 0;
    }
  });
  return count;
}

export function getAvgRank(players: IPlayerInfo[], teamId: ETeamId): number {
  let playerCount = 0;
  let tier = 0;
  players.map(player => {
    if (player.teamId === teamId) {
      playerCount++;
      tier += player.competitiveTier;
    }
  });
  return Number.parseInt((tier / playerCount + 0.5).toFixed(0), 10);
}

export function getBluePlayers(players: IPlayerInfo[]): IPlayerInfo[] {
  const bluePlayers: IPlayerInfo[] = [];
  players.map(player => {
    if (player.teamId === ETeamId.BLUE) {
      bluePlayers.push(player);
    }
  });
  return bluePlayers;
}

export function getRedPlayers(players: IPlayerInfo[]): IPlayerInfo[] {
  const redPlayers: IPlayerInfo[] = [];
  players.map(player => {
    if (player.teamId === ETeamId.RED) {
      redPlayers.push(player);
    }
  });
  return redPlayers;
}
