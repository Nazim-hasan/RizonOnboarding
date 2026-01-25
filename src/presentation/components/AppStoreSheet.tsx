import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { CustomBottomSheet } from '../components/CustomBottomSheet';
import { RizonButton } from '../components/RizonButton';
import { typography, spacing } from '../theme';

interface AppStoreSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onReview: () => void;
}

export const AppStoreSheet: React.FC<AppStoreSheetProps> = ({ 
  isVisible, 
  onClose, 
  onReview 
}) => {
  return (
    <CustomBottomSheet isVisible={isVisible} onClose={onClose}>
      {/* Mock Badge Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>★</Text>
      </View>

      <Text style={typography.header}>Got a minute to help us grow?</Text>
      <Text style={[typography.body, styles.subtext]}>
        It takes less than a minute and helps us a lot.
      </Text>

      <RizonButton 
        title="Leave a review" 
        onPress={onReview}
      />
    </CustomBottomSheet>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#002244', // Dark blue mock
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.l,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#C0C0C0', // Silver border
  },
  iconText: {
    fontSize: 30,
    color: '#FFF',
  },
  subtext: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.m,
  },
});
