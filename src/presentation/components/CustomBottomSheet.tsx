import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { colors, spacing } from '../theme';

interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const { width } = Dimensions.get('window');

export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ 
  isVisible, 
  onClose, 
  children 
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      backdropOpacity={0.5}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={styles.container}>
        <View style={styles.handle} />
        {children}
      </View>
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
    width: 40,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginBottom: spacing.l,
  },
});
