import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Dimensions, Alert } from 'react-native';
import SkeletonDiv from '../../components/SkeletonDiv';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { TextBody, TextLabel } from '../../components/Texts';
import List from '../../shared/list';
import Loader from '../../shared/Loader';
import { useGenericQueryHook } from '../../hooks/useGenericQueryHook';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProfileItem from '../../components/listItems/ProfileItem';
import { useSelector } from 'react-redux';
import ClubPostItem from '../../components/listItems/ClubPostItem';
import { firebase } from '../../utils/firebaseConfig';
import { useDeleteMutate } from '../../hooks/useGenericMutateHook';

const initialLayout = { width: Dimensions.get('window').width };

const renderPostItem = ({ item, index, isMember, clubId }) => {
    return (
        < >
            {item ?
                <ClubPostItem key={index} item={item} isMember={isMember} clubId={clubId} />
                :
                <Loader />
            }
        </>
    );
};

const renderMemberItem = ({ item, index, clubAdminId }) => {
    return (
        < >
            {item ?
                <ProfileItem key={index} item={item} clubAdminId={clubAdminId} />
                :
                <Loader />
            }
        </>
    );
};

function clubDetails() {
    const { user } = useSelector(state => state.user);
    const { clubId } = useLocalSearchParams();
    const router = useRouter();
    const { mutate: removeMember, isPending: isRemoveMemberPending } = useDeleteMutate();
    const { data: club, isLoading } = useGenericQueryHook(`/api/Club/GetClubProfileWithPosts?id=${clubId}`, `${clubId}Club`);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'posts', title: 'Posts' },
        { key: 'members', title: 'Members' },
    ]);

    const [isRequestPending, setIsRequestPending] = useState(false);

    const handleRemoveMember = () => {
        const removeData = {
            endpoint: `/api/Club/RemoveMember?clubId=${clubId}`,
            token: "",
            key: [`${clubId}Club`, "user", "clubPosts"],
            data: {
                username: user?.userName
            }
        }
        removeMember(removeData)
    }

    useEffect(() => {
        const checkPendingRequests = async () => {
            try {
                const requestsSnapshot = await firebase.firestore().collection('requests')
                    .where('relatedClub_id', '==', clubId)
                    .where('requestOwner_id', '==', user?.id)
                    .where('status', '==', 'pending')
                    .get();

                if (!requestsSnapshot.empty) {
                    setIsRequestPending(true);
                }
            } catch (error) {
                console.error('Error checking pending requests: ', error);
            }
        };

        checkPendingRequests();
    }, [clubId, user?.id]);

    const renderScene = SceneMap({
        posts: () => (
            <List data={club?.data?.data?.clubPosts} renderItem={({ item, index }) => renderPostItem({ item, index, isMember: club?.data?.data?.members.some(x => x.id === user?.id) ? "true" : "false", clubId: clubId })} />
        ),
        members: () => (
            <List data={club?.data?.data?.members} renderItem={({ item, index }) => renderMemberItem({ item, index, clubAdminId: club?.data?.data?.clubAdminId })} />
        ),
    });

    const onSendRequest = async () => {
        const newRequest = {
            relatedClub_id: clubId,
            clubName: club?.data?.data?.name,
            requestOwner_id: user?.id,
            requestOwnerName: user?.displayName,
            requestOwnerProfileImage: user?.profileImg || '', // Eğer kullanıcı profil resmi varsa ekle
            status: 'pending',
        };

        try {
            await firebase.firestore().collection('requests').add(newRequest);
            Alert.alert('Success', 'Request sent successfully!');
            setIsRequestPending(true); // İstek gönderildikten sonra durumu güncelle
        } catch (error) {
            console.error('Error sending request: ', error);
            Alert.alert('Error', 'Failed to send request.');
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <SkeletonDiv>
            <View style={{ width: '100%', height: 'auto', paddingVertical: 8, flexDirection: 'column', gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 'auto', width: '100%' }}>
                    <View style={{ width: 'auto', height: 'auto', borderRadius: 50 }}>
                        <Image
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${club?.data?.data.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', gap: 4 }}>

                        {club?.data?.data?.clubAdminId === user?.id ? (
                            <View style={{ flexDirection: 'column', gap: 4 }}>
                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname: 'features/editClub',
                                            params: {
                                                defaultName: club?.data?.data?.name,
                                                defaultDescription: club?.data?.data?.description,
                                                defaultProfileImg: club?.data?.data?.profileImg,
                                                clubAdminId: club?.data?.data?.clubAdminId,
                                                clubId: club?.data?.data?.id,
                                            },
                                        })
                                    }
                                    style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}>
                                    <Image
                                        style={{ width: 24, height: 24, borderRadius: 12 }}
                                        source={require('../../assets/icons/edit.svg')}
                                    />
                                    <TextLabel color={'white'}>Edit Club</TextLabel>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push({ pathname: "features/createClubPost", params: { clubId: clubId } })} style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}>
                                    <Image
                                        style={{ width: 24, height: 24, borderRadius: 12 }}
                                        source={require('../../assets/icons/addpost.svg')}
                                    />
                                    <TextLabel color={'white'}>Create Club Post</TextLabel>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push({ pathname: "features/manageMemberReq", params: {} })} style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}>
                                    <Image
                                        style={{ width: 24, height: 24, borderRadius: 12 }}
                                        source={require('../../assets/icons/addpost.svg')}
                                    />
                                    <TextLabel color={'white'}>Manage Member Request</TextLabel>
                                </TouchableOpacity>
                            </View>
                        ) : isRequestPending ? (

                            <TouchableOpacity style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }} disabled>
                                <Image
                                    style={{ width: 24, height: 24, borderRadius: 12 }}
                                    source={require('../../assets/icons/member.svg')}
                                />
                                <TextLabel color={'white'}>Response Waiting</TextLabel>
                            </TouchableOpacity>
                        ) : (
                            club?.data?.data?.members.some(x => x.id === user?.id) ?
                                <TouchableOpacity onPress={() => handleRemoveMember()} style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}>
                                    <Image
                                        style={{ width: 24, height: 24, borderRadius: 12 }}
                                        source={require('../../assets/icons/removeUser.svg')}
                                    />
                                    <TextLabel color={'white'}>Quit Club</TextLabel>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={onSendRequest} style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}>
                                    <Image
                                        style={{ width: 24, height: 24, borderRadius: 12 }}
                                        source={require('../../assets/icons/member.svg')}
                                    />
                                    <TextLabel color={'white'}>Send Member Request</TextLabel>
                                </TouchableOpacity>

                        )}
                    </View>
                </View>
                <View style={{ flexDirection: 'column', gap: 4, width: '50%' }}>
                    <TextBody>{club?.data?.data?.name}</TextBody>
                    <TextBody>{club?.data?.data?.description}</TextBody>
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

export default clubDetails;
