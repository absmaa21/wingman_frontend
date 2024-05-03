export interface IOwnedItemsResponse {
    EntitlementsByTypes: IEntitlementsByType[];
};

export interface IEntitlementsByType {
    ItemTypeID: string;
    Entitlements: IEntitlement[];
};

export interface IEntitlement {
    TypeID: string;
    ItemID: string;
    InstanceID?: string | undefined;
};
