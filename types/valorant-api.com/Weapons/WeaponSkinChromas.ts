export interface IWeaponSkinChromasResponse {
    status: number;
    data:   IWeaponSkinChroma[];
}

export interface IWeaponSkinChroma {
    uuid:          string;
    displayName:   string;
    displayIcon:   null | string;
    fullRender:    string;
    swatch:        null | string;
    streamedVideo: null | string;
    assetPath:     string;
}
