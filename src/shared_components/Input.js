import React from 'react';
import { Input } from 'native-base';

const CustomInput = (props) => (
    <Input 
        p={0}
        px={2}
        borderColor='white'
        borderWidth='1'
        {...props}
    />
);

export default CustomInput;
