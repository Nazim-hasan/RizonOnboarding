import { useEffect, useState } from "react";
import { Platform, Linking } from "react-native";
import { GetOnboardingStatusUseCase } from "../../../../domain/usecases/GetOnboardingStatusUseCase";
import { OnboardingStep } from "../OnboardingModel";
import { SubmitFeedbackUseCase } from "../../../../domain/usecases/SubmitFeedbackUseCase";

export const useOnboardingController = (
  getOnboardingStatusUseCase: GetOnboardingStatusUseCase,
  submitFeedbackUseCase: SubmitFeedbackUseCase
) => {
  const [step, setStep] = useState<OnboardingStep>('idle');
  const [isLoading, setIsLoading] = useState(true);

  // State to track where to go NEXT after the current sheet closes
  const [nextStep, setNextStep] = useState<OnboardingStep>('idle');

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

  // When user clicks "Not yet", close current sheet and QUEUE next step
  const onNegativeFeedback = () => {
    setStep('idle'); // Close first
    setNextStep('feedback'); // Queue next
  };

  // When user clicks "Yes", close current sheet and QUEUE next step
  const onPositiveFeedback = () => {
    setStep('idle');
    setNextStep('appstore');
  };

  const submitFeedback = async (feedback: string) => {
    try {
      await submitFeedbackUseCase.execute(feedback);
      setStep('idle'); // Close sheet on success
    } catch (error) {
      console.error('Failed to submit feedback', error);
      throw error; 
    }
  };

  const closeFeedback = () => {
    setStep('idle');
  };

  const handleReview = () => {
    // Redirect to Store based on platform
    const url = Platform.OS === 'ios'
      ? 'https://apps.apple.com/sk/app/rizon-stablecoin-finance/id6745082515'
      : 'https://play.google.com/store/apps/details?id=com.rizon.app&hl=en';

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    }).catch(err => console.error('An error occurred', err));
    
    setStep('idle');
  };

  const closeAppStore = () => {
    setStep('idle');
  };

  // Called by OnboardingSuccessView.onModalHide
  const onSuccessSheetHide = () => {
    if (nextStep !== 'idle') {
      setStep(nextStep);
      setNextStep('idle');
    }
  };

  // Manual trigger
  const openOnboarding = () => {
    setStep('success');
  };

  return {
    step,
    isLoading,
    onNegativeFeedback,
    onPositiveFeedback,
    submitFeedback,
    closeFeedback,
    handleReview,
    closeAppStore,
    onSuccessSheetHide,
    openOnboarding,
  };
};
