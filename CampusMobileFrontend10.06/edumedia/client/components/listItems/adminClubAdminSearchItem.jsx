import { TouchableOpacity, View } from "react-native"
import { TextBody } from "../Texts";
import { Image } from "expo-image";
import { useAddMutate } from "../../hooks/useGenericMutateHook"
import { useRouter } from "expo-router";
import { useEffect } from "react";

function AdminClubAdminSearchItem({ item, index, clubId }) {
    const router = useRouter();
    const { mutate, isPending, isSuccess } = useAddMutate()

    const handleAddMember = (e) => {
        e.preventDefault();
        const postData = {
            endpoint: `/api/Club/AssignClubAdmin?clubId=${clubId}&userId=${item?.id}`,
            key: [`${clubId}Club`],
            
        }
        mutate(postData)
    }

    useEffect(() => {
        if (isSuccess) {
            router.back()
        }
    }, [isSuccess])


    return (
        <View style={{ padding: 8, display: 'flex', flexDirection: 'row', gap: 8, height: 'auto' }}>
            <TouchableOpacity onPress={(e) => handleRedirectProfile(item.id, e)} style={{ width: '10%', height: '100%', padding: 4 }}>
                <Image
                    style={{ width: '100%', height: 50, borderRadius: 10 }}
                    contentFit='cover'
                    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${item?.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                />
            </TouchableOpacity>
            <View style={{ width: '90%', height: '100%', padding: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <TextBody color={'black'}>
                        {item?.displayName}
                    </TextBody>
                </View>
                <TouchableOpacity onPress={(e) => handleAddMember(e)} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 20, height: 20, borderRadius: 10 }}
                        contentFit='cover'
                        source={require("../../assets/icons/addmember.svg")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AdminClubAdminSearchItem