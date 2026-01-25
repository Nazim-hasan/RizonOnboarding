import React, { useMemo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { MockOnboardingRepository } from '../../../data/repositories/MockOnboardingRepository';
import { GetOnboardingStatusUseCase } from '../../../domain/usecases/GetOnboardingStatusUseCase';
import { useOnboardingController } from './controllers/useOnboardingController';
import { OnboardingSuccessView } from './views/OnboardingSuccessView';

export const OnboardingScreen = () => {
  // Dependency Injection (creating instances here for simplicity, could be in a DI container)
  const repository = useMemo(() => new MockOnboardingRepository(), []);
  const useCase = useMemo(() => new GetOnboardingStatusUseCase(repository), [repository]);
  
  const { step, isLoading, onNegativeFeedback, onPositiveFeedback } = useOnboardingController(useCase);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <OnboardingSuccessView 
        isVisible={step === 'success'}
        onNegative={onNegativeFeedback}
        onPositive={onPositiveFeedback}
      />
      {/* Placeholders for other sheets */}
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
