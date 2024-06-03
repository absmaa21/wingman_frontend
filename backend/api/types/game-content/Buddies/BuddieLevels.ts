export interface BuddieLevelsResponse {
    status: number;
    data:   BuddieLevel[];
}

export interface BuddieLevel {
    uuid:           string;
    charmLevel:     number;
    hideIfNotOwned: boolean;
    displayName:    string;
    displayIcon:    string;
    assetPath:      string;
}
