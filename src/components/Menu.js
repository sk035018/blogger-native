import _ from 'lodash';
import React from 'react';
import {
  HamburgerIcon,
  Menu,
  Pressable,
  useColorMode,
  useColorModeValue,
} from 'native-base';
import { useHeaderContext } from '../contexts/headerContext';
import { removeToken } from '../utils/storage';

const AppMenu = () => {
  const { stateToken, setStateToken, navigation } = useHeaderContext();
  const { toggleColorMode } = useColorMode();

  const onLogout = async () => {
    await removeToken();
    setStateToken(null);
    navigation.navigate('SignIn');
  };

  const defaultMenuProps = {
    borderBottomColor: useColorModeValue('darkBlue.900', 'dark.600'),
    borderBottomWidth: '2',
    isDisabled: !stateToken,
  };

  const menuItems = [
    {
      children: 'Home',
    },
    {
      children: 'Profile',
    },
    {
      children: 'Toggle Theme',
      onPress: toggleColorMode,
      isDisabled: false,
    },
    {
      children: 'Log out',
      onPress: onLogout,
    },
  ];

  return (
    <Menu
      p={0}
      mt="16"
      ml="2"
      bg={useColorModeValue('dark.600', 'darkBlue.900')}
      borderColor={useColorModeValue('darkBlue.900', 'dark.600')}
      borderWidth="2"
      borderBottomWidth={0}
      placement="top"
      trigger={triggerProps => (
        <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          <HamburgerIcon
            size="lg"
            color={useColorModeValue('black', 'white')}
          />
        </Pressable>
      )}
    >
      {_.map(menuItems, item => (
        <Menu.Item key={item.children} {...defaultMenuProps} {...item} />
      ))}
    </Menu>
  );
};

export default AppMenu;
