import React from 'react';
import PropTypes from 'prop-types';
import { Text, useColorModeValue, useContrastText } from 'native-base';

const CustomText = ({ children, ...props }) => {
  const darkColorContrast = useContrastText('primary.700');
  const lightColorContrast = useContrastText('coolGray.400');

  return (
    <Text
      color={useColorModeValue(lightColorContrast, darkColorContrast)}
      textAlign="right"
      {...props}
    >
      {children}
    </Text>
  );
};

CustomText.propTypes = {
  children: PropTypes.ant,
};

export default CustomText;
