import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SignIn from './src/components/forms/sign_in/SignIn';
import SignUp from './src/components/forms/sign_up/SignUp';
import HomeScreen from './src/components/HomeScreen';
import ScreenContainer from './src/shared_components/ScreenContainer';
import Text from './src/shared_components/Text';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabBar({ state, descriptors, navigation }) {
  return (
    <ScreenContainer isInSafeArea boxProps={{ pt: '2', pb: '2', mt: '-10'}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text textAlign='center' textDecorationLine={isFocused ? 'underline' : 'none' } fontWeight={isFocused ? 'bold' : 'normal'} fontSize={20}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScreenContainer>
  );
}

TabBar.propTypes = {
  state: PropTypes.any,
  descriptors: PropTypes.any,
  navigation: PropTypes.any,
};

function SignTabs() {
  return (
    <Tabs.Navigator
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name='SignIn'
        component={SignIn}
        options={{ headerShown: false, title: 'Sign In' }}
      />
      <Tabs.Screen
        name='SignUp'
        component={SignUp}
        options={{ headerShown: false, title: 'Sign Up' }}
      />
    </Tabs.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInTabs"
        options={{ headerShown: false }}
        component={SignTabs}
      />
      <Stack.Screen
        name="SignUpTabs"
        options={{ headerShown: false }}
        component={SignTabs}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}
