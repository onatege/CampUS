import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { TextBody, TextLabel, TextTitle } from '../../components/Texts';
import List from '../../shared/list';
import Loader from '../../shared/Loader';
import { useGenericQueryHook } from '../../hooks/useGenericQueryHook';
import ClubMemberItem from '../../components/listItems/ClubMemberItem';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AdminClubPostItem from '../../components/listItems/adminClubPostItem';

const initialLayout = { width: Dimensions.get('window').width };

const renderPostItem = ({ item, index }) => {
    return item ? (
        <AdminClubPostItem key={index} item={item} />
    ) : (
        <Loader backgroundColor={'gray'} />
    );
};

const renderMemberItem = ({ item, index, clubId, clubAdminId }) => {
    return item ? (
        <ClubMemberItem key={index} item={item} clubId={clubId} clubadminId={clubAdminId} />
    ) : (
        <Loader backgroundColor={'gray'} />
    );
};

function AdminClubDetails() {
    const router = useRouter();
    const { clubId } = useLocalSearchParams();
    const { data: club, isLoading } = useGenericQueryHook(`/api/Club/GetClubProfileWithPosts?id=${clubId}`, `${clubId}Club`);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'posts', title: 'Posts' },
        { key: 'members', title: 'Members' },
    ]);

    if (isLoading) {
        return <Loader backgroundColor={'gray'} />;
    }

    const renderScene = SceneMap({
        posts: () => (
            <List data={club?.data?.data?.clubPosts} renderItem={renderPostItem} />
        ),
        members: () => (
            <View style={{ marginVertical: 16, width: '100%', height: "100%", flexDirection:'column', gap:8 }}>
                <TouchableOpacity
                    onPress={() => { router.push({ pathname: "adminFeatures/adminAddClubAdmin", params: { clubId: clubId } }) }}
                    style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}
                >
                    <TextLabel color={'white'}>
                        Add Admin
                    </TextLabel>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { router.push({ pathname: "adminFeatures/adminAddClubMember", params: { clubId: clubId } }) }}
                    style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}
                >
                    <TextLabel color={'white'}>
                        Add Member
                    </TextLabel>
                </TouchableOpacity>
                
                <List data={club?.data?.data?.members} renderItem={({ item, index }) => renderMemberItem({ item, index, clubId: club?.data?.data?.id , clubAdminId:club?.data?.data?.clubAdminId })} />
            </View>
        )
    });

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ width: '100%', height: 'auto', paddingVertical: 8, flexDirection: 'column', gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 'auto', width: '100%' }}>
                    <View style={{ width: 'auto', height: 'auto', borderRadius: 50 }}>
                        <Image
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${club?.data?.data.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: 'adminFeatures/adminEditClub',
                                    params: {
                                        defaultName: club?.data?.data?.name,
                                        defaultDescription: club?.data?.data?.description,
                                        defaultProfileImg: club?.data?.data?.profileImg,
                                        clubAdminId: club?.data?.data?.clubAdminId,
                                        clubId: club?.data?.data?.id,
                                    },
                                })
                            }
                            style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', padding: 8 }}
                        >
                            <Image
                                style={{ width: 24, height: 24, borderRadius: 12 }}
                                source={require('../../assets/icons/edit.svg')}
                            />
                            <TextLabel color={'white'}>Settings</TextLabel>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', gap: 4 }}>
                    <TextBody color={'gray'}>{clubId}</TextBody>
                    <TextBody color={'gray'}>Club Bio</TextBody>
                    <TextBody color={'gray'}>{club?.data?.data?.memberCount} Members</TextBody>
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
        </View>
    );
}

export default AdminClubDetails;
