export interface IGamemodesResponse {
    status: number;
    data:   IGamemode[];
}

export interface IGamemode {
    uuid:                  string;
    displayName:           string;
    duration:              null | string;
    economyType:           null | string;
    allowsMatchTimeouts:   boolean;
    isTeamVoiceAllowed:    boolean;
    isMinimapHidden:       boolean;
    orbCount:              number;
    roundsPerHalf:         number;
    teamRoles:             string[] | null;
    gameFeatureOverrides:  IGameFeatureOverride[] | null;
    gameRuleBoolOverrides: IGameRuleBoolOverride[] | null;
    displayIcon:           null | string;
    listViewIconTall:      null | string;
    assetPath:             string;
}

export interface IGameFeatureOverride {
    featureName: string;
    state:       boolean;
}

export interface IGameRuleBoolOverride {
    ruleName: string;
    state:    boolean;
}
