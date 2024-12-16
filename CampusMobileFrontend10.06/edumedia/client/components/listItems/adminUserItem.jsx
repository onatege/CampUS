import { ActivityIndicator, ToastAndroid, TouchableOpacity, View } from "react-native"
import { TextBody, TextLabel } from "../Texts";
import { Image } from "expo-image";
import { useUpdateMutate } from "../../hooks/useGenericMutateHook";


function AdminUserItem({ item }) {


    const { mutate: removeAccount, isPending, isSuccess } = useUpdateMutate()

    const handleRemoveAccount = () => {
        const delData = {
            endpoint: `/api/User/RemoveUser?id=${item?.id}`,
            token: "",
            key: ["allUsers"],
            data: {}
        }
        removeAccount(delData)
    }

    const handleDeactivateAccount = () => {
        const delData = {
            endpoint: `/api/User/DeactivateUser?id=${item?.id}`,
            token: "",
            key: ["allUsers"],
            data: {}
        }
        removeAccount(delData)
    }

    if (isSuccess) {
        ToastAndroid.show(`Success`, ToastAndroid.SHORT);

    }

    return (
        <View  style={{ padding: 8, display: 'flex', flexDirection: 'row', gap: 8, height: 'auto', justifyContent:'space-between' }}>
            <TouchableOpacity style={{ width: 'auto', height: '100%', padding: 4 }}>
                <Image
                    style={{ width: 40, height: 40, borderRadius: 10 }}
                    contentFit='cover'
                    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${item?.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                />
            </TouchableOpacity>
            <View style={{ width: 'auto', height: '100%', padding: 4, flexDirection: 'column', gap: 4 }}>
                <TextBody color={"black"}>
                    {item?.displayName}
                </TextBody>
            </View>
            {
                isPending ?
                <ActivityIndicator size={'small'} />
                :
                <View style={{ flexDirection:'row', gap:4, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity  onPress={() => handleRemoveAccount()}>
                    <TextLabel color={'red'}>Remove</TextLabel>
                </TouchableOpacity>
                <View>
                    <TextLabel color={'gray'}>-</TextLabel>
                </View>
                <TouchableOpacity onPress={() => handleDeactivateAccount()}>
                    <TextLabel color={'#FFC107'}>Deactivate</TextLabel>
                </TouchableOpacity>
            </View>
            }
        </View>
    )
}

export default AdminUserItem