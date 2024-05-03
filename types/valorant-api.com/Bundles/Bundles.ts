export interface BundlesResponse {
    status: number;
    data:   IBundle[];
}

export interface IBundle {
    uuid:                 string;
    displayName:          string;
    displayNameSubText:   EDisplayNameSubText | null;
    description:          string;
    extraDescription:     null | string;
    promoDescription:     null | string;
    useAdditionalContext: boolean;
    displayIcon:          string;
    displayIcon2:         string;
    logoIcon:             null | string;
    verticalPromoImage:   null | string;
    assetPath:            string;
}

export enum EDisplayNameSubText {
    Capsule = "CAPSULE",
    CollectorSSet = "COLLECTOR'S SET",
    NowAvailable = "NOW AVAILABLE",
}
