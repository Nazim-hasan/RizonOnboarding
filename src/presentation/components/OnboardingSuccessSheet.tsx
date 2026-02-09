import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { CustomBottomSheet } from '../components/CustomBottomSheet';
import { RizonButton } from '../components/RizonButton';
import { colors, spacing, typography } from '../theme';

interface OnboardingSuccessSheetProps {
  isVisible: boolean;
  onNegative: () => void;
  onPositive: () => void;
  onModalHide?: () => void;
}

export const OnboardingSuccessSheet: React.FC<OnboardingSuccessSheetProps> = ({ 
  isVisible, 
  onNegative, 
  onPositive,
  onModalHide
}) => {
  return (
    <CustomBottomSheet isVisible={isVisible} onModalHide={onModalHide}>
      {/* Mock logo area */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/rizon.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
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
      <View style={{
        paddingTop: 20
      }}>
        <RizonButton 
            title="Click me" 
            variant="primary" 
            // onPress={onPositive} 
            wrapperStyle={{
              backgroundColor: 'gray'
            }}
            customTextStyle={{
              color: 'black'
            }}
            disabled
          />
      </View>
      {/* <Pressable  style={{
          backgroundColor: 'black',
          padding: 10,
          borderRadius: 10,

        }}>
          <Text style={{

          }}>Click me</Text>
        </Pressable> */}
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
  logoImage: {
    width: 80,
    height: 80,
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
