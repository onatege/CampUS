import { TouchableOpacity, View } from "react-native"
import { TextBody } from "../Texts";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { useSelector } from "react-redux";


function ProfileItem({ item, clubAdminId }) {
    const { user } = useSelector(state => state.user)
    const router = useRouter()

    const handleRedirect = () => {
        item?.id != user?.id ?
            router.push({ pathname: 'features/profileDetails', params: { userId: item?.id } })
            :
            router.push("features/myProfile")
    }
    return (
        <TouchableOpacity onPress={() => handleRedirect()} style={{ padding: 8, display: 'flex', flexDirection: 'row', gap: 8, height: 'auto' }}>
            <TouchableOpacity style={{ width: 'auto', height: '100%', padding: 4 }}>
                <Image
                    style={{ width: 40, height: 40, borderRadius: 10 }}
                    contentFit='cover'
                    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${item?.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                />
            </TouchableOpacity>
            <View style={{ width: '90%', height: '100%', padding: 4, flexDirection: 'column', gap: 4 }}>
                {
                    item?.id === clubAdminId && (
                        <TextBody color={"white"}>
                            (Admin)
                        </TextBody>
                    )
                }
                <TextBody color={"white"}>
                    {item?.displayName}
                </TextBody>
            </View>
        </TouchableOpacity>
    )
}

export default ProfileItem