export interface IXPProgress {
    Level: number;
    XP: number;
};

export interface IAccountXPMatchHistory {
    ID: string;
    /** Date in ISO 8601 format */
    MatchStart: string;
    StartProgress: IXPProgress;
    EndProgress: IXPProgress;
    XPDelta: number;
    XPSources: {
        ID: EXPSources;
        Amount: number;
    }[];
    XPMultipliers: unknown[];
};

export interface IAccountXPResponse {
    Version: number;
    /** Player UUID */
    Subject: string;
    Progress: IXPProgress;
    History: IAccountXPMatchHistory[];
    /** Date in ISO 8601 format */
    LastTimeGrantedFirstWin: string;
    /** Date in ISO 8601 format */
    NextTimeFirstWinAvailable: string;
};

export enum EXPSources {
    TIME_PLAYED = "time-played",
    MATCH_WIN = "match-win",
    FIRST_WIN_OF_THE_DAY = "first-win-of-the-day"
}
