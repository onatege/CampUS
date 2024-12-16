import { TouchableOpacity, View, Dimensions } from 'react-native'
import SkeletonDiv from '../../components/SkeletonDiv'
import { Image } from 'expo-image';
import { TextBody, TextLabel } from '../../components/Texts';
import List from '../../shared/list';
import PostItem from '../../components/listItems/PostItem';
import { useRouter } from 'expo-router';
import { useGenericQueryHook } from '../../hooks/useGenericQueryHook';
import Loader from '../../shared/Loader';
import { useSelector } from 'react-redux';
import { clearTable } from '../../utils/localDbManager';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ClubItem from '../../components/listItems/ClubItem';
import { useState } from 'react';

const initialLayout = { width: Dimensions.get('window').width };


const renderPostItem = ({ item }) => {
  return (
    < >
      {item ?
        <PostItem item={item} />
        :
        <Text>Yükleniyor...</Text>
      }
    </>
  );
};

const renderClubItem = ({ item }) => {
  return (
    < >
      {item ?
        <ClubItem item={item} />
        :
        <Text>Yükleniyor...</Text>
      }
    </>
  );
};

function myProfile() {
  const { user } = useSelector(state => state.user)
  const { data: userData, isLoading } = useGenericQueryHook(`/api/User/GetUserWithFollowersAndPostsById?id=${user?.id}`, `${user?.id}User`)
  const router = useRouter()

  const handleLogOut = () => {
    clearTable().then(() => router.push("gettingStarted"))
  }

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posts', title: 'Posts' },
    { key: 'clubs', title: 'Clubs' },
  ]);

  const renderScene = SceneMap({
    posts: () => (
      <List data={userData?.data?.data?.posts} renderItem={renderPostItem} />
    ),
    clubs: () => (
      <List data={userData?.data?.data?.joinedClubs} renderItem={renderClubItem} />
    ),
  });

  if (isLoading) {
    return <Loader />
  }

  return (
    <SkeletonDiv>
      <View style={{ width: '100%', height: 'auto', paddingVertical: 8, flexDirection: 'column', gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 'auto', width: '100%' }}>
          <View style={{ width: 'auto', height: 'auto', borderRadius: 50, borderWidth: 0.4, borderColor: 'white' }}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${userData?.data?.data?.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <TouchableOpacity onPress={() => router.push("features/editProfile")}
              style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}>
              <Image
                style={{ width: 24, height: 24, borderRadius: 12 }}
                source={require('../../assets/icons/edit.svg')}
              />
              <TextLabel color={'white'}>Settings</TextLabel>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogOut()}
              style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}>
              <Image
                style={{ width: 24, height: 24, borderRadius: 12 }}
                source={require('../../assets/icons/logout.svg')}
              />
              <TextLabel color={'white'}>Log Out</TextLabel>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'column', gap: 4 }}>
          <TextBody>{userData?.data?.data?.displayName}</TextBody>
          <TextBody>{userData?.data?.data?.biography}</TextBody>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <TextBody color={'gray'}>
              Followers:
            </TextBody>
            <TextBody>
              {userData?.data?.data?.followerCount}
            </TextBody>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <TextBody color={'gray'}>
              Followings:
            </TextBody>
            <TextBody>
              {userData?.data?.data?.followingCount}
            </TextBody>
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
  )
}

export default myProfile