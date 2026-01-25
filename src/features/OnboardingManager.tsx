import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Linking, ActivityIndicator } from 'react-native';
import { OnboardingSuccessSheet } from '../presentation/components/OnboardingSuccessSheet';
import { FeedbackSheet } from '../presentation/components/FeedbackSheet';
import { AppStoreSheet } from '../presentation/components/AppStoreSheet';

export const OnboardingManager = () => {
  const [step, setStep] = useState<'idle' | 'success' | 'feedback' | 'appstore'>('idle');
  const [isLoading, setIsLoading] = useState(true);

  // Simulating backend check for "just finished onboarding"
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // Mock backend delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Assume user just finished onboarding
      setIsLoading(false);
      setStep('success');
    };

    checkOnboardingStatus();
  }, []);

  const handleNegativeFeedback = () => {
    setStep('feedback');
  };

  const handlePositiveFeedback = () => {
    setStep('appstore');
  };

  const submitFeedback = async (feedback: string) => {
    // Mock backend request
    console.log('Sending feedback:', feedback);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep('idle');
  };

  const handleReview = () => {
    const url = Platform.OS === 'ios' 
      ? 'itms-apps://itunes.apple.com/app/idYOUR_APP_ID?action=write-review' 
      : 'market://details?id=YOUR_PACKAGE_NAME';
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
        // Fallback or dev log
      }
    });
    setStep('idle');
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <OnboardingSuccessSheet
        isVisible={step === 'success'} 
        onNegative={handleNegativeFeedback}
        onPositive={handlePositiveFeedback}
      />
      
      <FeedbackSheet
        isVisible={step === 'feedback'}
        onClose={() => setStep('idle')}
        onSubmit={submitFeedback}
      />

      <AppStoreSheet
        isVisible={step === 'appstore'}
        onClose={() => setStep('idle')}
        onReview={handleReview}
      />
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
