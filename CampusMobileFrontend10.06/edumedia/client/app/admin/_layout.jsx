import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextBody, TextDisplay, TextLabel } from '../../components/Texts';
import { View } from 'react-native';
import { Image } from 'expo-image';

export default function Layout() {
    return (
        <View style={{ width: '100%', height: 'auto', padding: 16, flexDirection: 'column', gap: 8, paddingTop:64 }}>
            <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
                <View style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                        <TextDisplay color={'black'}>Campus</TextDisplay>
                        <TextBody color={'black'}>SuperAdmin</TextBody>
                    </View>
                    <Tabs
                        screenOptions={{
                            tabBarActiveTintColor: '#000000',
                            tabBarStyle: {
                                height: 60,
                                width: '100%',
                                borderColor: '#2B2930',
                                alignSelf: 'center',
                                borderRadius: 10,
                                backgroundColor: '#2B2930',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                zIndex: 50,
                            }
                        }}
                    >
                        <Tabs.Screen
                            name='clubManagement'
                            options={({ route }) => ({
                                headerShown: false,
                                headerTransparent: false,
                                animation: 'fade',
                                tabBarShowLabel: false,
                                tabBarIcon: ({ color, size, focused }) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: focused ? 'white' : 'transparent', padding: 8, borderRadius: 10 }}>
                                        <Image
                                            style={{ width: 26, height: 26 }}
                                            tintColor={focused ? '#000000' : '#ffffff'}
                                            source={require('../../assets/icons/community.svg')}
                                        />
                                        {focused && (
                                            <TextLabel style={{ marginLeft: 8, color: color }}>
                                                Clubs
                                            </TextLabel>
                                        )}
                                    </View>
                                ),
                            })}
                        />
                        <Tabs.Screen
                            name='schoolStructureManagement'
                            options={({ route }) => ({
                                headerShown: false,
                                headerTransparent: false,
                                animation: 'fade',
                                tabBarShowLabel: false,
                                tabBarIcon: ({ color, size, focused }) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: focused ? 'white' : 'transparent', padding: 8, borderRadius: 10 }}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            tintColor={focused ? '#000000' : '#ffffff'}
                                            source={require('../../assets/icons/building.svg')}
                                        />
                                        {focused && (
                                            <TextLabel style={{ marginLeft: 8, color: color }}>
                                                Faculty
                                            </TextLabel>
                                        )}
                                    </View>
                                ),
                            })}
                        />
                        <Tabs.Screen
                            name='userManagement'
                            options={({ route }) => ({
                                headerShown: false,
                                headerTransparent: false,
                                animation: 'fade',
                                tabBarShowLabel: false,
                                tabBarIcon: ({ color, size, focused }) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: focused ? 'white' : 'transparent', padding: 8, borderRadius: 10 }}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            tintColor={focused ? '#000000' : '#ffffff'}
                                            source={require('../../assets/icons/manageAccount.svg')}
                                        />
                                        {focused && (
                                            <TextLabel style={{ marginLeft: 8, color: color }}>
                                                Users
                                            </TextLabel>
                                        )}
                                    </View>
                                ),
                            })}
                        />
                        <Tabs.Screen
                            name='options'
                            options={({ route }) => ({
                                headerShown: false,
                                headerTransparent: false,
                                animation: 'fade',
                                tabBarShowLabel: false,
                                tabBarIcon: ({ color, size, focused }) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: focused ? 'white' : 'transparent', padding: 8, borderRadius: 10 }}>
                                        <Image
                                            style={{ width: 26, height: 26 }}
                                            tintColor={focused ? '#000000' : '#ffffff'}
                                            source={require('../../assets/icons/settings.svg')}
                                        />
                                        {focused && (
                                            <TextLabel style={{ marginLeft: 8, color: color }}>
                                                Ops
                                            </TextLabel>
                                        )}
                                    </View>
                                ),
                            })}
                        />
                    </Tabs>
                </View>
            </GestureHandlerRootView>
        </View>

    );
}
