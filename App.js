import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './Routes';
import { HeaderProvider } from './src/contexts/headerContext';
import Header from './src/components/Header';

export default function App() {
  const colorModeManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('@my-app-color-mode');
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        console.log(e);
        return 'light';
      }
    },
    set: async value => {
      try {
        await AsyncStorage.setItem('@my-app-color-mode', value);
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <NavigationContainer>
      <HeaderProvider>
        <NativeBaseProvider colorModeManager={colorModeManager}>
          <Header />
          <Routes />
          <StatusBar backgroundColor="white" />
        </NativeBaseProvider>
      </HeaderProvider>
    </NavigationContainer>
  );
}
