export interface IGun {
    ID: string;
    CharmInstanceID?: string;
    CharmID?: string;
    CharmLevelID?: string;
    SkinID: string;
    SkinLevelID: string;
    ChromaID: string;
    Attachments: unknown[];
};

export interface ISpray {
    EquipSlotID: string;
    SprayID: string;
    SprayLevelID: null;
};

export interface IIdentity {
    PlayerCardID: string;
    PlayerTitleID: string;
    AccountLevel: number;
    PreferredLevelBorderID: string;
    HideAccountLevel: boolean;
};

export interface IPlayerLoadoutResponse {
    Subject: string;
    Version: number;
    Guns: IGun[];
    Sprays: ISpray[];
    Identity: IIdentity;
    Incognito: boolean;
};
