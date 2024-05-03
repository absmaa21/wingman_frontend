export interface ICeremoniesResponse {
    status: number;
    data:   ICeremonie[];
}

export interface ICeremonie {
    uuid:        string;
    displayName: string;
    assetPath:   string;
}
