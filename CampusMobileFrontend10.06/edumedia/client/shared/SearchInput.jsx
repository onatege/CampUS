import React, { useState } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';
import Loader from './Loader';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import List from './list';
import SearchItem from '../components/listItems/SearchItem';
import ClubItem from '../components/listItems/ClubItem';
import ProfileItem from '../components/listItems/ProfileItem';

const initialLayout = { width: Dimensions.get('window').width };

const renderUserItem = ({ item, index }) => <ProfileItem key={index} item={item} />;
const renderTagItem = ({ item, index }) => <SearchItem key={index} item={item} />;
const renderClubItem = ({ item, index }) => <ClubItem key={index} item={item} />;

function SearchInput({ text, renderItem, type }) {
    const { data: users, isLoading: isUsersLoading } = useGenericQueryHook(`/api/User/FindUser?Keyword=${text}`, `${text}UsersSearch`);
    const { data: tags, isLoading: isTagsLoading } = useGenericQueryHook(`/api/Tag/FindTag?Keyword=${text}`, `${text}TagsSearch`);
    const { data: clubs, isLoading: isClubsLoading } = useGenericQueryHook(`/api/Club/FindClub?Keyword=${text}`, `${text}ClubsSearch`);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'users', title: 'Users' },
        { key: 'tags', title: 'Tags' },
        { key: 'clubs', title: 'Clubs' },
    ]);

    if (isClubsLoading || isTagsLoading || isUsersLoading) {
        return <Loader />;
    }

    const renderScene = SceneMap({
        users: () => (
            <ScrollView contentContainerStyle={{ width: '100%', height: '100%' }}>
                <List data={users?.data?.data} renderItem={renderUserItem} />
            </ScrollView>
        ),
        tags: () => (
            <ScrollView contentContainerStyle={{ width: '100%', height: '100%' }}>
                <List data={tags?.data?.data} renderItem={renderTagItem} />
            </ScrollView>
        ),
        clubs: () => (
            <ScrollView contentContainerStyle={{ width: '100%', height: '100%' }}>
                <List data={clubs?.data?.data} renderItem={renderClubItem} />
            </ScrollView>
        ),
    });

    if (type === 'User' || type === 'Tag' || type === 'Club') {
        return (
            <ScrollView contentContainerStyle={{ width: '100%', height: '100%' }}>
                {type === 'User' && (
                    <>
                        <List data={users?.data?.data} renderItem={renderItem} />
                    </>
                )}
                {type === 'Tag' && (
                    <>
                        <List data={tags?.data?.data} renderItem={renderItem} />
                    </>
                )}
                {type === 'Club' && (
                    <>
                        <List data={clubs?.data?.data} renderItem={renderItem} />
                    </>
                )}
            </ScrollView>
        );
    }

    return (
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
    );
}

export default SearchInput;
