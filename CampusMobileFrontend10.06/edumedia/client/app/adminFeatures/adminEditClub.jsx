import { TouchableOpacity, View } from 'react-native'
import Form from '../../components/Form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ImagePickerService from '../../shared/ImagePicker';
import TakePhotoService from '../../shared/TakePhoto';
import { useState } from 'react';
import { Image } from 'expo-image';
import { useUpdateMutate, useDeleteMutate } from '../../hooks/useGenericMutateHook';
import CustomButton from '../../components/CustomButton';
import { useSelector } from 'react-redux';

function adminEditClub() {
    const {token} = useSelector(state => state.token)
    const { defaultName, defaultDescription, defaultProfileImg, clubId ,clubAdminId} = useLocalSearchParams();
    const { mutate, isPending } = useUpdateMutate();
    const { mutate:removeClub, isPending: isRemovingPending } = useDeleteMutate();


    const [profileImage, setProfileImages] = useState(defaultProfileImg);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

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

    const handleRemoveClub = () => {
        const delClub= {
            endpoint: `/api/Club/DeleteClub?id=${clubId}`,
            token: token ? token : "",
            key: [`${clubId}Club`, "clubs"],
            data:{}
        }
        removeClub(delClub);

        if (!isRemovingPending) {
            router.push("admin/clubManagement")
        }
    }

    async function onSubmitForm(data, setIsLoading) {
        const putData = {
            endpoint: `/api/Club/UpdateClub?id=${clubId}`,
            token:"",
            key: [`${clubId}Club`, "clubs"],
            data: {
                id: clubId,
                name: data?.name ? data?.name : defaultName,
                description: data?.description ? data?.description : defaultDescription,
                profileImg: profileImage ? profileImage : defaultProfileImg,
                clubAdminId: clubAdminId,
            }
        }

        mutate(putData)
    }



    const formProps = {
        formClassName: "",
        fields: [
            {
                name: "name",
                type: "text",
                placeholder: `${defaultName}`,
            },
            {
                name: "description",
                type: "text",
                placeholder: `${defaultDescription}`,
            },

        ],
    };
    return (
        <View>
            <View style={{ height: '90%', width: '100%', flexDirection: 'column', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
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
                    textColor={'gray'}
                />
                <CustomButton backgroundColor={'red'} text={'Remove Club'} onClick={() => {handleRemoveClub()}} />
            </View>
        </View>

    )
}

export default adminEditClub