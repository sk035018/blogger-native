import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  HStack,
  useToast,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import { Link } from '@react-navigation/native';
import Button from '../../../shared_components/Button';
import Input from '../../../shared_components/Input';
import ScreenContainer from '../../../shared_components/ScreenContainer';
import ToastRender from '../../ToastRender';
import { login } from '../../../services/login';
import { setToken } from '../../../utils/storage';
import { signUpMapper } from '../../../constants/labelFieldMapper';
import Text from '../../../shared_components/Text';
import { useHeaderContext } from '../../../contexts/headerContext';
import FormBase from '../FormBase';
import { validate } from './utils';

const initialState = {
  email: null,
  password: null,
};

const SignIn = ({ navigation }) => {
  const [resError, setResError] = useState(null);

  const { setTitle, setStateToken } = useHeaderContext();
  const toast = useToast();

  const onSubmit = async signInDetails => {
    try {
      const userPayload = _.cloneDeep(signInDetails);
      const {
        data: { errMsg, token },
      } = await login(userPayload);

      if (errMsg) {
        setResError(errMsg);
      } else {
        await setToken(token);
        setStateToken(token);
        toast.show({
          placement: 'top',
          render: () => <ToastRender>Successfully Signed In !!!</ToastRender>,
        });
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTitle('Sign In');
  }, []);

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
        <FormControl.ErrorMessage
          alignItems={'center'}
          isInvalid
          leftIcon={<WarningOutlineIcon size="md" />}
          _text={{
            fontSize: 'xl',
            fontWeight: 'bold',
          }}
        >
          {resError}
        </FormControl.ErrorMessage>
        <HStack justifyContent={'center'}>
          <Button onPress={handleSubmit}>Sign In</Button>
          <Button onPress={resetForm}>Reset</Button>
        </HStack>
        <Link style={{ textAlign: 'right' }} to={{ screen: 'SignUp' }}>
          <Text textDecorationLine="underline">
            {`Didn't Signed Up yet? Sign Up`}
          </Text>
        </Link>
      </VStack>
    </FormControl>
  );

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

SignIn.propTypes = {
  navigation: PropTypes.any,
};

export default SignIn;
