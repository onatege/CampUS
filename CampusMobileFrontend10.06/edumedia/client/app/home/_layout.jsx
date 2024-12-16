import { Tabs, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainDiv from '../../components/MainDiv';
import { TextDisplay, TextLabel } from '../../components/Texts';
import { TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { firebase } from '../../utils/firebaseConfig';

export default function Layout() {
    const { user } = useSelector(state => state.user);
    const router = useRouter();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (user) {
            const db = firebase.firestore();
            const unsubscribe = db.collection('messages').onSnapshot((snapshot) => {
                const unreadMessages = snapshot.docs.filter((doc) => {
                    const messageData = doc.data();
                    return (
                        messageData?.user?._id != user?.id && messageData?.unread === "true" && // Sadece okunmamış mesajları filtrele
                        (messageData?.negotiater_id == user.id || messageData?.receiver_id == user?.id) // Kullanıcı herhangi bir tarafta bulunabilir
                    );
                });
                setUnreadCount(unreadMessages.length);
            });
    
            // Cleanup subscription on unmount
            return () => unsubscribe();
        }
    }, [user]);

    return (
        <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
            <MainDiv>
                <View style={{ width: '100%', height: '100%', position: 'relative', paddingVertical: 16 }}>
                    <TextDisplay>Campus</TextDisplay>
                    {
                        user &&
                            <TouchableOpacity onPress={() => router.push("features/myProfile")} style={{ width: 100, height: 100, borderRadius: 10, position: 'absolute', top: 0, right: 0, backgroundColor: '#2B2930', zIndex: 100, padding: 8 }}>
                                <Image
                                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                    contentFit='cover'
                                    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/campus-90b17.appspot.com/o/images%2F${user?.profileImg}?alt=media&token=d9dfb2ef-2022-42cf-ab55-d93f702dcb00` }}
                                />
                            </TouchableOpacity>
                    }
                    <LinearGradient
                        colors={['transparent', '#141218']}
                        style={{
                            height: '10%',
                            width: '100%',
                            position: 'absolute',
                            bottom: 0,
                            zIndex: 10
                        }}
                    />
                    <Tabs
                        screenOptions={{
                            tabBarActiveTintColor: '#000000',
                            tabBarStyle: {
                                height: 60,
                                width: '75%',
                                borderColor: '#2B2930',
                                alignSelf: 'center',
                                borderRadius: 10,
                                backgroundColor: '#2B2930',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: 16,
                                left: '12.5%',
                                zIndex: 50,
                                paddingHorizontal: 8
                            }
                        }}
                    >
                        <Tabs.Screen
                            name='homepage'
                            options={{
                                headerShown: false,
                                headerTransparent: true,
                                animation: 'fade',
                                tabBarShowLabel: false,
                                tabBarIcon: ({ color, size, focused }) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: focused ? 'white' : 'transparent', padding: 8, borderRadius: 10 }}>
                                        <Image
                                            style={{ width: 26, height: 26 }}
                                            tintColor={focused ? '#000000' : '#ffffff'}
                                            source={require('../../assets/icons/home.svg')}
                                        />
                                        {focused && (
                                            <TextLabel style={{ marginLeft: 8, color: color }}>
                                                Home
                                            </TextLabel>
                                        )}
                                    </View>
                                ),
                            }}
                        />
                        <Tabs.Screen
                            name='explore'
                            options={{
                                headerShown: false,
                                headerTransparent: true,
                                animation: 'fade',
                                tabBarShowLabel: false,
                                tabBarIcon: ({ color, size, focused }) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: focused ? 'white' : 'transparent', padding: 8, borderRadius: 10 }}>
                                        <Image
                                            style={{ width: 26, height: 26 }}
                                            tintColor={focused ? '#000000' : '#ffffff'}
                                            source={require('../../assets/icons/explore.svg')}
                                        />
                                        {focused && (
                                            <TextLabel style={{ marginLeft: 8, color: color }}>
                                                Explore
                                            </TextLabel>
                                        )}
                                    </View>
                                ),
                            }}
                        />
                        <Tabs.Screen
                            name='chat'
                            options={{
                                headerShown: false,
                                headerTransparent: true,
                                animation: 'fade',
                                tabBarShowLabel: false,
                                tabBarIcon: ({ color, size, focused }) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: focused ? 'white' : 'transparent', padding: 8, borderRadius: 10, position:'relative' }}>
                                        <Image
                                            style={{ width: 26, height: 26 }}
                                            tintColor={focused ? '#000000' : '#ffffff'}
                                            source={require('../../assets/icons/message.svg')}
                                        />
                                        {focused && (
                                            <TextLabel style={{ marginLeft: 8, color: color }}>
                                                Chat
                                            </TextLabel>
                                        )}
                                        {unreadCount > 0 && (
                                            <View style={{ marginLeft: 8, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, position:'absolute', top:0, right:0 }}>
                                                <Text style={{ color: 'white', fontSize: 8 }}>{unreadCount}</Text>
                                            </View>
                                        )}
                                    </View>
                                ),
                            }}
                        />
                    </Tabs>
                </View>
            </MainDiv>
        </GestureHandlerRootView>
    );
}
