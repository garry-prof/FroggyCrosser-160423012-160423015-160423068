import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawerContent from './CustomDrawerContent';
import COLORS from '../constants/colors';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={function (props) { return <CustomDrawerContent {...props} />; }}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Froggy Crosser' }} />
    </Drawer.Navigator>
  );
}
