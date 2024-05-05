import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Color} from '../../Settings';

InfoBox.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  detailIsPrimary: PropTypes.bool,
  horizontal: PropTypes.bool,
  titleExtra: PropTypes.string,
};

function InfoBox(props: PropTypes.InferProps<typeof InfoBox.propTypes>) {
  return (
    <View
      style={[
        styles.container,
        props.horizontal ? {flexDirection: 'row'} : {flexDirection: 'column'},
      ]}>
      <Text style={styles.primaryText}>
        {props.title}
        <Text style={styles.smallText}>{props.titleExtra}</Text>
      </Text>
      <Text
        style={
          props.detailIsPrimary ? styles.primaryText : styles.secondaryText
        }>
        {props.detail}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    fontSize: 16,
    color: Color.textPrimary,
  },
  secondaryText: {
    fontSize: 14,
    color: Color.textSecondary,
  },
  smallText: {
    fontSize: 13,
    fontWeight: '300',
    color: Color.textFourth,
  },
});

export default InfoBox;
