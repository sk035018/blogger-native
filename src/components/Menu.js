import { HamburgerIcon, Menu, Pressable, useColorMode, useColorModeValue } from "native-base";
import _ from 'lodash';
import { useHeaderContext } from "../contexts/headerContext";
import { removeToken } from "../utils/storage";

export default () => {
    const { stateToken, setStateToken } = useHeaderContext();
    const { toggleColorMode } = useColorMode();

    const onLogout = async () => {
        await removeToken();
        setStateToken(null);
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
            children: 'Toggle Theme',
            onPress: toggleColorMode,
            isDisabled: false,
        },
        {
            children: 'Log out',
            onPress: onLogout,
        }
    ];

    return (
        <Menu p={0} bg={useColorModeValue('dark.600', 'darkBlue.900')}
            borderColor={useColorModeValue('darkBlue.900', 'dark.600')}
            borderWidth='2'
            borderBottomWidth={0}
            placement='top'
            trigger={triggerProps => (
                <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <HamburgerIcon size='lg' color={useColorModeValue('black', 'white')} />
                </Pressable>
        )}>
            {_.map(menuItems, (item) => (
                <Menu.Item key={item.children} {...defaultMenuProps} {...item} />
            ))}
        </Menu>
      );
  }