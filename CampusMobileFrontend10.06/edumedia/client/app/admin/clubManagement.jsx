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
import AdminClubItem from '../../components/listItems/adminClubItem';
import { useSelector } from 'react-redux';

const renderItem = ({ item, index }) => {
    return (
        <>
            {item ?
                <AdminClubItem key={index} item={item} />
                :
                <Text>Yükleniyor...</Text>
            }
        </>
    );
};

function clubManagement() {
    const { token } = useSelector(state => state.token);
    const [modalVisible, setModalVisible] = useState(false);
    const [profileImage, setProfileImages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredClubs, setFilteredClubs] = useState([]);
    const { data: allClubs, isLoading: isClubsLoading } = useGenericQueryHook("/api/Club/GetAllClubs", "clubs");
    const { mutate, isPending } = useAddMutate();

    useEffect(() => {
        if (allClubs?.data?.data) {
            setFilteredClubs(
                allClubs.data.data.filter(club => 
                    club.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, allClubs]);

    async function onSubmitForm(data, setIsLoading) {
        console.log(data);
        const postClub = {
            endpoint: "/api/Club",
            key: ["clubs"],
            token: token ? token : "",
            data: {
                name: data.name,
                description: data.description,
                profileImg: profileImage ? profileImage : ""
            }
        };
        mutate(postClub);

        if (!isPending) {
            setIsLoading(true);
        }
    }

    const defaultValues = {
        userNameorEmail: "",
        password: "",
    };

    const formProps = {
        formClassName: "grid grid-cols-1 gap-3",
        fields: [
            {
                name: "name",
                type: "text",
                rules: { required: "This field is required" },
                placeholder: "Club Name!",
            },
            {
                name: "description",
                type: "text",
                rules: { required: "This field is required" },
                placeholder: "Description!",
            }
        ],
    };

    const addImage = (filename) => {
        if (filename) {
            setProfileImages(filename);

            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    const removeImage = () => {
        setProfileImages(null);
    };

    if (isClubsLoading) {
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
                <CustomButton text={"Create New Club"} onClick={() => setModalVisible(true)} />
                <CustomDialog visible={modalVisible} isCloseButtonDisplayed={true} onClose={() => setModalVisible(false)}>
                    <View style={{ gap: 8, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {profileImage && (
                            <View style={{ flexDirection: 'row', gap: 8, padding: 8 }}>
                                <View style={{ position: 'relative', marginLeft: 8 }}>
                                    <Image
                                        source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${profileImage}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                                        style={{ width: 150, height: 150, borderRadius: 10 }}
                                    />
                                    <TouchableOpacity style={{ position: 'absolute', top: 5, left: 5 }} onPress={() => removeImage(profileImage)}>
                                        <Image
                                            style={{ width: 26, height: 26, backgroundColor: 'white', borderRadius: 10 }}
                                            source={require('../../assets/icons/trash.svg')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <ImagePickerService setIsLoading={setIsLoading} isLoading={isLoading} setImageName={(data) => addImage(data)} />
                            <TakePhotoService setIsLoading={setIsLoading} isLoading={isLoading} setImageName={(data) => addImage(data)} />
                        </View>
                        <Form
                            formProps={formProps}
                            submit={onSubmitForm}
                            defaultValues={defaultValues}
                            btnText={'Create Club'}
                            textColor={'black'}
                        />
                    </View>
                </CustomDialog>
            </View>
            <ScrollView contentContainerStyle={{ gap: 32, flexDirection: 'column' }}>
                <TextTitle color={'black'}>Find & Manage Existing Club</TextTitle>
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
                <List data={filteredClubs} renderItem={renderItem} />
            </ScrollView>
        </View>
    );
}

export default clubManagement;
