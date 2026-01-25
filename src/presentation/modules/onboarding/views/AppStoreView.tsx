import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomBottomSheet } from '../../../components/CustomBottomSheet';
import { RizonButton } from '../../../components/RizonButton';
import { typography, spacing } from '../../../theme';

interface AppStoreViewProps {
  isVisible: boolean;
  onClose: () => void;
  onReview: () => void;
}

export const AppStoreView: React.FC<AppStoreViewProps> = ({ 
  isVisible, 
  onClose, 
  onReview 
}) => {
  return (
    <CustomBottomSheet isVisible={isVisible} onClose={onClose}>
      {/* Badge Icon with Gradient */}
      <LinearGradient 
        colors={['#000000', '#2A75CF']} 
        style={styles.iconContainer}
        useAngle
        angle={180}
      >
        <Image 
          source={require('../../../../assets/images/star-rating.png')} 
          style={styles.iconImage}
          resizeMode="contain"
        />
      </LinearGradient>

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
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.l,
    borderRadius: 8,
  },
  iconImage: {
    width: 70,
    height: 70,
  },
  subtext: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.m,
  },
});
