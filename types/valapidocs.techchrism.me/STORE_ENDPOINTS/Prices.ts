import { IStorefrontOffer } from "./Storefront";

export interface IPricesResponse {
    Offers: IStorefrontOffer[];
};

export interface IPricesResponseCost {
    [x: string]: number;
};