import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import { OnboardingScreen } from './src/presentation/modules/onboarding/OnboardingScreen';
import { colors } from './src/presentation/theme';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={styles.content}>
        <Text style={styles.mockContent}>Main App Content</Text>
      </View>
      <OnboardingScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockContent: {
    fontSize: 20,
    color: '#CCC',
  },
});

export default App;
