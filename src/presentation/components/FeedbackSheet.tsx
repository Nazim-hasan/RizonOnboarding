import React, { useState } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { CustomBottomSheet } from '../components/CustomBottomSheet';
import { RizonButton } from '../components/RizonButton';
import { RizonInput } from '../components/RizonInput';
import { typography, spacing } from '../theme';

interface FeedbackSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => Promise<void>;
}

export const FeedbackSheet: React.FC<FeedbackSheetProps> = ({ 
  isVisible, 
  onClose, 
  onSubmit 
}) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    if (isSubmitting) return; // Prevent race conditions
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(feedback);
      setFeedback(''); // Reset field
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to send feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomBottomSheet isVisible={isVisible} onClose={onClose}>
      <Text style={typography.header}>Help us improve Rizon</Text>
      <Text style={[typography.body, styles.subtext]}>
        Tell us what didn't feel right, we read every message.
      </Text>

      <RizonInput
        placeholder="Type your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />

      <RizonButton 
        title="Send feedback" 
        onPress={handleSend}
        loading={isSubmitting}
      />
    </CustomBottomSheet>
  );
};

const styles = StyleSheet.create({
  subtext: {
    marginBottom: spacing.l,
    paddingHorizontal: spacing.m,
  },
});
