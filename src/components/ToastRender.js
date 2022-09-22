import React from 'react';
import { Box, useColorModeValue } from 'native-base';
import PropTypes from 'prop-types';

const ToastRenderer = ({ children, isError }) => {
  return (
    <Box
      bgColor={useColorModeValue(
        isError ? 'error.500' : 'success.500',
        isError ? 'error.800' : 'success.800'
      )}
      px={5}
      py={2}
      mt={5}
      mr={5}
      borderRadius={10}
      borderColor={'white'}
      borderWidth={3}
      _text={{
        color: 'white',
        fontSize: 'md',
        fontWeight: 'extrabold',
      }}
    >
      {children}
    </Box>
  );
};

ToastRenderer.propTypes = {
  children: PropTypes.any,
  isError: PropTypes.bool,
};

export default ToastRenderer;
