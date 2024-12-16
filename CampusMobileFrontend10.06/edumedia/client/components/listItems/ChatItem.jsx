import { TouchableOpacity, View } from "react-native"
import { TextBody } from "../Texts";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useGenericQueryHook } from "../../hooks/useGenericQueryHook";
import Loader from "../../shared/Loader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function ChatItem({ item }) {
    const { user } = useSelector(state => state.user)
    const router = useRouter();
    const [id, setId] = useState(null)
    const { data, isLoading } = useGenericQueryHook(`/api/User/GetUserWithFollowersAndPostsById?id=${id}`, `${id}UserDetail`)

    useEffect(() => {
        user?.id == item?.receiver_id ?
            setId(item?.negotiater_id)
            :
            user?.id == item?.negotiater_id ?
                setId(item?.receiver_id)
                :
                null

    }, [item])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            {
                data?.data?.data && (
                    <View style={{ padding: 8, display: 'flex', flexDirection: 'row', gap: 8, height: 'auto' }}>
                        <TouchableOpacity onPress={() => router.push({ pathname: 'features/profileDetails', params: { userId: id } })} style={{ width: 'auto', height: '100%', padding: 4 }}>
                            <Image
                                style={{ width: 40, height: 40, borderRadius: 10 }}
                                contentFit='cover'
                                source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${data?.data?.data?.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push({ pathname: 'features/messageScreen', params: { receiverId: item?.receiver_id, negotiaterId: item?.negotiater_id, userId: user?.id } })} style={{ width: '80%', height: '100%', padding: 4, flexDirection: 'column', gap: 4 }}>
                            <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'space-between' }}>
                                <TextBody>
                                    {data?.data?.data?.displayName}
                                </TextBody>
                                {
                                    item?.user._id != user?.id && item?.unread === "true" ?
                                        <TextBody>
                                            <Image
                                                style={{ width: 20, height: 20 }}
                                                contentFit='cover'
                                                source={require("../../assets/icons/unread.svg")}
                                            />
                                        </TextBody>
                                        :
                                        null
                                }

                            </View>
                            <View>
                                <TextBody>
                                    {item?.text}
                                </TextBody>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }
        </>
    )
}

export default ChatItem