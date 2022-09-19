import { FormControl, HStack, Modal, TextArea, useToast, WarningOutlineIcon } from "native-base";
import { useHeaderContext } from "../../contexts/headerContext";
import ScreenContainer from "../../shared_components/ScreenContainer";
import Input from "../../shared_components/Input";
import { useReducer } from "react";
import Button from "../../shared_components/Button";
import { requiredFields } from "../../utils/validations";
import { blogMapper } from "../../constants/labelFieldMapper";
import { createBlog } from "../../services/blog";
import ToastRender from "../ToastRender";

const initialState = {
    title: null,
    subTitle: null,
    body: null,
};

const initialErrorState = {
    title: null,
    body: null,
    resError: null,
};

export default () => {
    const { showCreateBlogModal, setCreateBlogModal, stateToken } = useHeaderContext();
    const [blogData, setBlogData] = useReducer((prevState, updatedState) => ({ ...prevState, ...updatedState }), initialState);
    const [errorState, setErrorState] = useReducer((prevState, updatedState) => ({ ...prevState, ...updatedState }), initialErrorState);
    const toast = useToast();

    const onClose = () => {
        setBlogData(initialState);
        setErrorState(initialErrorState);
        setCreateBlogModal(false);
    };

    const onSave = async () => {
        setErrorState(initialErrorState);
        const { errObj, _isError } = requiredFields(['title', 'body'], blogData, blogMapper);
        if (_isError) {
            setErrorState(errObj);
        } else {
            const blogPayload = { ...blogData };
            const { data: { errMsg } } = (await createBlog(blogPayload, stateToken)) || {};
            if (errMsg) {
                setErrorState({ resError: errMsg });
            } else {
                onClose();
                toast.show({
                    placement: 'top',
                    render: () => (<ToastRender>Blog Created !!!</ToastRender>)
                });
            }
        }
    };

    const onReset = () => {
        setBlogData(initialState);
        setErrorState(initialErrorState);
    };

    return (
        <Modal isOpen={showCreateBlogModal} onClose={onClose} size='lg'>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Create New Blog</Modal.Header>
                <Modal.Body>
                    <ScreenContainer isScrollable p='3' pt='5' borderRadius='10'>
                        <FormControl isRequired>
                            <FormControl.Label>{blogMapper.title}</FormControl.Label>
                            <Input
                                value={blogData.title}
                                onChangeText={text => setBlogData({ title: text })}
                            />
                            <FormControl.ErrorMessage isInvalid leftIcon={<WarningOutlineIcon size='xs'/>}>
                                    {errorState.title}
                            </FormControl.ErrorMessage>
                            <FormControl.Label isRequired={false}>{blogMapper.subTitle}</FormControl.Label>
                            <Input
                                value={blogData.subTitle}
                                onChangeText={text => setBlogData({ subTitle: text })}
                            />
                            <FormControl.Label>{blogMapper.body}</FormControl.Label>
                            <TextArea
                                borderColor='white'
                                borderWidth='1'
                                value={blogData.body}
                                onChangeText={text => setBlogData({ body: text })}
                            />
                            <FormControl.ErrorMessage isInvalid leftIcon={<WarningOutlineIcon size='xs'/>}>
                                    {errorState.body}
                            </FormControl.ErrorMessage>
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
                        </FormControl>
                        <HStack justifyContent='center' mt='4' >
                            <Button onPress={onSave} mr='3' >Save</Button>
                            <Button onPress={onReset} >Reset</Button>
                        </HStack>
                    </ScreenContainer>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
};