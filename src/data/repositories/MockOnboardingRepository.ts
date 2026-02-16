import { OnboardingRepository } from '../../domain/repositories/OnboardingRepository';
import { OnboardingStatus } from '../../domain/entities/OnboardingStatus';
import { ApiService } from '../services/ApiService';
import { AuthStore } from '../store/AuthStore';

export class MockOnboardingRepository implements OnboardingRepository {
  async getOnboardingStatus(): Promise<OnboardingStatus> {
    // Simulate network delay
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));

    // logic: return true to simulate "just finished onboarding"
    return {
      isJustFinished: true
    };
  }

  async submitFeedback(feedback: string): Promise<void> {
    console.log('Mock submitting feedback:', feedback);

    const token = AuthStore.getToken();
    if (!token) {
      console.warn('No auth token found, cannot submit feedback to backend');
      // Fallback or throw error? For now, we'll just log and maybe simulate success or fail
      // But user wants "modify send feedback add url", so we should try to use it.
      throw new Error("User not authenticated");
    }

    await ApiService.submitFeedback(feedback, token);
  }
}
