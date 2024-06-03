export interface IDailyImageMapping {
  [key: number]: any;
}

export interface IContentTier {
  [uuid: string]: string;
}

export interface ICurrencyUuid {
  [currency: string]: string;
}

export interface ILevelImage {
  [level: number]: any;
}

export interface IWeaponInfo {
  [uuid: string]: {
    name: string;
    type: string;
  };
}

export interface IWeeklyXpPerMission {
  [missionNumber: string]: number;
}

export interface IGamemodeInfo {
  [gamemode: string]: {
    avgLengthInMin: number;
    avgXpPerMatch: number;
  };
}
