export interface ILevelBordersResponse {
    status: number;
    data:   ILevelBorder[];
}

export interface ILevelBorder {
    uuid:                      string;
    displayName:               string;
    startingLevel:             number;
    levelNumberAppearance:     string;
    smallPlayerCardAppearance: string;
    assetPath:                 string;
}
