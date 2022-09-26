import _ from 'lodash';
import React, { useState } from 'react';
import {
  FormControl,
  HStack,
  Modal,
  TextArea,
  useToast,
  WarningOutlineIcon,
} from 'native-base';
import { useHeaderContext } from '../../../contexts/headerContext';
import ScreenContainer from '../../../shared_components/ScreenContainer';
import Input from '../../../shared_components/Input';
import Button from '../../../shared_components/Button';
import { blogMapper } from '../../../constants/labelFieldMapper';
import { createBlog, updateBlog } from '../../../services/blog';
import ToastRender from '../../ToastRender';
import FormBase from '../../forms/FormBase';
import { validate } from './utils';

const initialState = {
  title: null,
  subTitle: null,
  body: null,
};

const CreateBlog = () => {
  const {
    showCreateBlogModal,
    setCreateBlogModal,
    stateToken,
    setReloadBlogs,
    blogToUpdate,
    setBlogToUpdate,
  } = useHeaderContext();

  const [resError, setResError] = useState(null);

  const toast = useToast();

  const onClose = () => {
    setCreateBlogModal(false);
    setBlogToUpdate(null);
  };

  const onSubmit = async blogData => {
    const blogPayload = _.cloneDeep(blogData);
    let blogResponse;

    if (blogToUpdate) {
      blogResponse = (await updateBlog(blogPayload, stateToken)) || {
        data: {},
      };
    } else {
      blogResponse = (await createBlog(blogPayload, stateToken)) || {
        data: {},
      };
    }

    const {
      data: { errMsg },
    } = blogResponse;
    if (errMsg) {
      setResError(errMsg);
    } else {
      onClose();
      setReloadBlogs(true);
      toast.show({
        placement: 'top',
        render: () => (
          <ToastRender>
            {blogToUpdate ? 'Blog Updated !!!' : 'Blog Created !!!'}
          </ToastRender>
        ),
      });
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
      <FormControl.Label>{blogMapper.title}</FormControl.Label>
      <Input
        value={values.title}
        onChangeText={handleChange('title')}
        onBlur={handleBlur('title')}
      />
      <FormControl.ErrorMessage
        isInvalid
        leftIcon={<WarningOutlineIcon size="xs" />}
      >
        {touched.title && errors.title}
      </FormControl.ErrorMessage>
      <FormControl.Label isRequired={false}>
        {blogMapper.subTitle}
      </FormControl.Label>
      <Input
        value={values.subTitle}
        onChangeText={handleChange('subTitle')}
        onBlur={handleBlur('subTitle')}
      />
      <FormControl.Label>{blogMapper.body}</FormControl.Label>
      <TextArea
        borderColor="white"
        borderWidth="1"
        value={values.body}
        onChangeText={handleChange('body')}
        onBlur={handleBlur('body')}
      />
      <FormControl.ErrorMessage
        isInvalid
        leftIcon={<WarningOutlineIcon size="xs" />}
      >
        {touched.body && errors.body}
      </FormControl.ErrorMessage>
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
      <HStack justifyContent="center" mt="4">
        <Button onPress={handleSubmit} mr="3">
          {blogToUpdate ? 'Update' : 'Save'}
        </Button>
        <Button onPress={blogToUpdate ? onClose : resetForm}>
          {blogToUpdate ? 'Cancel' : 'Reset'}
        </Button>
      </HStack>
    </FormControl>
  );

  return (
    <Modal isOpen={showCreateBlogModal} onClose={onClose} size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          {blogToUpdate ? 'Edit Blog' : 'Create New Blog'}
        </Modal.Header>
        <Modal.Body>
          <ScreenContainer isScrollable p="3" pt="5" borderRadius="10">
            <FormBase
              initialValues={blogToUpdate || initialState}
              onSubmit={onSubmit}
              validate={validate}
              formFields={formFields}
            />
          </ScreenContainer>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default CreateBlog;
