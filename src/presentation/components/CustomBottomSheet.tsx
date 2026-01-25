import React from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { colors, spacing } from '../theme';

interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose?: () => void;
  onModalHide?: () => void;
  children: React.ReactNode;
}

const { width } = Dimensions.get('window');

export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ 
  isVisible, 
  onClose, 
  onModalHide,
  children 
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onModalHide={onModalHide}
      avoidKeyboard
      style={styles.modal}
      backdropOpacity={0.5}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.handle} />
          {children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.l,
    paddingBottom: spacing.xl + 20, // Extra padding for bottom safe area approximation
    alignItems: 'center',
    width: width,
  },
  handle: {
    width: 32,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginBottom: spacing.l,
    alignSelf: 'center',
  },
});
