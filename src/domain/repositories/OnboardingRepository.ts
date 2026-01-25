import { OnboardingStatus } from '../entities/OnboardingStatus';

export interface OnboardingRepository {
  getOnboardingStatus(): Promise<OnboardingStatus>;
  submitFeedback(feedback: string): Promise<void>;
}
