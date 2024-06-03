export interface GearResponse {
    status: number;
    data:   Gear[];
}

export interface Gear {
    uuid:        string;
    displayName: string;
    description: string;
    displayIcon: string;
    assetPath:   string;
    shopData:    ShopData;
}

export interface ShopData {
    cost:              number;
    category:          string;
    shopOrderPriority: number;
    categoryText:      string;
    gridPosition:      null;
    canBeTrashed:      boolean;
    image:             null;
    newImage:          string;
    newImage2:         null;
    assetPath:         string;
}
