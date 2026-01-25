import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomBottomSheet } from '../../../components/CustomBottomSheet';
import { RizonButton } from '../../../components/RizonButton';
import { colors, spacing, typography } from '../../../theme';

interface OnboardingSuccessViewProps {
  isVisible: boolean;
  onNegative: () => void;
  onPositive: () => void;
}

export const OnboardingSuccessView: React.FC<OnboardingSuccessViewProps> = ({ 
  isVisible, 
  onNegative, 
  onPositive 
}) => {
  return (
    <CustomBottomSheet isVisible={isVisible}>
      {/* Mock logo area */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>RIZON</Text>
      </View>

      <Text style={typography.header}>Enjoying Rizon so far?</Text>
      <Text style={[typography.body, styles.subtext]}>
        Your feedback helps us build a better money experience.
      </Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <RizonButton 
            title="Not yet" 
            variant="secondary" 
            onPress={onNegative} 
          />
        </View>
        <View style={styles.spacer} />
        <View style={styles.buttonWrapper}>
          <RizonButton 
            title="Yes, loving it" 
            variant="primary" 
            onPress={onPositive} 
          />
        </View>
      </View>
    </CustomBottomSheet>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.rizonYellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.l,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subtext: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.m,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
  },
  spacer: {
    width: spacing.m,
  },
});
