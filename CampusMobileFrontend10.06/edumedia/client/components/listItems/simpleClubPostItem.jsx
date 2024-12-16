import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Image } from 'expo-image';
import PagerView from 'react-native-pager-view';
import Dots from 'react-native-dots-pagination';
import { TextBody } from "../Texts";
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

function SimpleClubPostItem({ item }) {
    const { user } = useSelector(state => state.user)
    const router = useRouter();
    const [activePage, setActivePage] = useState(0);

    const handleRedirectProfile = (e) => {
        e.preventDefault();
        router.push({ pathname: "features/clubDetails", params: { clubId: item?.author?.id } });
    };

    return (
        <>
            {
                item?.members?.some(x => x.id == user?.id) ?
                    <View style={styles.container}>
                        <TouchableOpacity onPress={(e) => handleRedirectProfile(e)} style={styles.profileImageContainer}>
                            <Image
                                style={styles.profileImage}
                                contentFit='cover'
                                source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${item?.clubProfileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                            />
                        </TouchableOpacity>
                        <View style={styles.contentContainer}>
                            <View style={styles.header}>
                                <TextBody>{item?.name}</TextBody>
                                <TextBody color={'gray'}>*</TextBody>
                                <TextBody color={'gray'}>{item?.clubName}</TextBody>
                                <TextBody color={'gray'}>*</TextBody>
                                <TextBody color={'gray'}>{item?.createdTime}</TextBody>
                            </View>
                            <View>
                                <TextBody color={'gray'}>{item?.content}</TextBody>
                            </View>
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
                                            length={item?.images?.length}
                                            active={activePage}
                                            activeColor='gray'
                                        />
                                    </>
                                    :
                                    null
                            }
                        </View>
                    </View>
                    :
                    null
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        height: 250,
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
    icon: {
        width: 24,
        height: 24,
    },
});

export default SimpleClubPostItem;
