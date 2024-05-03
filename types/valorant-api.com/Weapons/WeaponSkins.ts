import { IWeaponSkinChroma } from "./WeaponSkinChromas";
import {ELevelItem, IWeaponSkinLevel} from "./WeaponSkinLevels"

export interface IWeaponSkinsResponse {
    status: number;
    data:   IWeaponSkin[];
}

export interface IWeaponSkin {
    uuid:            string;
    displayName:     string;
    themeUuid:       string;
    contentTierUuid: null | string;
    displayIcon:     null | string;
    wallpaper:       null | string;
    assetPath:       string;
    chromas:         IWeaponSkinChroma[];
    levels:          IWeaponSkinLevel[];
}

export interface IChroma {
    uuid:          string;
    displayName:   string;
    displayIcon:   null | string;
    fullRender:    string;
    swatch:        null | string;
    streamedVideo: null | string;
    assetPath:     string;
}

export interface ILevel {
    uuid:          string;
    displayName:   string;
    levelItem:     ELevelItem | null;
    displayIcon:   null | string;
    streamedVideo: null | string;
    assetPath:     string;
}
