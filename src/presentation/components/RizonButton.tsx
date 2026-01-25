import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing } from '../theme';

interface RizonButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export const RizonButton: React.FC<RizonButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  loading = false
}) => {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isPrimary ? styles.primaryContainer : styles.secondaryContainer
      ]} 
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#FFF' : '#000'} />
      ) : (
        <Text style={[
          styles.text, 
          isPrimary ? styles.primaryText : styles.secondaryText
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  secondaryContainer: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: colors.textPrimary,
  },
});
