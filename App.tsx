
import React from 'react';
import { StatusBar, useColorScheme, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from './src/presentation/modules/onboarding/OnboardingScreen';
import { AuthScreen } from './src/presentation/modules/auth/AuthScreen';
import { colors } from './src/presentation/theme';
import { AuthProvider, useAuth } from './src/presentation/modules/auth/AuthContext';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const isDarkMode = useColorScheme() === 'dark';

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer
      linking={{
        prefixes: ['rizon://', 'https://rizon.app'],
        config: {
          screens: {
            // We can map deep links here if needed, but we handle it manually in AuthContext for now
            // for the specific token verification logic.
          }
        }
      }}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Onboarding" : "Auth"}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
