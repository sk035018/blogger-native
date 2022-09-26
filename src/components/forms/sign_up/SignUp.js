import _ from 'lodash';
import React from 'react';
import {
  Box,
  FormControl,
  HStack,
  useToast,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useEffect } from 'react';
import { Link } from '@react-navigation/native';
import Button from '../../../shared_components/Button';
import Input from '../../../shared_components/Input';
import ScreenContainer from '../../../shared_components/ScreenContainer';
import { createUser } from '../../../services/user';
import ToastRender from '../../ToastRender';
import { signUpMapper } from '../../../constants/labelFieldMapper';
import Text from '../../../shared_components/Text';
import { useHeaderContext } from '../../../contexts/headerContext';
import FormBase from '../FormBase';
import { validate } from './utils';

const initialState = {
  fullName: '',
  email: '',
  dob: '',
  password: '',
  confirmPassword: '',
};

const SignUp = ({ navigation }) => {
  const { setTitle } = useHeaderContext();
  const toast = useToast();

  const onSubmit = async values => {
    const signUpPayload = _.cloneDeep(values);
    _.set(signUpPayload, 'fullName', _.trim(signUpPayload.fullName));
    _.set(signUpPayload, 'email', _.toLower(_.trim(signUpPayload.email)));
    _.set(
      signUpPayload,
      'dob',
      moment(new Date(signUpPayload.dob)).format('YYYY-MM-DD')
    );
    _.unset(signUpPayload, 'confirmPassword');

    try {
      await createUser(signUpPayload);

      toast.show({
        placement: 'top',
        render: () => <ToastRender>Successfully Signed Up !!!</ToastRender>,
      });

      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
    }
  };

  const formFields = ({
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    resetForm,
    touched,
  }) => (
    <FormControl isRequired>
      <VStack space={8}>
        <HStack justifyContent={'space-between'}>
          <FormControl.Label>{signUpMapper.fullName}</FormControl.Label>
          <VStack w="60%">
            <Input
              value={values.fullName}
              placeholder="Full Name"
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
            />
            <FormControl.ErrorMessage
              isInvalid
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {touched.fullName && errors.fullName}
            </FormControl.ErrorMessage>
          </VStack>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <FormControl.Label>{signUpMapper.email}</FormControl.Label>
          <VStack w="60%">
            <Input
              value={values.email}
              placeholder="Email Id"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <FormControl.ErrorMessage
              isInvalid
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {touched.email && errors.email}
            </FormControl.ErrorMessage>
          </VStack>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <FormControl.Label>{signUpMapper.dob}</FormControl.Label>
          <VStack w="60%">
            <Input
              value={values.dob}
              placeholder="Date of Birth"
              onChangeText={handleChange('dob')}
              onBlur={handleBlur('dob')}
            />
            <FormControl.HelperText>YYYY-MM-DD</FormControl.HelperText>
            <FormControl.ErrorMessage
              isInvalid
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {touched.dob && errors.dob}
            </FormControl.ErrorMessage>
          </VStack>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <FormControl.Label>{signUpMapper.password}</FormControl.Label>
          <VStack w="60%">
            <Input
              value={values.password}
              placeholder="Password"
              type="password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            <FormControl.ErrorMessage
              isInvalid
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {touched.password && errors.password}
            </FormControl.ErrorMessage>
          </VStack>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <FormControl.Label>{signUpMapper.confirmPassword}</FormControl.Label>
          <VStack w="60%">
            <Input
              value={values.confirmPassword}
              placeholder="Confirm Password"
              type="password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
            />
            <FormControl.ErrorMessage
              isInvalid
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {touched.confirmPassword && errors.confirmPassword}
            </FormControl.ErrorMessage>
          </VStack>
        </HStack>
        <HStack justifyContent={'center'}>
          <Button onPress={handleSubmit}>Save</Button>
          <Button onPress={resetForm}>Reset</Button>
        </HStack>
        <Link to={{ screen: 'SignIn' }} style={{ textAlign: 'right' }}>
          <Text textDecorationLine="underline">Already Signed Up? Sign In</Text>
        </Link>
      </VStack>
    </FormControl>
  );

  useEffect(() => {
    setTitle('Sign Up');
  }, []);

  return (
    <ScreenContainer flex={1} isScrollable>
      <Box borderColor="white" borderRadius="xl" borderWidth="4" px={2} py={5}>
        <FormBase
          initialValues={initialState}
          onSubmit={onSubmit}
          validate={validate}
          formFields={formFields}
        />
      </Box>
    </ScreenContainer>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.any,
};

export default SignUp;
