import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';
import { colors, spacing } from '../theme';

interface RizonInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const RizonInput: React.FC<RizonInputProps> = ({
  placeholder,
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: spacing.m,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.m,
    fontSize: 16,
    color: colors.textPrimary,
  },
  multilineInput: {
    minHeight: 60,
  },
});
