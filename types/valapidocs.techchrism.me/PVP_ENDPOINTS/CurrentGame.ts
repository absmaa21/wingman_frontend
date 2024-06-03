import {ETeamId} from './MatchDetails.ts';

export interface ICurrentGameMatchResponse {
    MatchID: string;
    Version: number;
    State: string;
    MapID: string;
    ModeID: string;
    ProvisioningFlow: string;
    GamePodID: string;
    AllMUCName: string;
    TeamMUCName: string;
    TeamVoiceID: string;
    TeamMatchToken: string;
    IsReconnectable: boolean;
    ConnectionDetails: IConnectionDetails;
    PostGameDetails: null;
    Players: IPlayer[];
    MatchmakingData: IMatchmakingData;
}

export interface IConnectionDetails {
    GameServerHosts: string[];
    GameServerHost: string;
    GameServerPort: number;
    GameServerObfuscatedIP: number;
    GameClientHash: number;
    PlayerKey: string;
}

export interface IMatchmakingData {
    QueueID: string;
    IsRanked: boolean;
}

export interface IPlayer {
    Subject: string;
    TeamID: ETeamId;
    CharacterID: string;
    PlayerIdentity: IPlayerIdentity;
    SeasonalBadgeInfo: ISeasonalBadgeInfo;
    IsCoach: boolean;
    IsAssociated: boolean;
}

export interface IPlayerIdentity {
    Subject: string;
    PlayerCardID: string;
    PlayerTitleID: string;
    AccountLevel: number;
    PreferredLevelBorderID: string;
    Incognito: boolean;
    HideAccountLevel: boolean;
}

export interface ISeasonalBadgeInfo {
    SeasonID: string;
    NumberOfWins: number;
    WinsByTier: Record<string, number> | null;
    Rank: number;
    LeaderboardRank: number;
}
