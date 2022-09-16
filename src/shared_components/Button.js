import { Button } from "native-base";
import { useAppColors } from "../utils/appColors";

export default (props = {}) => {
    const { bgColorMode, textColorMode } = useAppColors();
    return (
        <Button
            px={5}
            py={2}
            mx={5}
            size="md"
            variant="outline"
            bg={bgColorMode}
            _text={{
                color: textColorMode,
            }}
            borderRadius='lg'
            borderColor='dark.900'
            borderWidth='4'
            {...props}
        >
            {props.children}
        </Button>
    );
};