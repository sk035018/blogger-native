import React from 'react';
import PropTypes from 'prop-types';
import { Box, ScrollView, useColorModeValue } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenContainer = ({
  isScrollable,
  isInSafeArea,
  children,
  ...props
}) => {
  const colorMode = useColorModeValue(
    props.light || 'dark.600',
    props.dark || 'darkBlue.900'
  );
  if (isScrollable) {
    return (
      <ScrollView
        bg={colorMode}
        pt="30"
        _contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  if (isInSafeArea) {
    return (
      <SafeAreaView {...props}>
        <Box bg={colorMode} {...props.boxProps} flexDir="row">
          {children}
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <Box bg={colorMode} {...props}>
      {children}
    </Box>
  );
};

ScreenContainer.propTypes = {
  isScrollable: PropTypes.bool,
  isInSafeArea: PropTypes.bool,
  children: PropTypes.any,
  light: PropTypes.string,
  dark: PropTypes.string,
  boxProps: PropTypes.any,
};

export default ScreenContainer;
