import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Container from './Container.tsx';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Color} from '../../Settings.ts';
import Wrap from './Wrap.tsx';

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
          <Wrap paddingH={8} gap={6} paddingTop={24}>
            {props.data.map((item: string, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => handleItemPress(item)}>
                  <Container padding={24}>
                    <Text style={styles.modalText}>{item.toUpperCase()}</Text>
                  </Container>
                </TouchableOpacity>
              );
            })}
          </Wrap>
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
    backgroundColor: '#000e',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.textPrimary,
  },
});

export default DropDown;
