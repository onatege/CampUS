import { TouchableOpacity, View } from "react-native"
import { TextBody } from "../Texts";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { useDeleteMutate, useAddMutate } from "../../hooks/useGenericMutateHook";


function ClubMemberItem({ item, clubId, clubadminId }) {
    const { mutate, isPending , isSuccess:isRemoveMemberSuccess} = useDeleteMutate()
    const { mutate: removeAdmin, isPending: isRemoveAdminPending, isSuccess } = useAddMutate()

    const { token } = useSelector(state => state.token)
    const { user } = useSelector(state => state.user)
    const router = useRouter()

    const handleRedirect = () => {
        item?.id != user?.id ?
            router.push({ pathname: 'features/profileDetails', params: { userId: item?.id } })
            :
            router.push("features/myProfile")
    }

    const handleRemoveMember = (e) => {
        e.preventDefault();
        const delData = {
            endpoint: `/api/Club/RemoveMember?clubId=${clubId}`,
            token: token ? token : "",
            key: [`${clubId}Club`],
            data: {
                username: item?.userName
            }
        }
        mutate(delData)

        handleRemoveIsAdmin();
    }

    const handleRemoveIsAdmin = () => {
        const superAdminId = 9999;
        const postData = {
            endpoint: `/api/Club/AssignClubAdmin?clubId=${clubId}&userId=${superAdminId}`,
            key: [`${clubId}Club`],

        }
        removeAdmin(postData)
    }

    

    return (
        <TouchableOpacity onPress={() => handleRedirect()} style={{ padding: 8, display: 'flex', flexDirection: 'row', gap: 8, height: 'auto' }}>
            <TouchableOpacity style={{ width: '10%', height: '100%', padding: 4 }}>
                <Image
                    style={{ width: '100%', height: 50, borderRadius: 10 }}
                    contentFit='cover'
                    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${item?.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                />
            </TouchableOpacity>
            <View style={{ width: '90%', height: '100%', padding: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    {
                        item?.id === clubadminId && (
                            <TextBody color={"black"}>
                                (Admin)
                            </TextBody>
                        )
                    }
                    <TextBody color={"black"}>
                        {item?.displayName}
                    </TextBody>
                </View>
                <TouchableOpacity onPress={(e) => handleRemoveMember(e)} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 20, height: 20, borderRadius: 10 }}
                        contentFit='cover'
                        source={require("../../assets/icons/removeMember.svg")}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ClubMemberItem