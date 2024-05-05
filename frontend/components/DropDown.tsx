import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Container from './Container.tsx';
import {
  Modal,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Color} from '../../Settings.ts';
import Column from './Column.tsx';

DropDown.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired as unknown as string[],
  setItem: PropTypes.func.isRequired,
  flex: PropTypes.number,
};

function DropDown(props: PropTypes.InferProps<typeof DropDown.propTypes>) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  function handleItemPress(item: string) {
    props.setItem(item);
    setModalVisible(false);
  }

  // TODO MODAL

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.8}>
      <Container
        flex={props.flex}
        hasBottomLeftCorner
        hasTopRightCorner
        hasTopLeftCorner
        hasBottomRightCorner>
        <Text style={styles.title}>{props.title}</Text>
      </Container>
      <Modal animationType={'slide'} visible={modalVisible} transparent>
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Column paddingH={8} gap={6}>
            {props.data.map((item: string, index: number) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleItemPress(item)}>
                  <Container
                    key={index}
                    padding={24}
                    hasTopLeftCorner={index === 0}
                    hasTopRightCorner={index === 0}
                    hasBottomLeftCorner={index === props.data.length - 1}
                    hasBottomRightCorner={index === props.data.length - 1}>
                    <Text style={styles.modalText}>{item.toUpperCase()}</Text>
                  </Container>
                </TouchableOpacity>
              );
            })}
          </Column>
        </ScrollView>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingVertical: 8,
    color: Color.textPrimary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000e',
  },
  modalText: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.textPrimary,
  },
});

export default DropDown;
