import React, { useEffect } from 'react';
import { TextBody, TextHeadline, TextLabel } from '../../components/Texts';
import { useRouter } from 'expo-router';
import SkeletonDiv from '../../components/SkeletonDiv';
import { TouchableOpacity, View, BackHandler, Alert } from 'react-native';
import List from '../../shared/list';
import { useState } from 'react';
import PostItem from '../../components/listItems/PostItem';
import { Image } from 'expo-image';
import Loader from '../../shared/Loader';
import { useGenericQueryHook } from '../../hooks/useGenericQueryHook';
import { useLocalSearchParams } from 'expo-router';
import { useGetUserInfosAndSendRedux } from '../../hooks/useGetUserInfosAndSendRedux';
import { useDispatch } from 'react-redux';
import { userActions } from '../../utils/slices/user-slice';
import SimpleClubPostItem from '../../components/listItems/simpleClubPostItem';
import DepartmentListItem from '../../components/listItems/departmentListItem';

const renderCampusItem = ({ item }) => {
    return (
        <React.Fragment >
            {item ? <PostItem item={item} /> : <Loader />}
        </React.Fragment>
    );
};

const renderDepartmentItem = ({ item }) => {
    return (
        <React.Fragment >
            {item ? <DepartmentListItem item={item} /> : <Loader />}
        </React.Fragment>
    );
};

const renderClubItem = ({ item }) => {
    return (
        <React.Fragment >
            {item ? <SimpleClubPostItem item={item} /> : <Loader />}
        </React.Fragment>
    );
};

function Home() {
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = useState(0);
    const router = useRouter();
    const { userId } = useLocalSearchParams();

    const { data: user, isLoading: isUserLoading } = useGetUserInfosAndSendRedux(userId);
    const { data: posts, isLoading } = useGenericQueryHook("/api/post", "posts");
    const { data: clubPosts, isLoading:isClubPostsLoading } = useGenericQueryHook("/api/ClubPost/GetClubPosts", "clubPosts");

   

    useEffect(() => {
        if (!isUserLoading && user) {
            dispatch(userActions.replaceUser(user?.data?.data));
        }

        const onBackPress = () => {
            Alert.alert(
              'Exiting From Campus',
              'Are you sure?',
              [
                {
                  text: 'No',
                  onPress: () => null,
                  style: 'cancel',
                },
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
              ],
              { cancelable: false }
            );
            return true;
          };
      
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          
          return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isUserLoading, user, dispatch]);

    if (isLoading || isUserLoading || isClubPostsLoading) {
        return <Loader />;
    }

    return (
        <>
            {userId ? (
                <SkeletonDiv>
                    <View />
                    <TouchableOpacity
                        onPress={() => router.push("features/createPost")}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10,
                            backgroundColor: '#2B2930',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 88,
                            right: 16,
                            zIndex: 50,
                        }}
                    >
                        <Image
                            style={{ width: 26, height: 26 }}
                            tintColor={'#ffffff'}
                            source={require('../../assets/icons/createPost.svg')}
                        />
                    </TouchableOpacity>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                        <TouchableOpacity
                            onPress={() => setSelectedTab(0)}
                            style={
                                selectedTab === 0
                                    ? { backgroundColor: '#1D1B20', padding: 8, borderRadius: 10 }
                                    : { padding: 8, borderRadius: 10 }
                            }
                        >
                            <TextLabel color={selectedTab === 0 ? 'white' : 'gray'}>Campus</TextLabel>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSelectedTab(1)}
                            style={
                                selectedTab === 1
                                    ? { backgroundColor: '#1D1B20', padding: 8, borderRadius: 10 }
                                    : { padding: 8, borderRadius: 10 }
                            }
                        >
                            <TextLabel color={selectedTab === 1 ? 'white' : 'gray'}>Your Department</TextLabel>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSelectedTab(2)}
                            style={
                                selectedTab === 2
                                    ? { backgroundColor: '#1D1B20', padding: 8, borderRadius: 10 }
                                    : { padding: 8, borderRadius: 10 }
                            }
                        >
                            <TextLabel color={selectedTab === 2 ? 'white' : 'gray'}>Clubs</TextLabel>
                        </TouchableOpacity>
                    </View>
                    {selectedTab === 0 ? (
                        <List data={posts?.data?.data} key={selectedTab} renderItem={renderCampusItem} />
                    ) : selectedTab === 1 ? (
                        <List data={posts?.data?.data} key={selectedTab} renderItem={renderDepartmentItem} />
                    ) : (
                        user?.data?.data?.joinedClubs.length > 0 ?
                        <List data={clubPosts?.data?.data} key={selectedTab} renderItem={renderClubItem} />
                        :
                        <TextBody color={'gray'}>You are not a member of any clubs, navigate explore and search clubs</TextBody>
                    )}
                </SkeletonDiv>
            ) : (
                <SkeletonDiv>
                    <View style={{height:'100%', justifyContent: 'center', alignItems: 'center' }}>
                        <TextHeadline>There has been a problem while getting user, please try again.</TextHeadline>
                    </View>
                </SkeletonDiv>
            )}
        </>
    );
}

export default Home;
