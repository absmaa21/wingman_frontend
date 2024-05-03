import {Color} from '../../Settings';
import {PlayerInfo, PlayerLocation} from "../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchDetails";

export function getPositionOfPlayer(matchDetails: any, puuid: string, playerTeam: string): string {
    const playerList = matchDetails.players;
    playerList.sort((a: any, b: any) => b.stats.score - a.stats.score);

    let position = 0;
    let playerIsTeamMVP: boolean = true;
    // @ts-ignore
    playerList.map(player => {
        position++;
        if (player.teamId === playerTeam && player.subject !== puuid && playerIsTeamMVP) {
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

export function getPlayerObject(players: PlayerInfo[], playerUUID: string) {
    let playerObj: PlayerInfo = {
        accountLevel: 0,
        characterId: "",
        competitiveTier: 0,
        gameName: "",
        isObserver: false,
        partyId: "",
        platformInfo: {platformChipset: "Unknown", platformOS: "Windows", platformOSVersion: "", platformType: "PC"},
        playerCard: "",
        playerTitle: "",
        roundDamage: null,
        stats: null,
        subject: "",
        tagLine: "",
        teamId: 'Red'
    };
    for (let i = 0; i < players.length; i++) {
        if(players[i].subject === playerUUID) return players[i]
    }

    return playerObj
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

export function getWinIndicatorColor(playerTeam: string, wonTeam: string): string {
    if (wonTeam === playerTeam) {
        return Color.valorantCyanDark;
    } else if (wonTeam === 'Tie') {
        return Color.valorantYellow;
    } else {
        return Color.valorantRedDark;
    }
}

export function getPlayerTeamRoundsWon(teams: any, playerTeam: string): number {
    if (teams[0].teamId === playerTeam) {
        return teams[0].roundsWon;
    } else {
        return teams[1].roundsWon;
    }
}

export function getEnemyTeamRoundsWon(teams: any, playerTeam: string): number {
    if (teams[0].teamId !== playerTeam) {
        return teams[0].roundsWon;
    } else {
        return teams[1].roundsWon;
    }
}
