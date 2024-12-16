import { TextInput, View, Text } from 'react-native';
import { Image } from 'expo-image';
import Form from './Form';
import CustomButton from './CustomButton';
import CustomDialog from './CustomDialog';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../shared/Loader';
import List from '../shared/list';
import { useAddMutate } from '../hooks/useGenericMutateHook';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';
import DeparttmentItem from './listItems/departmentItem';

const renderItem = ({ item, index }) => {
    return (
        <>
            {item ?
                <DeparttmentItem key={index} item={item} />
                :
                <Text>Yükleniyor...</Text>
            }
        </>
    );
};

function DepartmentManagement() {
    const { token } = useSelector(state => state.token);
    const { mutate: createFaculty, isPending } = useAddMutate();
    const { data: departments, isLoading } = useGenericQueryHook("/api/Department", "departments");
    const { data: faculties, isLoading: isFacultiesLoading } = useGenericQueryHook("/api/Faculty", "faculties");
    const [modalVisible, setModalVisible] = useState(false);
    const [facultiesData, setFacultiesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    useEffect(() => {
        if (faculties) {
            const updatedFacultiesData = faculties.data.map(element => ({
                name: element.title,
                value: element.id
            }));
            setFacultiesData(updatedFacultiesData);
        }
    }, [faculties]);

    useEffect(() => {
        if (departments?.data?.data) {
            setFilteredDepartments(
                departments.data.data.filter(department =>
                    department.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, departments]);

    async function onSubmitForm(data, setIsLoading) {
        console.log(data);
        const postFaculty = {
            endpoint: "/api/Department",
            key: ["departments"],
            token: token ? token : "",
            data: {
                name: data.name,
                facultyId: data.facultyId
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
                name: "name",
                type: "text",
                rules: { required: "This field is required" },
                placeholder: "Department Name",
            },
            {
                name: "facultyId",
                type: "select",
                data: facultiesData,
                rules: { required: "This field is required" },
                placeholder: "Select Related Faculty",
            }
        ],
    };

    if (isLoading || isFacultiesLoading) {
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
            <CustomButton text={"Create New Department"} onClick={() => setModalVisible(true)} />
            <CustomDialog visible={modalVisible} isCloseButtonDisplayed={true} onClose={() => setModalVisible(false)}>
                <Form
                    formProps={formProps}
                    submit={onSubmitForm}
                    btnText={'Create Department'}
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
            <List data={filteredDepartments} renderItem={renderItem} />
        </View>
    );
}

export default DepartmentManagement;
