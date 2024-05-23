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

  const client = new ValorantClient(api.getGameContentApi().getGameContent());
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
  }

  const client = new ValorantClient(api.getGameContentApi().getGameContent());
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
