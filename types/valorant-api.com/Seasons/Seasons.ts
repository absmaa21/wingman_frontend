export interface ISeasonsResponse {
    status: number;
    data:   ISeason[];
}

export interface ISeason {
    uuid:        string;
    displayName: string;
    type:        EType | null;
    startTime:   Date;
    endTime:     Date;
    parentUuid:  null | string;
    assetPath:   string;
}

export enum EType {
    EAresSeasonTypeAct = "EAresSeasonType::Act",
}
