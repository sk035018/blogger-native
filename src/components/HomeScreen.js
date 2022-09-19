import _ from "lodash";
import { Box, FlatList, VStack } from "native-base";
import { useEffect, useState } from "react";
import { useHeaderContext } from "../contexts/headerContext";
import { fetchBlogs } from "../services/blog";
import ScreenContainer from "../shared_components/ScreenContainer";
import Text from "../shared_components/Text";

const limit = 20;
export default () => {
    const [skip, setSkip] = useState(0);
    const [blogsList, setBlogsList] = useState([]);
    const { stateToken, setTitle } = useHeaderContext();

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