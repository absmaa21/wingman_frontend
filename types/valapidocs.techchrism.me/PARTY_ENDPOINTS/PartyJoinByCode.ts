export type PartyJoinByCodeResponse = {
    /** Player UUID */
    Subject: string;
    Version: number;
    /** Party ID */
    CurrentPartyID: string;
    Invites: null;
    Requests: PartyJoinByCodeResponseRequest[];
    PlatformInfo: PartyJoinByCodeResponsePlatformInfo;
};

export type PartyJoinByCodeResponseRequest = {
    ID: string;
    /** Party ID */
    PartyID: string;
    /** Player UUID */
    RequestedBySubject: string;
    Subjects: string[];
    /** Date in ISO 8601 format */
    CreatedAt: string;
    /** Date in ISO 8601 format */
    RefreshedAt: string;
    ExpiresIn: number;
};

export type PartyJoinByCodeResponsePlatformInfo = {
    platformType: "PC";
    platformOS: "Windows";
    platformOSVersion: string;
    platformChipset: "Unknown";
};
