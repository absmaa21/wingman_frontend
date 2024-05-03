export interface IPlayerTitlesResponse {
    status: number;
    data:   IPlayerTitle[];
}

export interface IPlayerTitle {
    uuid:               string;
    displayName:        null | string;
    titleText:          null | string;
    isHiddenIfNotOwned: boolean;
    assetPath:          string;
}
