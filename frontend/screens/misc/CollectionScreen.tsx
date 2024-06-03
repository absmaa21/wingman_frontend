import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../../Settings';
import CollectionCard from '../../components/CollectionCard';
import {weaponInfo} from '../../../statics/Mappings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {tempPlayerLoadout} from '../../temp_data/tempCollection';
import {useApi} from "../../contexts/apiContext";
import {loadPlayerLoadout} from "../../interface.ts";
import IPlayerLoadout from "../../../backend/api/types/pvp/player-loadout.ts";

export default function CollectionScreen() {
    const api = useApi()
    const userApi = api.getUserApi()
    const user = userApi.getActiveUser()

    const [refreshLoadoutData, setRefreshLoadoutData] = useState(false)
    const [playerLoadout, setPlayerLoadout] = useState<IPlayerLoadout>()
    const [chosenWeaponID, setChosenWeaponID] = useState('');

    const windowWidth = Dimensions.get('window').width;
    const cardWidth = (windowWidth - 24) / 2;

    function handlePresetsButtonPress() {
        console.log('Presets Button pressed')
    }

    useEffect(() => {
        loadPlayerLoadout(api, setPlayerLoadout)
        setRefreshLoadoutData(false)
    }, [refreshLoadoutData]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.presetsButton} onPress={() => handlePresetsButtonPress()}>
                <Text style={styles.presetsText}>Presets</Text>
            </TouchableOpacity>
            <FlatList
                data={playerLoadout?.Guns}
                numColumns={Math.floor(windowWidth / cardWidth)}
                columnWrapperStyle={styles.collectionCardsContainer}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => {
                            setChosenWeaponID(item.ID);
                        }}>
                        <CollectionCard weaponObject={item} />
                    </TouchableOpacity>
                )}
            />

            {chosenWeaponID !== '' && (
                <View style={[styles.modalContainer, {width: windowWidth}]}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.modalHeader}>
                            Owned skins for {weaponInfo[chosenWeaponID as keyof typeof weaponInfo].name}
                        </Text>
                        <TouchableOpacity
                            style={styles.closeModalBtn}
                            onPress={() => {
                                setChosenWeaponID('');
                            }}>
                            <MaterialCommunityIcons name={'close'} size={24} color={Color.textSecondary} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor: Color.backgroundPrimary,
    },

    presetsButton: {
        padding: 8,
        marginTop: 8,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 4,
        backgroundColor: Color.accent,
    },
    presetsText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: Color.textPrimary,
    },

    collectionCardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    modalContainer: {
        position: 'absolute',
        height: '100%',
        padding: 8,
        justifyContent: 'center',
        backgroundColor: '#000a',
    },
    contentContainer: {
        borderRadius: 12,
        padding: 8,
        backgroundColor: Color.backgroundPrimary,
    },
    modalHeader: {
        textAlign: 'center',
        fontSize: 18,
        color: Color.textSecondary,
    },
    closeModalBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
});
