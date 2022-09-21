import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/components/forms/SignIn';
import SignUp from './src/components/forms/SignUp';
import HomeScreen from './src/components/HomeScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='SignIn' options={{ headerShown: false }} component={SignIn} />
            <Stack.Screen name='SignUp' options={{ headerShown: false }} component={SignUp} />
            <Stack.Screen name='Home' options={{ headerShown: false }} component={HomeScreen} />
        </Stack.Navigator>
    )
};
