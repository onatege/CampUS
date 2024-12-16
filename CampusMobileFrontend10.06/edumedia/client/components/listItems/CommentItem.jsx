import { TouchableOpacity, View } from "react-native"
import { TextBody } from "../Texts";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";


function CommentItem({ item }) {
    const {user} = useSelector(state => state.user)
    const router = useRouter();

    const handleRedirect = () => {
        user?.id == item?.user?.id ?
        router.push("features/myProfile")
        :
        router.push({pathname:"features/profileDetails", params:{userId:item?.user?.id }})
    }
    return (
        <View style={{ padding: 8, display: 'flex', flexDirection: 'row', gap: 8, height: 'auto', borderBottomWidth:0.4, borderColor:'gray' }}>
            <TouchableOpacity onPress={() => handleRedirect()} style={{ width: 'auto', height: '100%', padding: 4 }}>
                <Image
                    style={{ width: 40, height: 40, borderRadius: 10 }}
                    contentFit='cover'
                    source={{uri:`https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${item?.user?.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00`}}
                />
            </TouchableOpacity>
            <View style={{ width: '100%', padding: 4, flexDirection: 'column', gap: 4 }}>
                <View style={{ width: '90%', height: 'auto' }}>
                    <TextBody color={'white'}>
                        {item?.content}
                    </TextBody>
                </View>
            </View>
        </View>
    )
}

export default CommentItem