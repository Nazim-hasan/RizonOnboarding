export const colors = {
  primary: '#000000',
  secondary: '#FFFFFF',
  rizonYellow: '#FFF200',
  textPrimary: '#000000',
  textSecondary: '#666666',
  border: '#E5E5E5',
  background: '#F5F5F5',
};

export const spacing = {
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

export const typography = {
  header: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: '600' as '600',
    color: colors.textPrimary,
    textAlign: 'center' as 'center',
    marginBottom: 8,
  },
  body: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center' as 'center',
    lineHeight: 24,
  },
};
