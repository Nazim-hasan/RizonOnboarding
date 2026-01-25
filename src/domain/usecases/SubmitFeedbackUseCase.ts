import { OnboardingRepository } from '../repositories/OnboardingRepository';

export class SubmitFeedbackUseCase {
  private repository: OnboardingRepository;

  constructor(repository: OnboardingRepository) {
    this.repository = repository;
  }

  async execute(feedback: string): Promise<void> {
    return await this.repository.submitFeedback(feedback);
  }
}
