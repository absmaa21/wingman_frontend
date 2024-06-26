export interface IAgentsResponse {
    status: number;
    data: IAgent[];
}

export interface IAgent {
    uuid: string;
    displayName: string;
    description: string;
    developerName: string;
    characterTags: string[] | null;
    displayIcon: string;
    displayIconSmall: string;
    bustPortrait: null | string;
    fullPortrait: null | string;
    fullPortraitV2: null | string;
    killfeedPortrait: string;
    background: null | string;
    backgroundGradientColors: string[];
    assetPath: string;
    isFullPortraitRightFacing: boolean;
    isPlayableCharacter: boolean;
    isAvailableForTest: boolean;
    isBaseContent: boolean;
    role: IRole | null;
    recruitmentData: IRecruitmentData | null;
    abilities: IAbility[];
    voiceLine: null;
}

export interface IAbility {
    slot: Slot;
    displayName: string;
    description: string;
    displayIcon: null | string;
}

export enum Slot {
    Ability1 = "Ability1",
    Ability2 = "Ability2",
    Grenade = "Grenade",
    Passive = "Passive",
    Ultimate = "Ultimate",
}

export interface IRecruitmentData {
    counterId: string;
    milestoneId: string;
    milestoneThreshold: number;
    useLevelVpCostOverride: boolean;
    levelVpCostOverride: number;
    startDate: Date;
    endDate: Date;
}

export interface IRole {
    uuid: string;
    displayName: DisplayName;
    description: string;
    displayIcon: string;
    assetPath: string;
}

export enum DisplayName {
    Controller = "Controller",
    Duelist = "Duelist",
    Initiator = "Initiator",
    Sentinel = "Sentinel",
}
