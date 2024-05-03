export interface IContractsResponse {
    status: number;
    data:   IContract[];
}

export interface IContract {
    uuid:                   string;
    displayName:            string;
    displayIcon:            null | string;
    shipIt:                 boolean;
    useLevelVPCostOverride: boolean;
    levelVPCostOverride:    number;
    freeRewardScheduleUuid: string;
    content:                IContent;
    assetPath:              string;
}

export interface IContent {
    relationType:              RelationType | null;
    relationUuid:              null | string;
    chapters:                  IChapter[];
    premiumRewardScheduleUuid: null | string;
    premiumVPCost:             number;
}

export interface IChapter {
    isEpilogue:  boolean;
    levels:      ILevel[];
    freeRewards: IReward[] | null;
}

export interface IReward {
    type:          EType;
    uuid:          string;
    amount:        number;
    isHighlighted: boolean;
}

export enum EType {
    Currency = "Currency",
    EquippableCharmLevel = "EquippableCharmLevel",
    EquippableSkinLevel = "EquippableSkinLevel",
    PlayerCard = "PlayerCard",
    Spray = "Spray",
    Title = "Title",
}

export interface ILevel {
    reward:                 IReward;
    xp:                     number;
    vpCost:                 number;
    isPurchasableWithVP:    boolean;
    doughCost:              number;
    isPurchasableWithDough: boolean;
}

export enum RelationType {
    Agent = "Agent",
    Event = "Event",
    Season = "Season",
}
