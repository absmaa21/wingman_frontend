import { ISprayLevel } from "./SprayLevels";

export interface ISpraysResponse {
    status: number;
    data:   ISpray[];
}

export interface ISpray {
    uuid:                string;
    displayName:         string;
    category:            ECategory | null;
    themeUuid:           null | string;
    isNullSpray:         boolean;
    hideIfNotOwned:      boolean;
    displayIcon:         string;
    fullIcon:            null | string;
    fullTransparentIcon: null | string;
    animationPng:        null | string;
    animationGif:        null | string;
    assetPath:           string;
    levels:              ISprayLevel[];
}

export enum ECategory {
    EAresSprayCategoryContextual = "EAresSprayCategory::Contextual",
}

