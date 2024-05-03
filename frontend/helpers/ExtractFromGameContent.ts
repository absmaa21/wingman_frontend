import ValorantApi from "../../backend/valorant-api/api";
import {Skin} from "../../types/valorant-api.com/Weapons/Weapons";
import {logDebug, logInfo} from "../../backend/utils/log-system/log-system";
import {Spray} from "../../types/valorant-api.com/Sprays/Sprays";
import {PlayerCard} from "../../types/valorant-api.com/PlayerCards/PlayerCards";
import {Buddie} from "../../types/valorant-api.com/Buddies/Buddies";
import {Bundle, DisplayNameSubText} from "../../types/valorant-api.com/Bundles/Bundles";

export function getSkinByUuid(uuid: string, api: ValorantApi) {
    const gc = api.getGameContentApi().getGameContent()
    if(!gc.weapons) return undefined
    for (let i = 0; i < gc.weapons.length; i++) {
        for(let j = 0; j < gc.weapons[i].skins.length; j++) {
            if(uuid === gc.weapons[i].skins[j].levels[0].uuid)
                return gc.weapons[i].skins[j]
        }
    }

    return undefined
}

export function getSkinsByUuid(uuids: string[], api: ValorantApi) {
    const gc = api.getGameContentApi().getGameContent()
    const skins: Skin[] = []

    if(!gc.weapons) return undefined
    for (let i = 0; i < gc.weapons.length; i++) {
        for(let j = 0; j < gc.weapons[i].skins.length; j++) {
            if(uuids.includes(gc.weapons[i].skins[j].levels[0].uuid)) {
                skins.push(gc.weapons[i].skins[j])
                logInfo("GetSkinsByUuid: Found skin " + skins.length + " from " + uuids.length)
            }

            if(skins.length === uuids.length) {
                logInfo("GetSkinsByUuid: All skins found.")
                return skins
            }
        }
    }
    logInfo("GetSkinsByUuid: Not all skins found! (" + skins.length + "/" + uuids.length + ")")
    return skins
}

export function getAccessoryByUuid(uuid: string, api: ValorantApi): Spray | PlayerCard | Buddie | undefined {
    const gc = api.getGameContentApi().getGameContent()
    for (let spraysKey in gc.sprays) {
        // @ts-ignore
        if(gc.sprays[spraysKey].uuid === uuid) {
            // @ts-ignore
            return gc.sprays[spraysKey]
        }
    }

    for (let cardKey in gc.playerCards) {
        // @ts-ignore
        if(gc.playerCards[cardKey].uuid === uuid) {
            // @ts-ignore
            return gc.playerCards[cardKey]
        }
    }

    for (let buddyKey in gc.buddies) {
        // @ts-ignore
        if(gc.buddies[buddyKey].levels[0].uuid === uuid) {
            // @ts-ignore
            return gc.buddies[buddyKey]
        }
    }

    return undefined
}

export function getBundleByDataAssetID(dataAssetID: string, api: ValorantApi) {
    for (let i = 0; i < api.getGameContentApi().getGameContent().bundles!.length; i++) {
        if(api.getGameContentApi().getGameContent().bundles![i].uuid === dataAssetID)
            return api.getGameContentApi().getGameContent().bundles![i]
    }

    const emptyBundle: Bundle = {
        uuid: '',
        displayName: '',
        displayNameSubText: null,
        description: '',
        extraDescription: null,
        promoDescription: null,
        useAdditionalContext: false,
        displayIcon: '',
        displayIcon2: '',
        logoIcon: null,
        verticalPromoImage: null,
        assetPath: '',
    }
    return emptyBundle
}
