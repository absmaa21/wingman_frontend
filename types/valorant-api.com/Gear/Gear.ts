export interface IGearResponse {
    status: number;
    data:   IGear[];
}

export interface IGear {
    uuid:        string;
    displayName: string;
    description: string;
    displayIcon: string;
    assetPath:   string;
    shopData:    IShopData;
}

export interface IShopData {
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
