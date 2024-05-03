export interface ILeaderboardPlayer {
    PlayerCardID: string;
    TitleID: string;
    IsBanned: boolean;
    IsAnonymized: boolean;
    puuid: string;
    gameName: string;
    tagLine: string;
    leaderboardRank: number;
    rankedRating: number;
    numberOfWins: number;
    competitiveTier: number;
};

export interface ITierDetails {
    [x: string]: {
        rankedRatingThreshold: number;
        startingPage: number;
        startingIndex: number;
    };
};

export interface ILeaderboardResponse {
    Deployment: string;
    QueueID: string;
    SeasonID: string;
    Players: ILeaderboardPlayer[];
    totalPlayers: number;
    immortalStartingPage: number;
    immortalStartingIndex: number;
    topTierRRThreshold: number;
    tierDetails: ITierDetails;
    startIndex: number;
    query: string;
};
