import {IPartyCustomGameData, IPartyErrorNotification, IPartyMatchmakingData, IPartyMember} from "./Party.ts";

export type LeaveMatchmakingQueueResponse = {
    Accessibility: string;
    CheatData: {
        GamePodOverride: string;
        ForcePostGameProcessing: boolean;
    };
    ClientVersion: string;
    CustomGameData: IPartyCustomGameData;
    EligibleQueues: string[];
    ErrorNotification: IPartyErrorNotification;
    /** Party ID */
    ID: string;
    /** Empty string when there is no invite code */
    InviteCode: string;
    Invites: null;
    MUCName: string;
    MatchmakingData: IPartyMatchmakingData;
    Members: IPartyMember[];
    PreviousState: string;
    /** Date in ISO 8601 format */
    QueueEntryTime: string;
    QueueIneligibilities: string[];
    Requests: unknown[];
    RestrictedSeconds: number;
    State: string;
    StateTransitionReason: string;
    Version: number;
    VoiceRoomID: string;
    XPBonuses: unknown[];
}
