import { Text, useColorModeValue, useContrastText } from "native-base";

export default (props = {}) => {
    const darkColorContrast = useContrastText('primary.700');
    const lightColorContrast = useContrastText('coolGray.400');

    return (
        <Text
            color={useColorModeValue(lightColorContrast, darkColorContrast)}
            textAlign='right'
            {...props}
        >
            {props.children}
        </Text>
    );
};