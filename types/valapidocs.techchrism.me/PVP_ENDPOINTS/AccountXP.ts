export interface IXPProgress {
    Level: number;
    XP: number;
}

export interface IAccountXPMatchHistory {
    ID: string;
    /** Date in ISO 8601 format */
    MatchStart: string;
    StartProgress: IXPProgress;
    EndProgress: IXPProgress;
    XPDelta: number;
    XPSources: {
        ID: string;
        Amount: number;
    }[];
    XPMultipliers: unknown[];
}

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
}
