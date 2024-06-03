import {IPricesResponseCost} from './Prices';

export interface IStorefrontResponse {
    FeaturedBundle: IStorefrontBundle;
    SkinsPanelLayout: IStorefrontSkinsPanelLayout;
    UpgradeCurrencyStore: IStorefrontUpgradeCurrencyStore;
    AccessoryStore: IStorefrontAccessoryStore;
    BonusStore?: IStorefrontBonusStore | undefined;
}

export interface IStorefrontBundleResponse {
    Bundle: IStorefrontBundle;
    Bundles: IStorefrontBundle[];
    BundleRemainingDurationInSeconds: number;
}

export interface IStorefrontBundle {
    ID: string;
    DataAssetID: string;
    CurrencyID: string;
    Items: IStorefrontBundleItem[];
    ItemOffers: IStorefrontBundleItemOffer[] | null;
    TotalBaseCost: { [x: string]: number } | null;
    TotalDiscountedCost: { [x: string]: number } | null;
    TotalDiscountPercent: number;
    DurationRemainingInSeconds: number;
    WholesaleOnly: boolean;
}

export interface IStorefrontBundleItem {
    Item: {
        ItemTypeID: string;
        ItemID: string;
        Amount: number;
    };
    BasePrice: number;
    CurrencyID: string;
    DiscountPercent: number;
    DiscountedPrice: number;
    IsPromoItem: boolean;
}

export interface IStorefrontBundleItemOffer {
    BundleItemOfferID: string;
    Offer: IStorefrontOffer;
    DiscountPercent: number;
    DiscountedCost: { [x: string]: number };
}

export interface IStorefrontSkinsPanelLayout {
    SingleItemOffers: string[];
    SingleItemStoreOffers: IStorefrontOffer[];
    SingleItemOffersRemainingDurationInSeconds: number;
}

export interface IStorefrontUpgradeCurrencyStore {
    UpgradeCurrencyOffers: IStorefrontUpgradeCurrencyOffer[];
}

export interface IStorefrontUpgradeCurrencyOffer {
    OfferID: string;
    StorefrontItemID: string;
    Offer: IStorefrontOffer;
    DiscountedPercent: number;
}

export interface IStorefrontAccessoryStore {
    AccessoryStoreOffers: IStorefrontAccessoryStoreOffer[];
    AccessoryStoreRemainingDurationInSeconds: number;
    StorefrontID: string;
}

export interface IStorefrontAccessoryStoreOffer {
    Offer: IStorefrontOffer;
    ContractID: string;
}

export interface IStorefrontBonusStore {
    BonusStoreOffers: IStorefrontBonusStoreOffer[];
    BonusStoreRemainingDurationInSeconds: number;
}

export interface IStorefrontBonusStoreOffer {
    BonusOfferID: string;
    Offer: IStorefrontOffer;
    DiscountPercent: number;
    DiscountCosts: { [x: string]: number };
    IsSeen: boolean;
}

export interface IStorefrontOffer {
    OfferID: string;
    IsDirectPurchase: boolean;
    StartDate: string;
    Cost: IPricesResponseCost;
    Rewards: IStorefrontReward[];
}

export interface IStorefrontReward {
    ItemTypeID: string;
    ItemID: string;
    Quantity: number;
}
