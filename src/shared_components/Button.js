import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'native-base';
import { useAppColors } from '../utils/appColors';

const CustomButton = ({ children, ...props }) => {
    const { bgColorMode, textColorMode } = useAppColors();
    return (
        <Button
            px={5}
            py={2}
            mx={5}
            size='md'
            variant='outline'
            bg={bgColorMode}
            _text={{
                color: textColorMode,
            }}
            borderRadius='lg'
            borderColor='dark.900'
            borderWidth='4'
            {...props}
        >
            {children}
        </Button>
    );
};

CustomButton.propTypes = {
    children: PropTypes.any,
};

export default CustomButton;
