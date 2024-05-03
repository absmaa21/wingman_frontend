export interface IMapsResponse {
    status: number;
    data:   IMap[];
}

export interface IMap {
    uuid:                    string;
    displayName:             string;
    narrativeDescription:    null;
    tacticalDescription:     ETacticalDescription | null;
    coordinates:             null | string;
    displayIcon:             null | string;
    listViewIcon:            string;
    listViewIconTall:        string;
    splash:                  string;
    stylizedBackgroundImage: null | string;
    premierBackgroundImage:  null | string;
    assetPath:               string;
    mapUrl:                  string;
    xMultiplier:             number;
    yMultiplier:             number;
    xScalarToAdd:            number;
    yScalarToAdd:            number;
    callouts:                ICallout[] | null;
}

export interface ICallout {
    regionName:      string;
    superRegionName: ESuperRegionName;
    location:        ILocation;
}

export interface ILocation {
    x: number;
    y: number;
}

export enum ESuperRegionName {
    A = "A",
    AttackerSide = "Attacker Side",
    B = "B",
    C = "C",
    DefenderSide = "Defender Side",
    Mid = "Mid",
}

export enum ETacticalDescription {
    ABCSites = "A/B/C Sites",
    ABSites = "A/B Sites",
}
