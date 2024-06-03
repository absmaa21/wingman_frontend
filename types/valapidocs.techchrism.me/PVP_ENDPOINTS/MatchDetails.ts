export interface IPlayerInfo {
    subject: string;
    gameName: string;
    tagLine: string;
    platformInfo: {
        platformType: 'PC';
        platformOS: 'Windows';
        platformOSVersion: string;
        platformChipset: 'Unknown';
    };
    teamId: string;
    partyId: string;
    characterId: string;
    stats: IPlayerStats | null;
    roundDamage: IRoundDamage[] | null;
    competitiveTier: number;
    isObserver: boolean;
    playerCard: string;
    playerTitle: string;
    preferredLevelBorder?: string | '' | undefined;
    accountLevel: number;
    sessionPlaytimeMinutes?: number | null | undefined;
    xpModifications?: IXPModification[] | undefined;
    behaviorFactors?: IBehaviorFactors | undefined;
    newPlayerExperienceDetails?: INewPlayerExperienceDetails | undefined;
}

export enum ETeamId {
    BLUE = 'Blue',
    RED = 'Red',
}

export interface IPlayerStats {
    score: number;
    roundsPlayed: number;
    kills: number;
    deaths: number;
    assists: number;
    playtimeMillis: number;
    abilityCasts?: IAbilityCasts | null | undefined;
}

export interface IAbilityCasts {
    grenadeCasts: number;
    ability1Casts: number;
    ability2Casts: number;
    ultimateCasts: number;
}

export interface IRoundDamage {
    round: number;
    receiver: string;
    damage: number;
}

export interface IXPModification {
    Value: number;
    ID: string;
}

export interface IBehaviorFactors {
    afkRounds: number;
    collisions?: number | undefined;
    commsRatingRecovery: number;
    damageParticipationOutgoing: number;
    friendlyFireIncoming?: number | undefined;
    friendlyFireOutgoing?: number | undefined;
    mouseMovement?: number | undefined;
    stayedInSpawnRounds?: number | undefined;
    selfDamage?: number;
}

export interface INewPlayerExperienceDetails {
    basicMovement: IObjectiveDetails;
    basicGunSkill: IObjectiveDetails;
    adaptiveBots: IAdaptiveBotsDetails;
    ability: IObjectiveDetails;
    bombPlant: IObjectiveDetails;
    defendBombSite: IDefendBombSiteDetails;
    settingStatus: {
        isMouseSensitivityDefault: boolean;
        isCrosshairDefault: boolean;
    };
    versionString: string;
}

export interface IObjectiveDetails {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

export interface IAdaptiveBotsDetails {
    adaptiveBotAverageDurationMillisAllAttempts: number;
    adaptiveBotAverageDurationMillisFirstAttempt: number;
    killDetailsFirstAttempt: null;
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

export interface IDefendBombSiteDetails {
    success: boolean;
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

export interface IMatchDetailsResponse {
    matchInfo: IMatchInfo;
    players: IPlayerInfo[];
    bots: unknown[];
    coaches: ICoach[];
    teams: ITeam[] | null;
    roundResults: IRoundResult[] | null;
    kills: IKill[] | null;
}

export interface IMatchInfo {
    matchId: string;
    mapId: string;
    gamePodId: string;
    gameLoopZone: string;
    gameServerAddress: string;
    gameVersion: string;
    gameLengthMillis: number | null;
    gameStartMillis: number;
    provisioningFlowID: string;
    isCompleted: boolean;
    customGameName: string;
    forcePostProcessing: boolean;
    queueID: string;
    gameMode: string;
    isRanked: boolean;
    isMatchSampled: boolean;
    seasonId: string;
    completionState: string;
    platformType: string;
    premierMatchInfo: Record<string, never>;
    partyRRPenalties?: Record<string, number> | undefined;
    shouldMatchDisablePenalties: boolean;
}

export enum EMatchInfoProvisioningFlowID {
    MATCHMAKING = 'Matchmaking',
    CUSTOM_GAME = 'CustomGame',
}

export enum EMatchInfoCompletionState {
    SURRENDERED = 'Surrendered',
    COMPLETED = 'Completed',
    VOTEDRAW = 'VoteDraw',
    NONE = '',
}

export interface ICoach {
    subject: string;
    teamId: string;
}

export interface ITeam {
    teamId: string;
    won: boolean;
    roundsPlayed: number;
    roundsWon: number;
    numPoints: number;
}

export interface IRoundResult {
    roundNum: number;
    roundResult: string;
    roundCeremony: string;
    winningTeam: string;
    bombPlanter?: string | undefined;
    bombDefuser?: string | undefined;
    plantRoundTime?: number | undefined;
    plantPlayerLocations: IPlayerLocation[] | null;
    plantLocation: ILocationXY;
    plantSite: string;
    defuseRoundTime?: number | undefined;
    defusePlayerLocations: IPlayerLocation[] | null;
    defuseLocation: ILocationXY;
    playerStats: IRoundPlayerStats[];
    roundResultCode: string;
    playerEconomies: IPlayerEconomy[] | null;
    playerScores: IPlayerScore[] | null;
}

export interface IRoundPlayerStats {
    subject: string;
    kills: IKill[];
    damage: IDamage[];
    score: number;
    economy: IEconomy;
    ability: IAbility;
    wasAfk: boolean;
    wasPenalized: boolean;
    stayedInSpawn: boolean;
}

export interface IAbility {
    grenadeEffects: null;
    ability1Effects: null;
    ability2Effects: null;
    ultimateEffects: null;
}

export interface IDamage {
    receiver: string;
    damage: number;
    legshots: number;
    bodyshots: number;
    headshots: number;
}

export interface IEconomy {
    loadoutValue: number;
    weapon: string;
    armor: string;
    remaining: number;
    spent: number;
}

export interface IKill {
    gameTime: number;
    roundTime: number;
    killer: string;
    victim: string;
    victimLocation: ILocationXY;
    assistants: any[];
    playerLocations: IPlayerLocation[];
    finishingDamage: IFinishingDamage;
    round?: number;
}

export interface IFinishingDamage {
    damageType: string;
    damageItem: string;
    isSecondaryFireMode: boolean;
}

export enum ERoundResult {
    ELIMINATED = 'Eliminated',
    BOMB_DETONATED = 'Bomb detonated',
    BOMB_DEFUSED = 'Bomb defused',
    SURRENDERED = 'Surrendered',
    ROUND_TIMER_EXPIRED = 'Round timer expired',
}

export enum ERoundCeremony {
    DEFAULT = 'CeremonyDefault',
    TEAM_ACE = 'CeremonyTeamAce',
    FLAWLESS = 'CeremonyFlawless',
    CLOSER = 'CeremonyCloser',
    CLUTCH = 'CeremonyClutch',
    THRIFTY = 'CeremonyThrifty',
    ACE = 'CeremonyAce',
    NONE = '',
}

export enum EPlantSide {
    A = 'A',
    B = 'B',
    C = 'C',
    NONE = '',
}

export enum ERoundResultCode {
    ELIMINATION = 'Elimination',
    DETONATE = 'Detonate',
    DEFUSE = 'Defuse',
    SURRENDERED = 'Surrendered',
    NONE = '',
}

export interface IPlayerLocation {
    subject: string;
    viewRadians: number;
    location: ILocationXY;
}

export interface ILocationXY {
    x: number;
    y: number;
}

export enum EDamageType {
    WEAPON = 'Weapon',
    BOMB = 'Bomb',
    ABILITY = 'Ability',
    FALL = 'Fall',
    MELEE = 'Melee',
    INVALID = 'Invalid',
    NONE = '',
}

export enum EDamageItem {
    ULTIMATE = 'Ultimate',
    ABILITY1 = 'Ability1',
    ABILITY2 = 'Ability2',
    GRENADE_ABILITY = 'GrenadeAbility',
    PRIMARY = 'Primary',
    NONE = '',
}

export interface IPlayerEconomy {
    subject: string;
    loadoutValue: number;
    weapon: string | '';
    armor: string | '';
    remaining: number;
    spent: number;
}

export interface IPlayerScore {
    subject: string;
    score: number;
}
