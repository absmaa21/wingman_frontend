export interface IThemesResponse {
    status: number;
    data:   ITheme[];
}

export interface ITheme {
    uuid:               string;
    displayName:        string;
    displayIcon:        null | string;
    storeFeaturedImage: null | string;
    assetPath:          string;
}
