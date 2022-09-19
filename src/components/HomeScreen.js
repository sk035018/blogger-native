import _ from "lodash";
import { Box, FlatList, HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { useHeaderContext } from "../contexts/headerContext";
import { deleteBlog, fetchBlogs } from "../services/blog";
import Button from "../shared_components/Button";
import ScreenContainer from "../shared_components/ScreenContainer";
import Text from "../shared_components/Text";
import ToastRender from "./ToastRender";

const limit = 20;
export default () => {
    const [skip, setSkip] = useState(0);
    const [blogsList, setBlogsList] = useState([]);

    const { stateToken, setTitle, reloadBlogs, setReloadBlogs } = useHeaderContext();
    const toast = useToast();

    const loadMore = async () => {
        try {
            const { data } = await fetchBlogs({ limit, skip}, stateToken);

            if (_.size(data)) {
                setBlogsList(prevList => _.concat(prevList, data));
                setSkip(prevValue => prevValue + limit);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onDelete = async id => {
        try {
            const { data: { errMsg }} = (await deleteBlog(id, stateToken)) || { data: {}};

            if (!errMsg) {
                setReloadBlogs(true);
            }

            toast.show({
                placement: 'top',
                render: () => (
                    <ToastRender isError={errMsg}>
                        {errMsg ? errMsg : 'Successfully Deleted !!!'}
                   </ToastRender>)
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (reloadBlogs) {
            setSkip(0);
            setBlogsList([]);
            if (!skip) {
                (async () => {
                    await loadMore();
                })();
                setReloadBlogs(false);
            }
        }
    }, [reloadBlogs, skip]);
    
    useEffect(() => {
        setTitle('Blogs');
        (async () => {
            await loadMore();
        })();
    }, []);

    const renderData = ({ item }) => (
        <Box borderWidth='2' mt='5' borderColor='white' borderRadius='xl' key={item._id}>
            <VStack p='2'>
                <Text textAlign='center' fontSize='24' w='100%' bold underline>{item.title}</Text>
                {item.subTitle && <Text textAlign='center' fontSize='16' w='100%' italic >{item.subTitle}</Text>}
                <Text mt='5' w='100%' textAlign='left'>{item.body}</Text>
                <Text italic w='100%' fontSize='14' >{`By : ${item.author.fullName}`}</Text>
                <HStack justifyContent='space-between' mt='5' mb='1'>
                    <Button px='2' py='1' size='sm'>Edit</Button>
                    <Button px='2' py='1' size='sm' onPress={() => onDelete(item._id)}>Delete</Button>
                </HStack>
            </VStack>
        </Box>
    );

    return (
        <ScreenContainer boxSize='100%' p='10'>
            <FlatList 
                data={blogsList}
                onEndReached={loadMore}
                onEndReachedThreshold={0.3}
                keyExtractor={blog => blog._id}
                renderItem={renderData}
            />
        </ScreenContainer>
    )
};