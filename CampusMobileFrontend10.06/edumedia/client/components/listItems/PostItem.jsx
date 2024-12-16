import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Image } from 'expo-image';
import PagerView from 'react-native-pager-view';
import Dots from 'react-native-dots-pagination';
import { TextBody, TextLabel } from "../Texts";
import { useRouter } from 'expo-router';
import { useUpdateMutate } from "../../hooks/useGenericMutateHook";
import { useSelector } from "react-redux";
import { firebaseProjectName, firebaseToken } from '../../utils/config';

const { width } = Dimensions.get('window');

function getTimeDifference(apiDate) {
    if (!apiDate) {
        return "Unknown";
    }
    const apiDateTime = new Date(apiDate);
    apiDateTime.setHours(apiDateTime.getHours() + 3);

    const now = new Date();
    const timeDiffInMilliseconds = now.getTime() - apiDateTime.getTime();
    const timeDiffInMinutes = Math.floor(timeDiffInMilliseconds / (1000 * 60));
    const hours = Math.floor(timeDiffInMinutes / 60);
    return hours === 0 ? timeDiffInMinutes === 0 ? "just now" : `${timeDiffInMinutes}m` : hours + "h";
}

function PostItem({ item, tag }) {
    const { user } = useSelector(state => state.user);
    const router = useRouter();
    const [activePage, setActivePage] = useState(0);
    const { mutate, isPending } = useUpdateMutate();

    const handleRedirectProfile = (id, e) => {
        e.preventDefault();
        user?.id === id
            ? router.push("features/myProfile")
            : router.push({ pathname: "features/profileDetails", params: { userId: id } });
    };

    const handleLike = (userId, postId) => {
        const putData = {
            endpoint: `/api/post/likepost?userId=${userId}&postId=${postId}`,
            key: ["posts", `${userId}User`, `${userId}UserDetail`, `${tag}Posts`, "user"],
            data: { userId, postId }
        };
        mutate(putData);
    };

    const handleRemoveLike = (userId, postId) => {
        const putData = {
            endpoint: `/api/post/RemoveLike?userId=${userId}&postId=${postId}`,
            key: ["posts", `${userId}User`, `${userId}UserDetail`, `${tag}Posts`, "user"],
            data: { userId, postId }
        };
        mutate(putData);
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={(e) => handleRedirectProfile(item?.user?.id, e)} style={styles.profileImageContainer}>
                {item?.user?.profileImg?.includes('.webp') ? (
                    <Image
                        style={styles.profileImage}
                        contentFit='cover'
                        source={{ uri: `https://firebasestorage.googleapis.com/v0/b/${firebaseProjectName}/o/images%2F${item?.user?.profileImg}?alt=media&token=${firebaseToken}` }}
                    />
                ) : (
                    <Image
                        style={styles.profileImage}
                        contentFit='cover'
                        source={require("../../assets/icons/emptyPP.svg")}
                    />
                )}
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={() => router.push({ pathname: "features/postDetails", params: { postId: item?.id } })}>
                    <View style={styles.header}>
                        <TextBody>{item?.user?.displayName}</TextBody>
                        <TextBody color={'gray'}>*</TextBody>
                        <TextBody color={'gray'}>{item?.user?.userName}</TextBody>
                        <TextBody color={'gray'}>*</TextBody>
                        <TextBody color={'gray'}>{getTimeDifference(item?.createdAt)}</TextBody>
                    </View>
                    <View onPress={() => router.push({ pathname: "features/postDetails", params: { postId: item?.id } })}>
                        <TextBody>{item?.content}</TextBody>
                    </View>
                </TouchableOpacity>

                {
                    item?.images?.length > 0 ?
                        <>
                            <PagerView
                                style={styles.pagerView}
                                initialPage={0}
                                onPageSelected={(e) => setActivePage(e.nativeEvent.position)}
                            >
                                {item?.images?.map((imageUri, index) => (
                                    <View key={index} style={styles.imageContainer}>
                                        <Image
                                            style={styles.image}
                                            contentFit='cover'
                                            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${imageUri}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                                        />
                                    </View>
                                ))}
                            </PagerView>
                            <Dots
                                length={item?.images?.length ? item?.images?.length : 0}
                                active={activePage}
                                activeColor='gray'
                            />
                        </>
                        :
                        null
                }
                <View style={styles.iconsContainer}>
                    {item?.likes?.some(x => x.userId === user?.id) ? (
                        <TouchableOpacity onPress={() => handleRemoveLike(user.id, item?.id)} style={styles.iconButton}>
                            <Image
                                style={styles.icon}
                                tintColor={'red'}
                                source={require('../../assets/icons/heart.svg')}
                            />
                            <TextLabel color={'gray'}>{item?.likeCount}</TextLabel>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => handleLike(user?.id, item?.id)} style={styles.iconButton}>
                            <Image
                                style={styles.icon}
                                tintColor={'gray'}
                                source={require('../../assets/icons/heart.svg')}
                            />
                            <TextLabel color={'gray'}>{item?.likeCount}</TextLabel>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => router.push({ pathname: "features/postDetails", params: { postId: item?.id } })} style={styles.iconButton}>
                        <Image
                            style={styles.icon}
                            tintColor={'gray'}
                            source={require('../../assets/icons/comment.svg')}
                        />
                        <TextLabel color={'gray'}>{item?.replies?.length}</TextLabel>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        height: 'auto',
    },
    profileImageContainer: {
        width: 'auto',
        height: '100%',
        padding: 4,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 10,
    },
    contentContainer: {
        width: '80%',
        height: '100%',
        padding: 4,
        flexDirection: 'column',
        gap: 8,
    },
    header: {
        flexDirection: 'row',
        gap: 4,
    },
    pagerView: {
        width: '100%',
        height: 125,
    },
    imageContainer: {
        width: width - 100,
        height: 125,
    },
    image: {
        width: '100%',
        height: 125,
        borderRadius: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 4,
    },
    iconButton: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    sendIcon: {
        width: 24,
        height: 24,
        transform: [{ rotate: '-45deg' }]
    }
});

export default PostItem;
