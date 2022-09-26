import React from 'react';
import { AddIcon, HStack, Image, Pressable } from 'native-base';
import { useHeaderContext } from '../contexts/headerContext';
import ScreenContainer from '../shared_components/ScreenContainer';
import Text from '../shared_components/Text';
import logo from '../../assets/blog.png';
import Menu from './Menu';
import { CreateBlog } from './modals';
import { useEffect } from 'react';

const Header = () => {
  const { title, setCreateBlogModal, stateToken, navigation } =
    useHeaderContext();

  useEffect(() => {
    if (stateToken && navigation) {
      navigation.navigate('Home');
    }
  }, [stateToken, navigation]);

  return (
    <ScreenContainer
      isInSafeArea
      boxProps={{
        h: '50',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: '5',
        borderColor: 'white',
        flexDir: 'row',
        px: 5,
      }}
    >
      <HStack alignItems={'center'}>
        <Menu />
        <Text ml="5" fontSize="xl" fontWeight="bold">
          {title}
        </Text>
      </HStack>
      <HStack alignItems={'center'}>
        {stateToken && (
          <Pressable
            mr="5"
            borderRadius={100}
            p={0}
            size="7"
            borderColor="white"
            borderWidth="2"
            bgColor={'white'}
            onPress={() => setCreateBlogModal(v => !v)}
          >
            <AddIcon size="lg" color="black" />
          </Pressable>
        )}
        <Image source={logo} size="35" borderRadius="100" alt="Logo" />
      </HStack>
      <CreateBlog />
    </ScreenContainer>
  );
};

export default Header;
