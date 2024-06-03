interface IPlayerLoadout {
    /** Player UUID */
    Subject: string;
    Version: number;
    Guns: IPlayerLoadoutGun[];
    Sprays: IPlayerLoadoutSpray[];
    Identity: {
        /** UUID */
        PlayerCardID: string;
        /** UUID */
        PlayerTitleID: string;
        AccountLevel: number;
        /** UUID */
        PreferredLevelBorderID: string;
        HideAccountLevel: boolean;
    };
    Incognito: boolean;
}

export interface IPlayerLoadoutGun {
    ID: string;
    CharmInstanceID?: string | undefined;
    CharmID?: string | undefined;
    CharmLevelID?: string | undefined;
    SkinID: string;
    SkinLevelID: string;
    ChromaID: string;
    Attachments?: any[];
}

export interface IPlayerLoadoutSpray {
    EquipSlotID: string;
    SprayID: string;
    SprayLevelID: null;
}

export default IPlayerLoadout;
