import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import COLORS from '../constants/colors';

import LoginScreen from '../screens/LoginScreen';
import MainDrawer from './MainDrawer';
import GameScreen from '../screens/GameScreen';
import ResultScreen from '../screens/ResultScreen';
import HighScoreScreen from '../screens/HighScoreScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ initialRoute }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="HighScore" component={HighScoreScreen} options={{ title: 'High Score' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
