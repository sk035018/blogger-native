import { Box, ScrollView, useColorModeValue } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export default ({ isScrollable, children, ...props}) => {
    const colorMode = useColorModeValue(props.light || 'dark.600', props.dark || 'darkBlue.900');
    if (isScrollable) {
        return (
            <ScrollView bg={colorMode} pt='30' _contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {children}
            </ScrollView>
        );
    }
    return (
        <SafeAreaView {...props}>
            <Box bg={colorMode} {...props.boxProps} flexDir='row'>
                {children}
            </Box>
        </SafeAreaView>
    );
};