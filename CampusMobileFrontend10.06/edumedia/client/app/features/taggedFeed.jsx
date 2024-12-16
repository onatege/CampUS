import { View } from "react-native";
import SkeletonDiv from "../../components/SkeletonDiv"
import { useLocalSearchParams } from 'expo-router';
import List from "../../shared/list";
import PostItem from "../../components/listItems/PostItem";
import { LinearGradient } from 'expo-linear-gradient';
import { useGenericQueryHook } from "../../hooks/useGenericQueryHook";
import Loader from "../../shared/Loader";
import { TextTitle } from "../../components/Texts";

const renderItem = ({ item, index, tag }) => {
    return (
        < >
            {item ?
                <PostItem key={index} item={item} tag={tag} />
                :
                <Text>Yükleniyor...</Text>
            }
        </>
    );
};

function taggedFeed() {
    const { tag, tagName } = useLocalSearchParams();
    const {data:tagPosts, isLoading} = useGenericQueryHook(`/api/Tag/GetTagById?id=${tag}`, `${tag}Posts`)

    if (isLoading) {
        return <Loader />
    }

    return (
        <SkeletonDiv>
            <View style={{ width: '100%', height: 'auto', paddingVertical: 8, flexDirection: 'column', gap: 8 }}>
                <TextTitle>
                    #{tagName}
                </TextTitle>
            </View>
            <List data={tagPosts?.data?.data?.posts} renderItem={({item , index}) => renderItem({item , index , tag})} />
            <LinearGradient
                colors={['transparent', '#141218']}
                style={{
                    height: '10%',
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 10
                }}
            />
        </SkeletonDiv>
    )
}

export default taggedFeed