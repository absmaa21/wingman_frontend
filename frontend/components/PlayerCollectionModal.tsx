import React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color} from '../../Settings.ts';
import {tempPlayerLoadout} from '../temp_data/tempCollection.ts';
import CollectionCard from './CollectionCard.tsx';
import Row from './Row.tsx';

PlayerCollectionModal.propTypes = {
    puuid: PropTypes.string.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

function PlayerCollectionModal(
    props: PropTypes.InferProps<typeof PlayerCollectionModal.propTypes>,
) {
    const windowHeight = Dimensions.get('window').height - 56;
    const windowWidth = Dimensions.get('window').width;
    const cardWidth = (windowWidth - 24) / 2;

    return (
        <View
            style={[
                styles.playerCollectionWidgetBackground,
                {width: windowWidth, height: windowHeight},
            ]}>
            <Row>
                <Text style={styles.collectionHeader}>Collection of {props.puuid}</Text>
                <TouchableOpacity
                    style={styles.collectionX}
                    onPress={() => {
                        props.handleCloseModal();
                    }}>
                    <MaterialCommunityIcons
                        name={'close'}
                        size={40}
                        color={Color.textFifth}
                    />
                </TouchableOpacity>
            </Row>

            <FlatList
                data={tempPlayerLoadout}
                numColumns={Math.floor(windowWidth / cardWidth)}
                columnWrapperStyle={styles.collectionCardsContainer}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <CollectionCard weaponObject={item}/>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    playerCollectionWidgetBackground: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.backgroundPrimary,
        zIndex: 9,
    },
    collectionCardsContainer: {
        gap: 4,
        paddingBottom: 4,
    },
    collectionHeader: {
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        padding: 11,
    },
    collectionX: {
        position: 'absolute',
        right: 0,
    },
});

export default PlayerCollectionModal;
