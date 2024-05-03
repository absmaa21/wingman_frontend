export interface ISprayLevelsResponse {
    status: number;
    data:   ISprayLevel[];
}

export interface ISprayLevel {
    uuid:        string;
    sprayLevel:  number;
    displayName: string;
    displayIcon: null | string;
    assetPath:   string;
}
