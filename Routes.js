import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/components/forms/SignIn';
import SignUp from './src/components/forms/SignUp';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='SignIn' options={{ headerShown: false }} component={SignIn} />
            <Stack.Screen name='SignUp' options={{ headerShown: false }} component={SignUp} />
        </Stack.Navigator>
    )
};