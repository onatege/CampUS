import { TouchableOpacity, View } from "react-native"
import { TextBody } from "../Texts";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { useSelector } from "react-redux";


function SearchToMessageItem({ item }) {
    const {user} = useSelector(state => state.user)
    const router = useRouter()
    return (
        <TouchableOpacity onPress={() => { router.push({ pathname:'features/messageScreen', params:{receiverId: item?.id , negotiaterId: user?.id, userId:user?.id }})}} style={{ padding: 8, display: 'flex', flexDirection: 'row', gap: 8, height:'auto' }}>
            <TouchableOpacity onPress={(e) => handleRedirectProfile(item.id , e) } style={{ width: 'auto', height: '100%', padding: 4 }}>
                <Image
                    style={{ width: 40, height: 40, borderRadius: 10 }}
                    contentFit='cover'
                    source={{uri:`https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${item?.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00`}}
                />
            </TouchableOpacity>
            <View style={{ width: '90%', height: '100%', padding: 4, flexDirection: 'column', gap: 4 }}>
                <View>
                    <TextBody>
                        {item?.displayName}
                    </TextBody>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchToMessageItem