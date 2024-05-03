export interface IQueueConfig {
    QueueID: string;
    Enabled: boolean;
    TeamSize: number;
    NumTeams: number;
    MaxPartySize: number;
    MinPartySize: number;
    InvalidPartySizes: number[];
    MaxPartySizeHighSkill: number;
    HighSkillTier: number;
    MaxSkillTier: number;
    AllowFullPartyBypassSkillRestrictions: boolean;
    Mode: string;
    IsRanked: boolean;
    IsTournament: boolean;
    RequireRoster: boolean;
    Priority: number;
    PartyMaxCompetitiveTierRange: number;
    PartyMaxCompetitiveTierRangePlacementBuffer: number;
    FullPartyMaxCompetitiveTierRange: number;
    PartySkillDisparityCompetitiveTiersCeilings: {
        [x: string]: number;
    };
    UseAccountLevelRequirement: boolean;
    MinimumAccountLevelRequired: number;
    GameRules: {
        [x: string]: string;
    };
    SupportedPlatformTypes: "PC"[];
    DisabledContent: unknown[];
    queueFieldA: unknown[];
    NextScheduleChangeSeconds: number;
    TimeUntilNextScheduleChangeSeconds: number;
    /** Array of strings in the format of "map:weight" */
    MapWeights: string[];
};

export interface IGamePodPingServiceInfo {
    [x: string]: {
        SecurityHash: number;
        ObfuscatedIP: number;
        PingProxyAddress: string;
        PingProxyAddresses: string[];
    };
};

export interface ICustomGameConfigsResponse {
    Enabled: boolean;
    EnabledMaps: string[];
    EnabledModes: string[];
    Queues: IQueueConfig[];
    GamePodPingServiceInfo: IGamePodPingServiceInfo;
};
