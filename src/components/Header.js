import { AddIcon, HStack, Image, Pressable, Tooltip } from "native-base";
import { useHeaderContext } from "../contexts/headerContext";
import ScreenContainer from "../shared_components/ScreenContainer";
import Text from "../shared_components/Text";
import logo from "../../assets/blog.png";
import Menu from "./Menu";

export default () => {
    const { title } = useHeaderContext();
    
    return (
        <ScreenContainer boxProps={{
            h: '50',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: '5',
            borderColor: 'white',
            flexDir: 'row',
            px: 5,
        }}>
            <HStack alignItems={'center'}>
                <Menu />
                <Text ml='5' fontSize='xl' fontWeight='bold' >{title}</Text>
            </HStack>
            <HStack alignItems={'center'}>
                <Tooltip label="Create Blog" openDelay={500}>
                    <Pressable mr='5' borderRadius={100} p={0} size='7' borderColor='white' borderWidth='2' bgColor={'white'}>
                        <AddIcon size='lg' color='black' />
                    </Pressable>
                </Tooltip>
                <Image source={logo} size='35' borderRadius='100' alt="Logo" />
            </HStack>
        </ScreenContainer>
    )
};