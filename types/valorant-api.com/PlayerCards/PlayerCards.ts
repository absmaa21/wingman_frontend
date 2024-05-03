export interface IPlayerCardsResponse {
    status: number;
    data:   IPlayerCard[];
}

export interface IPlayerCard {
    uuid:               string;
    displayName:        string;
    isHiddenIfNotOwned: boolean;
    themeUuid:          null | string;
    displayIcon:        string;
    smallArt:           string;
    wideArt:            string;
    largeArt:           string;
    assetPath:          string;
}
