import { Box, FormControl, HStack, useToast, VStack, WarningOutlineIcon } from "native-base";
import _ from 'lodash';
import { useEffect, useReducer } from "react";
import { Link } from "@react-navigation/native";
import Button from "../../shared_components/Button";
import Input from "../../shared_components/Input";
import ScreenContainer from "../../shared_components/ScreenContainer";
import { requiredFields } from "../../utils/validations";
import ToastRender from "../ToastRender";
import { login } from "../../services/login";
import { setToken } from "../../utils/storage";
import { signUpMapper } from "../../constants/labelFieldMapper";
import Text from "../../shared_components/Text";
import { useHeaderContext } from "../../contexts/headerContext";

const initialState = {
    email: null,
    password: null,
};

const initialErrorState = {
    email: null,
    password: null,
    resError: null,
};

export default () => {
    const [signInDetails, setSignInDetails] = useReducer(
        (prevState, updatedFields) => ({ ...prevState, ...updatedFields}), initialState
    );

    const [errorState, setErrorState] = useReducer(
        (prevState, updatedFields) => ({ ...prevState, ...updatedFields}), initialErrorState
    );
    
    const { setTitle, setStateToken } = useHeaderContext();
    const toast = useToast();

    const onSubmit = async () => {
        setErrorState(initialErrorState);
        let { errObj, _isError } = requiredFields(
            ['email', 'password'],
            signInDetails,
            signUpMapper
        );

        if (_isError) {
            setErrorState(errObj);
        }

        if (!_isError) {
            const userPayload = { ...signInDetails };

            try {
                const { data: { errMsg, token } } = await login(userPayload);
                
                if (errMsg) {
                    setErrorState({ resError: errMsg });
                } else {
                    await setToken(token);
                    setStateToken(token);
                    toast.show({
                        placement: 'top',
                        render: () => (<ToastRender>Successfully Signed In !!!</ToastRender>)
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onReset = () => {
        setSignInDetails(initialState);
        setErrorState(initialErrorState);
    };

    useEffect(() => {
        setTitle('Sign In');
    }, []);


    return (
        <ScreenContainer flex={1} isScrollable >
            <Box borderColor='white' borderRadius='xl' borderWidth='4' px={2} py={5}>
                <FormControl isRequired>
                    <VStack space={8}>
                        <HStack justifyContent={'space-between'}>
                            <FormControl.Label>
                                {signUpMapper.email}
                            </FormControl.Label>
                            <VStack w='60%'>
                                <Input
                                    value={signInDetails.email}
                                    placeholder="Email Id"
                                    nativeID="email"
                                    onChangeText={value => setSignInDetails({ email: value})}
                                />
                                <FormControl.ErrorMessage isInvalid leftIcon={<WarningOutlineIcon size='xs'/>}>
                                    {errorState.email}
                                </FormControl.ErrorMessage>
                            </VStack>
                        </HStack>
                        <HStack justifyContent={'space-between'}>
                            <FormControl.Label>
                                {signUpMapper.password}
                            </FormControl.Label>
                            <VStack w='60%'>
                            <Input
                                value={signInDetails.password}
                                placeholder="Password"
                                nativeID="password"
                                type="password"
                                onChangeText={value => setSignInDetails({ password: value})}
                            />
                                <FormControl.ErrorMessage isInvalid leftIcon={<WarningOutlineIcon size='xs'/>}>
                                    {errorState.password}
                                </FormControl.ErrorMessage>
                            </VStack>
                        </HStack>
                        <FormControl.ErrorMessage
                            alignItems={'center'}
                            isInvalid
                            leftIcon={<WarningOutlineIcon size='md' />}
                            _text={{
                                fontSize: 'xl',
                                fontWeight: 'bold'
                            }}
                        >
                            {errorState.resError}
                        </FormControl.ErrorMessage>
                        <HStack justifyContent={'center'}>
                            <Button onPress={onSubmit}>
                                Sign In
                            </Button>
                            <Button onPress={onReset}>
                                Reset
                            </Button>
                        </HStack>
                        <Link
                            style={{ textAlign: 'right'}}
                            to={{ screen: 'SignUp' }}
                        >
                            <Text textDecorationLine='underline'>
                                Didn't Signed Up yet? Sign Up
                            </Text>
                        </Link>
                    </VStack>
                </FormControl>
            </Box>
        </ScreenContainer>
    );
};