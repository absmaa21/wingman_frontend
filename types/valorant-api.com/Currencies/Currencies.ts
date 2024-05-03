export interface CurrenciesResponse {
    status: number;
    data:   ICurrencie[];
}

export interface ICurrencie {
    uuid:                string;
    displayName:         string;
    displayNameSingular: string;
    displayIcon:         string;
    largeIcon:           string;
    assetPath:           string;
}
