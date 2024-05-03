import { IBuddyLevel } from "./BuddyLevels";

export interface IBuddiesResponse {
    status: number;
    data:   IBuddie[];
}

export interface IBuddie {
    uuid:               string;
    displayName:        string;
    isHiddenIfNotOwned: boolean;
    themeUuid:          null | string;
    displayIcon:        string;
    assetPath:          string;
    levels:             IBuddyLevel[];
}
