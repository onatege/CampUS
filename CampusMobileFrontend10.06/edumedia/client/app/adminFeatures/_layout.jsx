import { Stack, useRouter } from 'expo-router';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';


export default function Layout() {
    const router = useRouter();
    return (
        <View style={{ width: '100%', height: 'auto', padding: 16, flexDirection: 'column', gap: 8 }}>
            <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
                <View style={{ width: '100%', height: '100%', position: 'relative', paddingTop:64 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 64 }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image
                                style={{ width: 24, height: 24 }}
                                tintColor={'gray'}
                                source={require('../../assets/icons/arrowBack.svg')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={{ width: 24, height: 24 }}
                                tintColor={'gray'}
                                source={require('../../assets/icons/options.svg')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Stack>
                        <Stack.Screen name='adminClubDetails' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                        <Stack.Screen name='adminEditClub' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                        <Stack.Screen name='adminAddClubMember' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                        <Stack.Screen name='manageRequests' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                        <Stack.Screen name='adminClubPostDetails' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                        <Stack.Screen name='adminAddClubAdmin' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                    </Stack>
                </View>
            </GestureHandlerRootView>
        </View>

    );
}
