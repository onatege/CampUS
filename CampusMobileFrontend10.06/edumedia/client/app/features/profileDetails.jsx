import React, { useState } from 'react';
import { TouchableOpacity, View, Dimensions, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { TextBody, TextLabel } from '../../components/Texts';
import List from '../../shared/list';
import PostItem from '../../components/listItems/PostItem';
import Loader from '../../shared/Loader';
import { useGenericQueryHook } from '../../hooks/useGenericQueryHook';
import { useAddMutate } from '../../hooks/useGenericMutateHook';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import ClubItem from '../../components/listItems/ClubItem';
import SkeletonDiv from '../../components/SkeletonDiv';

const initialLayout = { width: Dimensions.get('window').width };

const renderPostItem = ({ item }) => (
    item ? <PostItem item={item} /> : <Text>Yükleniyor...</Text>
);

const renderClubItem = ({ item }) => (
    item ? <ClubItem item={item} /> : <Text>Yükleniyor...</Text>
);

function ProfileDetails() {
    const { user } = useSelector(state => state.user);
    const router = useRouter();
    const { userId } = useLocalSearchParams();
    const { data, isLoading } = useGenericQueryHook(`/api/User/GetUserWithFollowersAndPostsById?id=${userId}`, `${userId}UserDetail`);
    const { mutate, isPending } = useAddMutate();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'posts', title: 'Posts' },
        { key: 'clubs', title: 'Clubs' },
    ]);

    if (isLoading) {
        return <Loader />;
    }

    const handleFollow = () => {
        const postData = {
            endpoint: `/api/User/FollowUser?userId=${user?.id}&targetUserId=${userId}`,
            key: [`${userId}UserDetail`, `user`],
            token: "",
            data: {
                userId: user?.id,
                targetUserId: userId
            }
        };
        mutate(postData);
    };

    const handleUnFollow = () => {
        const postData = {
            endpoint: `/api/User/UnfollowUser?userId=${user?.id}&targetUserId=${userId}`,
            key: [`${userId}UserDetail`, `user`],
            token: "",
            data: {
                userId: user?.id,
                targetUserId: userId
            }
        };
        mutate(postData);
    };

    const renderScene = SceneMap({
        posts: () => {
            if (data?.data?.data?.posts.length > 0) {
                return <List data={data?.data?.data?.posts} renderItem={renderPostItem} />;
            } else {
                return <TextBody>There is nothing to show</TextBody>;
            }
        },
        clubs: () => {
            if (data?.data?.data?.joinedClubs.length > 0) {
                return <List data={data?.data?.data?.joinedClubs} renderItem={renderClubItem} />;
            } else {
                return <TextBody>There is nothing to show</TextBody>;
            }
        },
    });

    return (
        <SkeletonDiv>
            <View style={{ width: '100%', height: 'auto', paddingVertical: 8, flexDirection: 'column', gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 'auto', width: '100%' }}>
                    <View style={{ width: 'auto', height: 'auto', borderRadius: 50, borderWidth: 0.4, borderColor: 'white' }}>
                        <Image
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${data?.data?.data?.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <TouchableOpacity onPress={() => router.push({ pathname: 'features/messageScreen', params: { receiverId: userId, negotiaterId: user?.id, userId: user?.id } })}>
                            <Image
                                style={{ width: 24, height: 24 }}
                                tintColor={'#ffffff'}
                                source={require('../../assets/icons/createMessage.svg')}
                            />
                        </TouchableOpacity>
                        {
                            data?.data?.data?.followers.some(x => x.id === user?.id) ?
                                <TouchableOpacity onPress={handleUnFollow} style={{ width: 64, height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 4 }}>
                                    <TextLabel color={'white'}>Unfollow</TextLabel>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={handleFollow} style={{ width: 64, height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 4 }}>
                                    <TextLabel color={'white'}>Follow</TextLabel>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={{ flexDirection: 'column', gap: 4 }}>
                    <TextBody>{data?.data?.data?.displayName}</TextBody>
                    <TextBody>{data?.data?.data?.biography}</TextBody>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            <TextBody color={'gray'}>
                                Followers:
                            </TextBody>
                            <TextBody>
                                {data?.data?.data?.followerCount}
                            </TextBody>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            <TextBody color={'gray'}>
                                Followings:
                            </TextBody>
                            <TextBody>
                                {data?.data?.data?.followingCount}
                            </TextBody>
                        </View>
                    </View>

                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: '#141218' }}
                    />
                )}
            />
        </SkeletonDiv>
    );
}

export default ProfileDetails;
