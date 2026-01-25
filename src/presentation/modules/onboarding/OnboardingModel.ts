export interface OnboardingState {
  isLoading: boolean;
  showSuccessSheet: boolean;
  showFeedbackSheet: boolean;
  showAppStoreSheet: boolean;
}

export type OnboardingStep = 'idle' | 'success' | 'feedback' | 'appstore';
