import React, { useEffect, useState } from 'react'
import SkeletonDiv from '../components/SkeletonDiv'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import MainDiv from '../components/MainDiv'
import { TextDisplay, TextBody, TextLabel } from '../components/Texts'
import CustomDialog from '../components/CustomDialog'
import Form from '../components/Form'
import { useRouter } from 'expo-router'
import { useAddMutate } from '../hooks/useGenericMutateHook'
import { useGenericQueryHook } from '../hooks/useGenericQueryHook'
import Loader from '../shared/Loader'
import ImagePickerService from '../shared/ImagePicker'
import TakePhotoService from '../shared/TakePhoto'
import { Image } from 'expo-image'

function Register() {
    const [profileImage, setProfileImages] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [departmentsData, setDepartmentsData] = useState([])

    const { mutate: createUser, isPending, isSuccess, isError } = useAddMutate()
    const { data: departments, isLoading: isDepartmentLoading } = useGenericQueryHook("/api/Department", "departments")

    useEffect(() => {
        if (departments) {
            const updatedDepartmentsData = departments?.data?.data?.map(element => ({
                name: element.name,
                value: element.id
            }));
            setDepartmentsData(updatedDepartmentsData);
        }
    }, [departments]);

    const router = useRouter();
    async function onSubmitForm(data, setIsLoading) {

        const postData = {
            endpoint: "/api/User",
            key: ["user"],
            data: {
                userName: data.userName,
                displayName: data.displayName,
                email: data.email,
                password: data.password,
                biography: data.biography,
                profileImg: profileImage ? profileImage : "",
                departmentId: data.departmentId ? data?.departmentId : 1
            }

        }
        createUser(postData)

    }

    const formProps = {
        formClassName: "grid grid-cols-1 gap-3",
        fields: [
            {
                name: "userName",
                type: "text",
                rules: { required: "This field is required" },
                placeholder: "Username",
            },
            {
                name: "displayName",
                type: "text",
                rules: { required: "This field is required" },
                placeholder: "Displayname",
            },
            {
                name: "email",
                type: "email",
                rules: {
                    required: "This field is required", validate: (value) => {
                        console.log(value, "VALUE")
                        if (!value.endsWith('@gmail.com')) {
                            return 'This email address is not appropriate. It must contain @gmail.com';
                        }
                    }
                },
                placeholder: "Email!",
            },
            {
                name: "password",
                type: "password",
                rules: {
                    required: "This field is required" , validate: (value) => {
                            if (value.length < 8) {
                                return 'Password must be at least 8 characters long.';
                            }
                        }
                },
                placeholder: "Password",

            },
            {
                name: "biography",
                type: "text",
                rules: { required: "This field is required" },
                placeholder: "Biography",
            },
            {
                name: "departmentId",
                type: "select",
                data: departmentsData,
                rules: { required: "This field is required" },
                placeholder: "Select Related Department",
            }
        ],
    };

    const addImage = (filename) => {
        if (filename) {
            setProfileImages(filename);

            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        }
    };

    const removeImage = () => {
        setProfileImages(null);
    };

    useEffect(() => {
        if (isSuccess || isError) {
            router.push("login")
        }
    }, [isSuccess, isError]);
    

    if (isPending) {
        return <Loader />
    }

    return (
        <MainDiv>
            <SkeletonDiv>
                <TextDisplay>Campus</TextDisplay>
                <ScrollView contentContainerStyle={{ height: 'auto', width: '100%', flexDirection: 'column', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                    {profileImage ?
                        <View style={{ flexDirection: 'row', gap: 8, padding: 8 }}>
                            <View style={{ position: 'relative', marginLeft: 8 }}>
                                <Image
                                    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${profileImage}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                                    style={{ width: 150, height: 150, borderRadius: 10 }}
                                />
                                <TouchableOpacity style={{ position: 'absolute', top: 5, left: 5 }} onPress={() => removeImage(profileImage)}>
                                    <Image
                                        style={{ width: 26, height: 26, backgroundColor: 'white', borderRadius: 10 }}
                                        source={require('../assets/icons/trash.svg')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View style={{ position: 'relative', marginLeft: 8 }}>
                            <Image
                                source={require("../assets/icons/emptyPP.svg")}
                                style={{ width: 150, height: 150, borderRadius: 10 }}
                            />
                        </View>
                    }
                    <TouchableOpacity style={{ borderWidth: 0.4, borderColor: 'white', borderRadius: 10, padding: 8 }} onPress={() => setModalVisible(true)}>
                        <TextLabel color={'gray'}>Add Profile Picture</TextLabel>
                    </TouchableOpacity>
                    <Form
                        formProps={formProps}
                        submit={onSubmitForm}
                        btnText={'Sign Up'}
                    />
                    <TouchableOpacity onPress={() => router.push('login')} style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', gap: 8 }}>
                        <TextBody>
                            Already have an account ?
                        </TextBody>
                        <Text style={{ textDecorationLine: 'underline', fontFamily: 'RobotoR', color: 'white' }}>Sign in here</Text>
                    </TouchableOpacity>
                </ScrollView>
                <CustomDialog backgroundColor={"#141218"} visible={modalVisible} isCloseButtonDisplayed={true} onClose={() => setModalVisible(false)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <ImagePickerService setIsLoading={setIsLoading} isLoading={isLoading} setImageName={(data) => addImage(data)} />
                        <TakePhotoService setIsLoading={setIsLoading} isLoading={isLoading} setImageName={(data) => addImage(data)} />
                    </View>
                </CustomDialog>
            </SkeletonDiv>
        </MainDiv >

    )
}

export default Register