export interface IPartyMember {
    Subject: string;
    CompetitiveTier: number;
    PlayerIdentity: {
        Subject: string;
        PlayerCardID: string;
        PlayerTitleID: string;
        AccountLevel: number;
        PreferredLevelBorderID: string | "";
        Incognito: boolean;
        HideAccountLevel: boolean;
    };
    SeasonalBadgeInfo: null;
    IsOwner?: boolean | undefined;
    QueueEligibleRemainingAccountLevels: number;
    Pings: {
        Ping: number;
        GamePodID: string;
    }[];
    IsReady: boolean;
    IsModerator: boolean;
    UseBroadcastHUD: boolean;
    PlatformType: EPlatformType;
};

export enum EPlatformType{
    PC = "PC"
}

export interface IPartyCustomGameSettings {
    Map: string;
    Mode: string;
    UseBots: boolean;
    GamePod: string;
    GameRules: {
        AllowGameModifiers?: string | undefined;
        IsOvertimeWinByTwo?: string | undefined;
        PlayOutAllRounds?: string | undefined;
        SkipMatchHistory?: string | undefined;
        TournamentMode?: string | undefined;
    } | null;
};

export interface IPartyCustomGameMembership {
    teamOne: {
        Subject: string;
    }[] | null;
    teamTwo: {
        Subject: string;
    }[] | null;
    teamSpectate: {
        Subject: string;
    }[] | null;
    teamOneCoaches: {
        Subject: string;
    }[] | null;
    teamTwoCoaches: {
        Subject: string;
    }[] | null;
};

export interface IPartyMatchmakingData {
    QueueID: string;
    PreferredGamePods: string[];
    SkillDisparityRRPenalty: number;
};

export interface IPartyErrorNotification {
    ErrorType: string;
    ErroredPlayers: {
        Subject: string;
    }[] | null;
};

export interface IPartyCheatData {
    GamePodOverride: string;
    ForcePostGameProcessing: boolean;
};

export interface IPartyResponse {
    ID: string;
    MUCName: string;
    VoiceRoomID: string;
    Version: number;
    ClientVersion: string;
    Members: IPartyMember[];
    State: string;
    PreviousState: string;
    StateTransitionReason: string;
    Accessibility: EPartyAccessibility;
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
    CheatData: IPartyCheatData;
    XPBonuses: unknown[];
    /** Empty string when there is no invite code */
    InviteCode: string;
};

export interface IPartyCustomGameData {
    Settings: IPartyCustomGameSettings;
    Membership: IPartyCustomGameMembership;
    MaxPartySize: number;
    AutobalanceEnabled: boolean;
    AutobalanceMinPlayers: number;
    HasRecoveryData: boolean;
}

export enum EPartyAccessibility {
    OPEN = "OPEN",
    CLOSED = "CLOSED"
}
