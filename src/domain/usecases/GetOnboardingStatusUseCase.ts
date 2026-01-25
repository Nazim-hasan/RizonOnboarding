import { OnboardingRepository } from '../repositories/OnboardingRepository';
import { OnboardingStatus } from '../entities/OnboardingStatus';

export class GetOnboardingStatusUseCase {
  private repository: OnboardingRepository;

  constructor(repository: OnboardingRepository) {
    this.repository = repository;
  }

  async execute(): Promise<OnboardingStatus> {
    return await this.repository.getOnboardingStatus();
  }
}
