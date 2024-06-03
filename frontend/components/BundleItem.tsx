import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Color} from '../../Settings';
import {currencyUuid} from '../../statics/Mappings';
import {Image_VP} from '../../statics/Resources';
import {getBundleByDataAssetID} from '../helpers/ExtractFromGameContent';
import {useApi} from '../contexts/apiContext';

const BundleItem = ({item, handleBundleClicked}: any) => {
  const api = useApi();
  const bundleContent = getBundleByDataAssetID(item.DataAssetID, api);
  if (bundleContent) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          handleBundleClicked(item);
        }}
        activeOpacity={0.75}>
        <Image
          source={{
            uri: `https://media.valorant-api.com/bundles/${item.DataAssetID}/displayicon.png`,
          }}
          style={[styles.image, {width: Dimensions.get('window').width}]}
        />
        <Text style={styles.name}>{bundleContent.displayName}</Text>
        <View style={styles.footer}>
          <Image source={Image_VP} style={styles.currencyImage} />
          <Text style={styles.price}>
            {item.TotalDiscountedCost[currencyUuid.VP]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return <Text>Bundle not found.</Text>;
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  image: {
    height: 192,
  },
  name: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.textPrimary,
    textShadowRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyImage: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginTop: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.textPrimary,
  },
});

export default BundleItem;
