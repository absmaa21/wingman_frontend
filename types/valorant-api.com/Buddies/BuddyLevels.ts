export interface IBuddyLevelsResponse {
    status: number;
    data:   IBuddyLevel[];
}

export interface IBuddyLevel {
    uuid:           string;
    charmLevel:     number;
    hideIfNotOwned: boolean;
    displayName:    string;
    displayIcon:    string;
    assetPath:      string;
}
