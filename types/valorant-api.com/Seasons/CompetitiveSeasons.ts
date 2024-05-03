export interface ICompetitiveSeasonsResponse {
    status: number;
    data:   ICompetitiveSeason[];
}

export interface ICompetitiveSeason {
    uuid:                 string;
    startTime:            Date;
    endTime:              Date;
    seasonUuid:           string;
    competitiveTiersUuid: string;
    borders:              IBorder[] | null;
    assetPath:            string;
}

export interface IBorder {
    uuid:         string;
    level:        number;
    winsRequired: number;
    displayIcon:  string;
    smallIcon:    null | string;
    assetPath:    EAssetPath;
}

export enum EAssetPath {
    ShooterGameContentSeasonsBordersBorderLevel0DataAsset = "ShooterGame/Content/Seasons/Borders/Border_Level0_DataAsset",
    ShooterGameContentSeasonsBordersBorderLevel1DataAsset = "ShooterGame/Content/Seasons/Borders/Border_Level1_DataAsset",
    ShooterGameContentSeasonsBordersBorderLevel2DataAsset = "ShooterGame/Content/Seasons/Borders/Border_Level2_DataAsset",
    ShooterGameContentSeasonsBordersBorderLevel3DataAsset = "ShooterGame/Content/Seasons/Borders/Border_Level3_DataAsset",
    ShooterGameContentSeasonsBordersBorderLevel4DataAsset = "ShooterGame/Content/Seasons/Borders/Border_Level4_DataAsset",
    ShooterGameContentSeasonsBordersBorderLevel5DataAsset = "ShooterGame/Content/Seasons/Borders/Border_Level5_DataAsset",
}
