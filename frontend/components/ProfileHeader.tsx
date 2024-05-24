import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container.tsx';
import Column from './Column.tsx';
import Row from './Row.tsx';
import {
  Dimensions,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import PlayerName from './PlayerName.tsx';
import PlayerLevel from './PlayerLevel.tsx';
import {Color} from '../../Settings.ts';

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cardUuid: PropTypes.string.isRequired,
};

function ProfileHeader(
  props: PropTypes.InferProps<typeof ProfileHeader.propTypes>,
) {
  const profileImageWidth = Dimensions.get('window').width - 16;
  const imageStyle: StyleProp<ImageStyle> = {
    top: 0,
    width: profileImageWidth,
    height: profileImageWidth * (128 / 452),
  };

  const style: StyleProp<ViewStyle> = {
    marginTop: 12,
  };

  return (
    <View style={style}>
      <Container
        padding={0}
        paddingHorizontal={0}
        hasTopLeftCorner
        hasTopRightCorner>
        <Column>
          <Row>
            <Image
              source={{
                uri: `https://media.valorant-api.com/playercards/${props.cardUuid}/wideart.png`,
              }}
              style={imageStyle}
              resizeMode={'contain'}
            />
          </Row>
          <Row padding={4} paddingH={12}>
            <PlayerName name={props.name} tag={props.tag} width={224} />
            <Text style={styles.profileTitle}>{props.title}</Text>
          </Row>
        </Column>
      </Container>
      <View style={styles.playerLevelBadge}>
        <PlayerLevel level={props.level} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: Color.textFourth,
    textAlign: 'right',
    alignSelf: 'center',
  },
  playerLevelBadge: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: '50%',
    right: '50%',
  },
});

export default ProfileHeader;
