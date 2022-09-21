import { useColorModeValue, useContrastText } from 'native-base';

export const useAppColors = ({ light = 'primary.700', dark = 'coolGray.400' } = {}) => {
    const darkColorContrast = useContrastText(light);
    const lightColorContrast = useContrastText(dark);

    const bgColorMode = useColorModeValue(light, dark);

    const textColorMode = useColorModeValue(darkColorContrast, lightColorContrast);

    return {
        bgColorMode,
        textColorMode,
    };
};
