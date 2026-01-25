import React from 'react';
import { OnboardingSuccessSheet } from '../../../components/OnboardingSuccessSheet';

interface OnboardingSuccessViewProps {
  isVisible: boolean;
  onNegative: () => void;
  onPositive: () => void;
  onModalHide?: () => void;
}

export const OnboardingSuccessView: React.FC<OnboardingSuccessViewProps> = ({ 
  isVisible, 
  onNegative, 
  onPositive,
  onModalHide
}) => {
  return (
    <OnboardingSuccessSheet
      isVisible={isVisible}
      onNegative={onNegative}
      onPositive={onPositive}
      onModalHide={onModalHide}
    />
  );
};
