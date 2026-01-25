import { useState, useEffect } from 'react';
import { GetOnboardingStatusUseCase } from '../../../../domain/usecases/GetOnboardingStatusUseCase';
import { OnboardingStep } from '../OnboardingModel';

export const useOnboardingController = (
  getOnboardingStatusUseCase: GetOnboardingStatusUseCase
) => {
  const [step, setStep] = useState<OnboardingStep>('idle');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await getOnboardingStatusUseCase.execute();
        if (status.isJustFinished) {
          setStep('success');
        }
      } catch (error) {
        console.error('Failed to check onboarding status', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, [getOnboardingStatusUseCase]);

  const onNegativeFeedback = () => {
    console.log('User clicked Not Yet');
    setStep('feedback'); // Will implement Screen 2 logic later
  };

  const onPositiveFeedback = () => {
    console.log('User clicked Yes');
    setStep('appstore'); // Will implement Screen 3 logic later
  };

  return {
    step,
    isLoading,
    onNegativeFeedback,
    onPositiveFeedback,
  };
};
