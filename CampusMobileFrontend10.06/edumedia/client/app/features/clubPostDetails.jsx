import { TextInput, ToastAndroid, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import SkeletonDiv from '../../components/SkeletonDiv';
import { TextBody, TextLabel } from '../../components/Texts';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import List from '../../shared/list';
import CommentItem from '../../components/listItems/CommentItem';
import { useGenericQueryHook } from '../../hooks/useGenericQueryHook';
import Loader from '../../shared/Loader';
import { useAddMutate, useUpdateMutate, useDeleteMutate } from '../../hooks/useGenericMutateHook';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PagerView from 'react-native-pager-view';
import Dots from 'react-native-dots-pagination';

const { width } = Dimensions.get('window');

const renderItem = ({ item, index }) => {
    return (
        <>
            {item ? <CommentItem key={index} item={item} /> : <Text>Yükleniyor...</Text>}
        </>
    );
};

function ClubPostDetails() {
    const router = useRouter();
    const { user } = useSelector(state => state.user);
    const { clubPostId, isMember, clubId } = useLocalSearchParams();
    const [activePage, setActivePage] = useState(0);
    const { data: clubPost, isLoading } = useGenericQueryHook(`/api/ClubPost/GetClubPostById?clubPostId=${clubPostId}`, `${clubPostId}ClubPost`);
    const { mutate: deletePost, isPending: isDeletePending, isSuccess: isDeleteSuccess } = useDeleteMutate();


    const handleDeleteClubPost = () => {
        const delPost = {
            endpoint: `/api/ClubPost/RemoveClubPost?clubPostId=${clubPostId}`,
            token: "",
            key: [ `${clubId}Club`],
            data: {}
        }

        deletePost(delPost)
    }

    useEffect(()=> {
        if (isDeleteSuccess) {
            router.push({ pathname: "home/homepage", params: { userId: user?.id } })
        }
    },[isDeleteSuccess])

    if (isLoading) {
        return <Loader />;
    }
    

    return (
        <SkeletonDiv>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.profileImageContainer}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${clubPost?.data?.data?.clubProfileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                            />
                        </TouchableOpacity>
                        <TextBody>{clubPost?.data?.data?.clubName}</TextBody>
                        {
                            isMember === "true" ?

                                <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', gap:4}}>
                                <TouchableOpacity onPress={() => handleDeleteClubPost()} >
                                    <Image
                                        style={{ width: 20, height: 20 }}
                                        source={require("../../assets/icons/trash.svg")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push({ pathname: "features/editClubPost", params: { clubPostId: clubPostId, clubId:clubId } })} >
                                    <Image
                                        style={{ width: 20, height: 20 }}
                                        source={require("../../assets/icons/edit.svg")}
                                    />
                                </TouchableOpacity>
                            </ View>
                            :
                            null
                               
                        }
                    </View>
                </View>
                <View style={styles.content}>
                    <TextBody>{clubPost?.data?.data.content}</TextBody>
                </View>
                {
                    clubPost?.data?.data?.images?.length > 0 ?
                        <>
                            <PagerView
                                style={styles.pagerView}
                                initialPage={0}
                                onPageSelected={(e) => setActivePage(e.nativeEvent.position)}
                            >
                                {clubPost?.data?.data?.images?.map((imageUri, index) => (
                                    <View key={index} style={styles.imageContainer}>
                                        <Image
                                            style={styles.image}
                                            contentFit='cover'
                                            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${imageUri}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                                        />
                                    </View>
                                ))}
                            </PagerView>
                            <Dots length={clubPost?.data?.data?.images?.length} active={activePage} activeColor='gray' />
                        </>
                        :
                        null
                }
            </View>
        </SkeletonDiv>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        paddingVertical: 8,
        flexDirection: 'column',
        gap: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileImageContainer: {
        width: 'auto',
        height: 'auto',
        borderRadius: 50,
        borderWidth: 0.4,
        borderColor: 'white',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    content: {
        width: '100%',
        height: 'auto',
    },
    pagerView: {
        width: '100%',
        height: 125,
    },
    imageContainer: {
        width: width,
        height: 125,
    },
    image: {
        width: '100%',
        height: 125,
        borderRadius: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 4,
    },
    actionButton: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    actionIcon: {
        width: 24,
        height: 24,
    },
    linearGradient: {
        height: '10%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
    },
    commentSection: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 0.4,
        borderColor: 'gray',
    },
    commentInput: {
        padding: 8,
        color: 'white',
        width: '75%',
    },
    sendIcon: {
        width: 24,
        height: 24,
    },
});

export default ClubPostDetails;
