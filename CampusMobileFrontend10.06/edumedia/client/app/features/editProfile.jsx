import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native'
import Form from '../../components/Form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SkeletonDiv from '../../components/SkeletonDiv';
import ImagePickerService from '../../shared/ImagePicker';
import TakePhotoService from '../../shared/TakePhoto';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { useUpdateMutate } from '../../hooks/useGenericMutateHook';
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { clearTable } from '../../utils/localDbManager';
import CustomDialog from '../../components/CustomDialog';
import { TextBody, TextLabel } from '../../components/Texts';


function editProfile() {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalDeactivateVisible, setModalDeactivateVisible] = useState(false)

    const { user } = useSelector(state => state.user)
    const { mutate, isPending, isSuccess } = useUpdateMutate();
    const { mutate: removeAccount, isPending: isRemovingPending, isSuccess: isRemovingSuccess } = useUpdateMutate()

    const [profileImage, setProfileImages] = useState(user?.profileImg);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleRemoveAccount = () => {
        const delData = {
            endpoint: `/api/User/RemoveUser?id=${user?.id}`,
            token: "",
            key: ["user"],
            data: {}
        }
        removeAccount(delData)
    }

    const handleDeactivateAccount = () => {
        const delData = {
            endpoint: `/api/User/DeactivateUser?id=${user?.id}`,
            token: "",
            key: ["user"],
            data: {}
        }
        removeAccount(delData)
    }

    useEffect(() => {
        if (isRemovingSuccess) {
            clearTable().then(() => router.push("gettingStarted"))
        }
    }, [isRemovingSuccess]);

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

    async function onSubmitForm(data, setIsLoading) {
        const putData = {
            endpoint: `/api/User/UpdateUser?id=${user?.id}`,
            key: [`user`, `${user?.id}User`],
            data: {
                userName: data?.userName ? data?.userName : user?.userName,
                displayName: data?.displayName ? data?.displayName : user?.displayName,
                email: data?.email ? data?.email : user?.email,
                biography: data?.biography ? data?.biography : user?.biography,
                profileImg: profileImage ? profileImage : user?.profileImg
            }
        }

        mutate(putData)
        setIsLoading(false)
    }



    const formProps = {
        formClassName: "",
        fields: [
            {
                name: "userName",
                type: "text",
                rules: {  },
                placeholder: `${user?.userName}`,
            },
            {
                name: "displayName",
                type: "text",
                rules: {  },
                placeholder: `${user?.displayName}`,
            },
            {
                name: "email",
                type: "email",
                rules: {  },
                placeholder: `${user?.email}`,
            },
            {
                name: "biography",
                type: "text",
                rules: {  },
                placeholder: `${user?.biography}`,
            }
        ],
    };
    return (
        <SkeletonDiv>
            <View style={{ height: '90%', width: '100%', flexDirection: 'column', gap: 8 }}>
                <ScrollView contentContainerStyle={{ width: '100%', height: 'auto', flexDirection: 'column', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
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
                        btnText={'Update'}
                    />
                    {
                        isRemovingPending ?
                            <ActivityIndicator size={'small'} />
                            :
                            <CustomButton backgroundColor={'red'} text={"Remove Account"} onClick={() => { setModalVisible(true) }} />
                    }
                    <CustomButton backgroundColor={'#FFC107'} text={"Deactivate Account"} onClick={() => {setModalDeactivateVisible(true) }} />

                </ScrollView>
            </View>
            <CustomDialog backgroundColor={"#141218"} visible={modalVisible} isCloseButtonDisplayed={true} onClose={() => setModalVisible(false)}>
                <TextBody>
                    Are you sure to remove this account ?
                </TextBody>
                <CustomButton backgroundColor={'red'} text={"Continue"} onClick={() => { handleRemoveAccount() }} />
                <CustomButton backgroundColor={'gray'} text={"Cancel"} onClick={() => { setModalVisible(false) }} />
            </CustomDialog>
            <CustomDialog backgroundColor={"#141218"} visible={modalDeactivateVisible} isCloseButtonDisplayed={true} onClose={() => setModalDeactivateVisible(false)}>
                <TextBody>
                    Are you sure to deactivate this account ?
                </TextBody>
                <CustomButton backgroundColor={'#FFC107'} text={"Continue"} onClick={() => { handleDeactivateAccount()  }} />
                <CustomButton backgroundColor={'gray'} text={"Cancel"} onClick={() => { setModalDeactivateVisible(false) }} />
            </CustomDialog>
        </SkeletonDiv >

    )
}

export default editProfile







