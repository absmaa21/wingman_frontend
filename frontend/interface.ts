import {APP_BUILD, EAppBuild} from '../Settings.ts';
import {currencyUuid} from '../statics/Mappings.ts';
import {
    logDebug,
    logError,
    logInfo,
} from '../backend/utils/log-system/log-system.ts';
import ValorantApi from '../backend/valorant-api/api.ts';
import {
    tempAccessoryItemsData,
    tempBundleData,
    tempFeaturedItemsData,
} from './temp_data/tempStoreData.ts';
import React from 'react';
import {
    IStorefrontAccessoryStoreOffer,
    IStorefrontBonusStoreOffer,
    IStorefrontBundle,
    IStorefrontOffer,
} from '../types/valapidocs.techchrism.me/STORE_ENDPOINTS/Storefront.ts';
import ValorantClient from '../backend/api/clients/valorant-client.ts';
import StorefrontEndpoint from '../backend/api/endpoints/store/storefront.ts';
import WalletEndpoint from '../backend/api/endpoints/store/wallet.ts';
import PlayerMMREndpoint from '../backend/api/endpoints/pvp/player-mmr.ts';
import {tempPlayerMMR} from './temp_data/tempProfile.ts';
import {IFetchContentResponse} from '../types/valapidocs.techchrism.me/PVP_ENDPOINTS/FetchContent.ts';
import FetchContentEndpoint from '../backend/api/endpoints/pvp/fetch-content.ts';
import {tempContent} from './temp_data/tempContent.ts';
import AccountXPEndpoint from '../backend/api/endpoints/pvp/account-xp.ts';
import {tempAccountXP} from './temp_data/tempAccountXP.ts';
import GameContentClient from '../backend/api/clients/game-content-client.ts';
import IPlayerMMR from '../backend/api/types/pvp/player-mmr.ts';

const gc = new GameContentClient();

export async function loadUserWallet(
    api: ValorantApi,
    setR: React.Dispatch<React.SetStateAction<number>>,
    setVP: React.Dispatch<React.SetStateAction<number>>,
    setKP: React.Dispatch<React.SetStateAction<number>>,
) {
    logInfo('interface.ts: getting user wallet data ...');
    if (APP_BUILD === EAppBuild.FRONTEND) {
        logDebug('interface.ts: APP_BUILD is frontend -> set temp wallet data');
        setKP(10000);
        setR(533);
        setVP(8434);
        return;
    }

    const activeUser = api.getUserApi().getActiveUser();
    if (!activeUser) {
        logDebug('interface.ts: no active user -> not possible to get user wallet');
        return;
    }

    const client = new ValorantClient(gc);
    const user = api.getUserApi().getActiveUser();
    if (!user) {
        return;
    }
    const r = await new WalletEndpoint(user).query(client);
    if (r.isErr()) {
        logError(
            'interface.ts: something went wrong using WalletEndpoint --> ' +
            r.getErr(),
        );
        return;
    }

    setR(r.unwrap().Balances[currencyUuid.R] ?? -1);
    setVP(r.unwrap().Balances[currencyUuid.VP] ?? -1);
    setKP(r.unwrap().Balances[currencyUuid.KP] ?? -1);
    logInfo('interface.ts: got user wallet successfully');
}

export async function loadStorefront(
    api: ValorantApi,
    setBundles: React.Dispatch<
        React.SetStateAction<IStorefrontBundle[] | undefined>
    >,
    setFeaturedItems: React.Dispatch<
        React.SetStateAction<IStorefrontOffer[] | undefined>
    >,
    setAccessoryItems: React.Dispatch<
        React.SetStateAction<IStorefrontAccessoryStoreOffer[] | undefined>
    >,
    setNightmarketItems: React.Dispatch<
        React.SetStateAction<IStorefrontBonusStoreOffer[] | undefined>
    >,
) {
    logInfo('interface.ts: getting user store data ...');
    if (APP_BUILD === EAppBuild.FRONTEND) {
        logDebug(
            'interface.ts: APP_BUILD is frontend --> set temp storefront data',
        );
        setBundles(tempBundleData);
        setFeaturedItems(tempFeaturedItemsData);
        setAccessoryItems(tempAccessoryItemsData);
        setNightmarketItems(undefined);
        return;
    }

    const client = new ValorantClient(gc);
    const user = api.getUserApi().getActiveUser();
    if (!user) {
        return;
    }
    const r = await new StorefrontEndpoint(user).query(client);
    if (r.isErr()) {
        logError(
            'interface.ts: something went wrong using WalletEndpoint --> ' +
            r.getErr(),
        );
        return;
    }
    setBundles(r.unwrap().FeaturedBundle.Bundles);
    setFeaturedItems(r.unwrap().SkinsPanelLayout.SingleItemStoreOffers);
    setAccessoryItems(r.unwrap().AccessoryStore.AccessoryStoreOffers);
    setNightmarketItems(r.unwrap().BonusStore?.BonusStoreOffers);
    logInfo('interface.ts: got storefront data successfully');
}

export async function loadPlayerMMR(
    api: ValorantApi,
    puuid: string,
    setData: React.Dispatch<React.SetStateAction<IPlayerMMR | undefined>>,
) {
    logInfo('interface.ts: getting user store data ...');
    if (APP_BUILD === EAppBuild.FRONTEND) {
        logDebug('interface.ts: APP_BUILD is frontend --> set temp playerMMR data');
        setData(tempPlayerMMR);
        return;
    }

    const client = new ValorantClient(gc);
    const user = api.getUserApi().getActiveUser();
    if (!user) {
        return;
    }
    const r = await new PlayerMMREndpoint(user, puuid).query(client);
    if (r.isErr()) {
        logError(
            'interface.ts: something went wrong using PlayerMMREndpoint --> ' +
            r.getErr(),
        );
        return;
    }
    setData(r.unwrap());
    logInfo('interface.ts: got playerMMR data successfully');
}

export async function loadFetchContent(
    api: ValorantApi,
    setData: React.Dispatch<
        React.SetStateAction<IFetchContentResponse | undefined>
    >,
) {
    logInfo('interface.ts: getting user store data ...');
    if (APP_BUILD === EAppBuild.FRONTEND) {
        logDebug(
            'interface.ts: APP_BUILD is frontend --> set temp fetch content data',
        );
        setData(tempContent);
        return;
    }

    const client = new ValorantClient(gc);
    const r = await new FetchContentEndpoint(
        api.getUserApi().getActiveUser()!,
    ).query(client);

    if (r.isErr()) {
        logError(
            'interface.ts: something went wrong using FetchContentEndpoint --> ' +
            r.getErr(),
        );
        return;
    }
    setData(r.unwrap());
    logInfo('interface.ts: got FetchContent data successfully');
}

export async function loadAccountXP(
    api: ValorantApi,
    setData: React.Dispatch<React.SetStateAction<number | undefined>>,
) {
    logInfo('interface.ts: getting account xp data ...');
    if (APP_BUILD === EAppBuild.FRONTEND) {
        logDebug(
            'interface.ts: APP_BUILD is frontend --> set temp account xp data',
        );
        setData(tempAccountXP.Progress.Level);
        return;
    }

    const client = new ValorantClient(gc);
    const r = await new AccountXPEndpoint(
        api.getUserApi().getActiveUser()!,
    ).query(client);

    if (r.isErr()) {
        logError(
            'interface.ts: something went wrong using AccountXPEndpoint --> ' +
            r.getErr(),
        );
        return;
    }
    setData(r.unwrap().Progress.Level);
    logInfo('interface.ts: got accountXP data successfully');
}
