import { EQueueAccessibility, IPartyCustomGameData, IPartyErrorNotification, IPartyMatchmakingData, IPartyMember } from "./ChangeQueue";

export interface IEnterMatchmakingQueueResponse {
    ID: string;
    MUCName: string;
    VoiceRoomID: string;
    Version: number;
    ClientVersion: string;
    Members: IPartyMember[];
    State: string;
    PreviousState: string;
    StateTransitionReason: string;
    Accessibility: EQueueAccessibility;
    CustomGameData: IPartyCustomGameData;
    MatchmakingData: IPartyMatchmakingData;
    Invites: null;
    Requests: unknown[];
    /** Date in ISO 8601 format */
    QueueEntryTime: string;
    ErrorNotification: IPartyErrorNotification;
    RestrictedSeconds: number;
    EligibleQueues: string[];
    QueueIneligibilities: string[];
    CheatData: {
        GamePodOverride: string;
        ForcePostGameProcessing: boolean;
    };
    XPBonuses: unknown[];
    /** Empty string when there is no invite code */
    InviteCode: string;
};
