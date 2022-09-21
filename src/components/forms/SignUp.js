import _ from 'lodash';
import React from 'react';
import { Box, FormControl, HStack, useToast, VStack, WarningOutlineIcon } from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useEffect, useReducer } from 'react';
import { Link } from '@react-navigation/native';
import Button from '../../shared_components/Button';
import Input from '../../shared_components/Input';
import ScreenContainer from '../../shared_components/ScreenContainer';
import { isValidDate, requiredFields } from '../../utils/validations';
import { createUser } from '../../services/user';
import ToastRender from '../ToastRender';
import { signUpMapper } from '../../constants/labelFieldMapper';
import Text from '../../shared_components/Text';
import { useHeaderContext } from '../../contexts/headerContext';

const initialState = {
    fullName: null,
    email: null,
    dob: null,
    password: null,
    confirmPassword: null,
};

const SignUp = ({ navigation }) => {
    const [signUpDetails, setSignUpDetails] = useReducer(
        (prevState, updatedFields) => ({ ...prevState, ...updatedFields}), initialState
    );

    const [errorState, setErrorState] = useReducer(
        (prevState, updatedFields) => ({ ...prevState, ...updatedFields}), initialState
    );

    const { setTitle } = useHeaderContext();
    const toast = useToast();

    const onSubmit = async () => {
        setErrorState(initialState);
        let { errObj, _isError } = requiredFields(
            ['fullName', 'email', 'dob', 'password', 'confirmPassword'],
            signUpDetails,
            signUpMapper
        );

        if (_isError) {
            setErrorState(errObj);
        }

        if (!isValidDate(signUpDetails.dob)) {
            _isError = true;
            setErrorState({ dob: 'Invalid Date.'});
        }

        if (signUpDetails.password !== signUpDetails.confirmPassword) {
            _isError = true;
            setErrorState({ confirmPassword: 'Password and Confirm Password are not same.'});
        }

        if (!_isError) {
            const userPayload = { ...signUpDetails };
            _.set(userPayload, 'fullName', _.trim(userPayload.fullName));
            _.set(userPayload, 'email', _.toLower(_.trim(userPayload.email)));
            _.set(userPayload, 'dob', moment(new Date(userPayload.dob)).format('YYYY-MM-DD'));
            _.unset(userPayload, 'confirmPassword');

            try {
                await createUser(userPayload);
                toast.show({
                    placement: 'top',
                    render: () => (<ToastRender>Successfully Signed Up !!!</ToastRender>)
                });
                navigation.navigate('SignIn')
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onReset = () => {
        setSignUpDetails(initialState);
        setErrorState(initialState);
    };

    useEffect(() => {
        setTitle('Sign Up');
    }, []);

    return (
        <ScreenContainer flex={1} isScrollable>
            <Box borderColor='white' borderRadius='xl' borderWidth='4' px={2} py={5}>
                <FormControl isRequired>
                    <VStack space={8}>
                        <HStack justifyContent={'space-between'}>
                            <FormControl.Label>
                                {signUpMapper.fullName}
                            </FormControl.Label>
                            <VStack w='60%'>
                                <Input
                                    value={signUpDetails.fullName}
                                    placeholder='Full Name'
                                    nativeID='fullName'
                                    onChangeText={value => setSignUpDetails({ fullName: value})}
                                />
                                <FormControl.ErrorMessage isInvalid leftIcon={<WarningOutlineIcon size='xs'/>}>
                                    {errorState.fullName}
                                </FormControl.ErrorMessage>
                            </VStack>
                        </HStack>
                        <HStack justifyContent={'space-between'}>
                            <FormControl.Label>
                                {signUpMapper.email}
                            </FormControl.Label>
                            <VStack w='60%'>
                                <Input
                                    value={signUpDetails.email}
                                    placeholder='Email Id'
                                    nativeID='email'
                                    onChangeText={value => setSignUpDetails({ email: value})}
                                />
                                <FormControl.ErrorMessage isInvalid leftIcon={<WarningOutlineIcon size='xs'/>}>
                                    {errorState.email}
                                </FormControl.ErrorMessage>
                            </VStack>
                        </HStack>
                        <HStack justifyContent={'space-between'}>
                            <FormControl.Label>
                                {signUpMapper.dob}
                            </FormControl.Label>
                            <VStack w='60%'>
                                <Input
                                    value={signUpDetails.dob}
                                    placeholder='Date of Birth'
                                    nativeID='dob'
                                    onChangeText={value => setSignUpDetails({ dob: value})}
                                />
                                <FormControl.HelperText>
                                    YYYY-MM-DD
                                </FormControl.HelperText>
                                <FormControl.ErrorMessage isInvalid leftIcon={<WarningOutlineIcon size='xs'/>}>
                                    {errorState.dob}
                                </FormControl.ErrorMessage>
                            </VStack>
                        </HStack>
                        <HStack justifyContent={'space-between'}>
                            <FormControl.Label>
                                {signUpMapper.password}
                            </FormControl.Label>
                            <VStack w='60%'>
                            <Input
                                value={signUpDetails.password}
                                placeholder='Password'
                                nativeID='password'
                                type='password'
                                onChangeText={value => setSignUpDetails({ password: value})}
                            />
                                <FormControl.ErrorMessage isInvalid leftIcon={<WarningOutlineIcon size='xs'/>}>
                                    {errorState.password}
                                </FormControl.ErrorMessage>
                            </VStack>
                        </HStack>
                        <HStack justifyContent={'space-between'}>
                            <FormControl.Label>
                                {signUpMapper.confirmPassword}
                            </FormControl.Label>
                            <VStack w='60%'>
                                <Input
                                    value={signUpDetails.confirmPassword}
                                    placeholder='Confirm Password'
                                    nativeID='confirmPassword'
                                    type='password'
                                    onChangeText={value => setSignUpDetails({ confirmPassword: value})}
                                />
                                <FormControl.ErrorMessage isInvalid leftIcon={<WarningOutlineIcon size='xs'/>}>
                                    {errorState.confirmPassword}
                                </FormControl.ErrorMessage>
                            </VStack>
                        </HStack>
                        <HStack justifyContent={'center'}>
                            <Button onPress={onSubmit}>
                                Save
                            </Button>
                            <Button onPress={onReset}>
                                Reset
                            </Button>
                        </HStack>
                        <Link
                            to={{ screen: 'SignIn' }}
                            style={{ textAlign: 'right'}}
                         >
                            <Text textDecorationLine='underline'>
                                Already Signed Up? Sign In
                            </Text>
                        </Link>
                    </VStack>
                </FormControl>
            </Box>
        </ScreenContainer>
    );
};

SignUp.propTypes = {
    navigation: PropTypes.any,
};

export default SignUp;
