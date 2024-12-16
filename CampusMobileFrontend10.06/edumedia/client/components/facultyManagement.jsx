import { TextInput, View, Text } from 'react-native';
import { Image } from 'expo-image';
import Form from './Form';
import CustomButton from './CustomButton';
import CustomDialog from './CustomDialog';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../shared/Loader';
import FacultyItem from './listItems/facultyItem';
import List from '../shared/list';
import { useAddMutate } from '../hooks/useGenericMutateHook';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';

const renderItem = ({ item, index }) => {
    return (
        <>
            {item ?
                <FacultyItem key={index} item={item} />
                :
                <Text>Yükleniyor...</Text>
            }
        </>
    );
};

function FacultyManagement() {
    const { token } = useSelector(state => state.token);
    const { mutate: createFaculty, isPending } = useAddMutate();
    const { data: faculties, isLoading } = useGenericQueryHook("/api/Faculty", "faculties");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFaculties, setFilteredFaculties] = useState([]);

    useEffect(() => {
        if (faculties?.data) {
            setFilteredFaculties(
                faculties.data.filter(faculty =>
                    faculty.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, faculties]);

    async function onSubmitForm(data, setIsLoading) {
        console.log(data);
        const postFaculty = {
            endpoint: "/api/Faculty",
            key: ["faculties"],
            token: token ? token : "",
            data: {
                title: data.title,
            }
        };
        createFaculty(postFaculty);

        if (!isPending) {
            setIsLoading(true);
        }
    }

    const formProps = {
        formClassName: "grid grid-cols-1 gap-3",
        fields: [
            {
                name: "title",
                type: "text",
                rules: { required: "This field is required" },
                placeholder: "Faculty Name",
            }
        ],
    };

    if (isLoading) {
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
            <CustomButton text={"Create New Faculty"} onClick={() => setModalVisible(true)} />
            <CustomDialog visible={modalVisible} isCloseButtonDisplayed={true} onClose={() => setModalVisible(false)}>
                <Form
                    formProps={formProps}
                    submit={onSubmitForm}
                    btnText={'Create Faculty'}
                    textColor={'black'}
                />
            </CustomDialog>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 50, borderRadius: 10, borderWidth: 0.4, borderColor: 'gray', padding: 4 }}>
                <Image
                    style={{ width: 26, height: 26 }}
                    tintColor={'gray'}
                    source={require('../assets/icons/search.svg')}
                />
                <TextInput
                    placeholderTextColor={'gray'}
                    placeholder='Search'
                    style={{ width: '100%', height: '100%', color: 'black' }}
                    onChangeText={(text) => setSearchTerm(text)}
                />
            </View>
            <List data={filteredFaculties} renderItem={renderItem} />
        </View>
    );
}

export default FacultyManagement;
