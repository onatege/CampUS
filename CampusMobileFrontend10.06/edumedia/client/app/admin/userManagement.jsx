import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { TextHeadline, TextLabel, TextTitle } from '../../components/Texts';
import List from '../../shared/list';
import { Image } from 'expo-image';
import Form from '../../components/Form';
import { useAddMutate } from '../../hooks/useGenericMutateHook';
import ImagePickerService from '../../shared/ImagePicker';
import TakePhotoService from '../../shared/TakePhoto';
import { useState, useEffect } from 'react';
import CustomDialog from '../../components/CustomDialog';
import CustomButton from '../../components/CustomButton';
import { useGenericQueryHook } from '../../hooks/useGenericQueryHook';
import Loader from '../../shared/Loader';
import { useSelector } from 'react-redux';
import AdminUserItem from '../../components/listItems/adminUserItem';

const renderItem = ({ item, index }) => {
    return (
        <>
            {item ?
                <AdminUserItem key={index} item={item} />
                :
                <Text>Yükleniyor...</Text>
            }
        </>
    );
};

function UserManagement() {
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { data: allUsers, isLoading: isUsersLoading } = useGenericQueryHook("/api/User/GetAllUsers", "allUsers");

    useEffect(() => {
        if (allUsers?.data?.data) {
            setFilteredUsers(
                allUsers.data.data.filter(user => 
                    user?.displayName.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, allUsers]);


    if (isUsersLoading) {
        return <Loader backgrounColor={'gray'} />;
    }

    return (
        <View
            style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                display: 'flex',
                gap: 32
            }}
        >
            <View style={{ flexDirection: 'column', gap: 8 }}>
            
            </View>
            <ScrollView contentContainerStyle={{ gap: 32, flexDirection: 'column' }}>
                <TextTitle color={'black'}>Find & Manage Existing Users</TextTitle>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 50, borderRadius: 10, borderWidth: 0.4, borderColor: 'gray', padding: 4 }}>
                    <Image
                        style={{ width: 26, height: 26 }}
                        tintColor={'gray'}
                        source={require('../../assets/icons/search.svg')}
                    />
                    <TextInput
                        placeholderTextColor={'gray'}
                        placeholder='Search'
                        style={{ width: '100%', height: '100%', color: 'black' }}
                        onChangeText={(text) => setSearchTerm(text)}
                    />
                </View>
                <List data={filteredUsers} renderItem={renderItem} />
            </ScrollView>
        </View>
    );
}

export default UserManagement;
