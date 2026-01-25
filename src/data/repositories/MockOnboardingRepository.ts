import { OnboardingRepository } from '../../domain/repositories/OnboardingRepository';
import { OnboardingStatus } from '../../domain/entities/OnboardingStatus';

export class MockOnboardingRepository implements OnboardingRepository {
  async getOnboardingStatus(): Promise<OnboardingStatus> {
    // Simulate network delay
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
    
    // logic: return true to simulate "just finished onboarding"
    return {
      isJustFinished: true
    };
  }
}
