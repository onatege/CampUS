import { TextInput, ToastAndroid, TouchableOpacity, View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
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

function postDetails() {
    const router = useRouter();
    const { user } = useSelector(state => state.user);
    const [comment, setComment] = useState(null);
    const { postId } = useLocalSearchParams();
    const [activePage, setActivePage] = useState(0);

    const { data: post, isLoading } = useGenericQueryHook(`/api/Post/GetPostById?id=${postId}`, `${postId}Post`);
    const { mutate, isPending } = useUpdateMutate();
    const { mutate: addReply, isPending: isReplyPending } = useAddMutate();
    const { mutate: deletePost, isPending: isDeletePending, isSuccess: isDeleteSuccess } = useDeleteMutate();

    const handleLike = (userId, postId) => {
        const putData = {
            endpoint: `/api/post/likepost?userId=${userId}&postId=${postId}`,
            key: [`${postId}Post`, "posts"],
            data: { userId, postId },
        };
        mutate(putData);
    };

    const handleRemoveLike = (userId, postId) => {
        const putData = {
            endpoint: `/api/post/RemoveLike?userId=${userId}&postId=${postId}`,
            key: [`${postId}Post`, "posts"],
            data: { userId, postId },
        };
        mutate(putData);
    };

    const handlePostComment = (data) => {
        const postComment = {
            endpoint: `/api/Post/AddReply`,
            key: [`${postId}Post`, "posts"],
            data: {
                userId: data.userId,
                postId: data.postId,
                content: comment || "",
                createdAt: "2024-05-23T07:55:10.178",
            },
        };

        if (comment) {
            addReply(postComment);
        } else {
            ToastAndroid.show('You have to type something', ToastAndroid.SHORT);
        }
    };

    const handleRedirect = () => {
        user?.id == post?.data?.data?.user?.id
            ? router.push("features/myProfile")
            : router.push({ pathname: "features/profileDetails", params: { userId: post?.data?.data?.user?.id } });
    };

    const handleDeletePost = () => {
        const delPost = {
            endpoint: `/api/Post/RemovePost?id=${post?.data?.data?.id}`,
            token: "",
            key: ["posts", "user"],
            data: {}
        }

        deletePost(delPost)
    }



    useEffect(() => {
        if (isDeleteSuccess) {
            router.push({ pathname: "home/homepage", params: { userId: user?.id } })
        }
    }, [isDeleteSuccess, isLoading])

    if (isLoading) {
        return <Loader />;
    }


    return (
        <SkeletonDiv>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleRedirect} style={styles.profileImageContainer}>
                            <Image
                                style={styles.profileImage}
                                source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${post?.data?.data?.user.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                            />
                        </TouchableOpacity>
                        {
                            user?.id == post?.data?.data?.user?.id ?
                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                                    <TouchableOpacity onPress={() => handleDeletePost()} >
                                        <Image
                                            style={{ width: 20, height: 20 }}
                                            source={require("../../assets/icons/trash.svg")}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => router.push({ pathname: "features/editPost", params: { postId: post?.data?.data?.id } })} >
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
                    <TextBody>{post?.data?.data.content}</TextBody>
                </View>
                {
                    post?.data?.data?.images?.length > 0 ?
                        <>
                            <PagerView
                                style={styles.pagerView}
                                initialPage={0}
                                onPageSelected={(e) => setActivePage(e.nativeEvent.position)}
                            >
                                {post?.data?.data?.images?.map((imageUri, index) => (
                                    <View key={index} style={styles.imageContainer}>
                                        <Image
                                            style={styles.image}
                                            contentFit='cover'
                                            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${imageUri}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                                        />
                                    </View>
                                ))}
                            </PagerView>
                            <Dots length={post?.data?.data?.images?.length} active={activePage} activeColor='gray' />
                        </>
                        :
                        null
                }

            </View>
            <View style={styles.actions}>
                {post?.data?.data?.likes?.some(x => x.userId === user.id) ? (
                    <>
                        {
                            isPending ?
                                <ActivityIndicator size={'small'} />
                                :
                                <TouchableOpacity onPress={() => handleRemoveLike(user.id, post?.data?.data?.id)} style={styles.actionButton}>
                                    <Image style={styles.actionIcon} tintColor={'red'} source={require('../../assets/icons/heart.svg')} />
                                    <TextLabel color={'gray'}>{post?.data?.data?.likeCount}</TextLabel>
                                </TouchableOpacity>
                        }
                    </>

                ) : (
                    <>
                        {
                            isPending ?
                                <ActivityIndicator size={'small'} />
                                :
                                <TouchableOpacity onPress={() => handleLike(user.id, post?.data?.data?.id)} style={styles.actionButton}>
                                    <Image style={styles.actionIcon} tintColor={'gray'} source={require('../../assets/icons/heart.svg')} />
                                    <TextLabel color={'gray'}>{post?.data?.data?.likeCount}</TextLabel>
                                </TouchableOpacity>
                        }
                    </>

                )}
                <TouchableOpacity style={styles.actionButton}>
                    <Image style={styles.actionIcon} tintColor={'gray'} source={require('../../assets/icons/comment.svg')} />
                    <TextLabel color={'gray'}>{post?.data?.data?.replies?.length}</TextLabel>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: 'features/messageScreen', params: { receiverId: post?.data?.data?.user.id, negotiaterId: user?.id, userId: user?.id } })}>
                <Image style={styles.sendIcon} tintColor={'gray'} source={require('../../assets/icons/send.svg')} />
                </TouchableOpacity>
            </View>
            <View style={styles.commentSection}>
                <TextInput
                    multiline
                    onChangeText={(e) => setComment(e)}
                    style={styles.commentInput}
                    placeholder='Enter your comment'
                    placeholderTextColor={'gray'}
                />
                {
                    isReplyPending ?
                        <ActivityIndicator size={'small'} />
                        :
                        <TouchableOpacity onPress={() => handlePostComment({ userId: user.id, postId: post?.data?.data.id })}>
                            <Image style={styles.commentSendIcon} tintColor={'gray'} source={require('../../assets/icons/send.svg')} />
                        </TouchableOpacity>
                }
            </View>
            <List data={post?.data?.data.replies} renderItem={renderItem} />

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
        borderRadius:10
    },
    commentInput: {
        padding: 8,
        color: 'white',
        width: '75%',
    },
    sendIcon: {
        width: 24,
        height: 24,
        transform: [{ rotate: '-45deg' }]
    },
    commentSendIcon: {
        width: 24,
        height: 24,
    },
});

export default postDetails;
