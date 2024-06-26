export interface ContentTiersResponse {
    status: number;
    data:   IContentTier[];
}

export interface IContentTier {
    uuid:           string;
    displayName:    string;
    devName:        string;
    rank:           number;
    juiceValue:     number;
    juiceCost:      number;
    highlightColor: string;
    displayIcon:    string;
    assetPath:      string;
}
