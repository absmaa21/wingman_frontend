export interface IMatch {
    MatchID: string;
    GameStartTime: number;
    QueueID: string;
}

export interface IMatchHistoryResponse {
    Subject: string;
    BeginIndex: number;
    EndIndex: number;
    Total: number;
    History: IMatch[];
}

export enum EQueueID {
    COMPETITIVE = "competitive",
    PREMIER = "premier",
    DEATHMATCH = "deathmatch",
    GGTEAM = "ggteam",
    HURM = "hurm",
    NEWMAP = "newmap",
    SEEDING = "seeding",
    SPIKERUSH = "spikerush",
    SWIFTPLAY = "swiftplay",
    UNRATED = "unrated"
}
