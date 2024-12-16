import { Stack, useRouter } from 'expo-router';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainDiv from '../../components/MainDiv';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';


export default function Layout() {
    const router = useRouter();
    return (
        <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
            <MainDiv>

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
                <LinearGradient
                    colors={['transparent', '#141218']}
                    style={{
                        height: '10%',
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        zIndex: 0
                    }}
                />
                <Stack>
                    <Stack.Screen name='clubPostDetails' options={{ headerShown: false, headerTransparent: false }} />
                    <Stack.Screen name='postDetails' options={{ headerShown: false, headerTransparent: false }} />
                    <Stack.Screen name='profileDetails' options={{ headerShown: false, headerTransparent: false }} />
                    <Stack.Screen name='taggedFeed' options={{ headerShown: false, headerTransparent: false }} />
                    <Stack.Screen name='searchToMessage' options={{ headerShown: false, headerTransparent: false }} />
                    <Stack.Screen name='messageScreen' options={{ headerShown: false, headerTransparent: false }} />
                    <Stack.Screen name='myProfile' options={{ headerShown: false, headerTransparent: false }} />
                    <Stack.Screen name='createPost' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                    <Stack.Screen name='clubDetails' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                    <Stack.Screen name='editProfile' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                    <Stack.Screen name='createClubPost' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                    <Stack.Screen name='editClub' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                    <Stack.Screen name='editPost' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                    <Stack.Screen name='editClubPost' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                    <Stack.Screen name='manageMemberReq' options={{ headerShown: false, headerTransparent: false, presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
                </Stack>
            </MainDiv>
        </GestureHandlerRootView>
    );
}
