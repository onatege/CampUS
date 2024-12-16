import { Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from 'react-native-root-siblings';
import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
    MutationCache
} from '@tanstack/react-query'
import { ToastAndroid } from 'react-native';
import { Provider } from 'react-redux'
import store from '../utils/store';

const onError = (data) => {
    console.log(`error: ${data.message}`)
}

const onSuccess = (data) => {
    console.log(`success: ${data}`)
}

const onSuccessMutate = (data) => {
    ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
}

const onErrorMutate = (data) => {
    data == "TypeError: Cannot read property 'forEach' of undefined" ?
    ToastAndroid.show(`Register confirmed`, ToastAndroid.SHORT)
        :
    ToastAndroid.show(`${data}`, ToastAndroid.SHORT)
    console.log(`error: ${data}`)

}

// Create a client ve hata mesajını göstermek için genel bir kod yaz
const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onSuccess,
        onError,
    }),
    mutationCache: new MutationCache({
        onSuccess: onSuccessMutate,
        onError: onErrorMutate,
    })
})



export default function Layout() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <RootSiblingParent>
                    <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
                        <Stack
                            screenOptions={{
                                headerTitle: "",
                                headerBackVisible: false,
                                headerShadowVisible: false,
                                headerTransparent: true,
                                headerBlurEffect: true,
                            }}>
                            <Stack.Screen name='index' options={{ headerShown: false, headerTransparent: false }} />
                            <Stack.Screen name='gettingStarted' options={{ headerShown: false, headerTransparent: false }} />
                            <Stack.Screen name='login' options={{ headerShown: false, headerTransparent: false }} />
                            <Stack.Screen name='register' options={{ headerShown: false, headerTransparent: false }} />
                            <Stack.Screen name='emailVerification' options={{ headerShown: false, headerTransparent: false }} />
                        </Stack>
                    </GestureHandlerRootView>
                </RootSiblingParent>
            </QueryClientProvider>
        </Provider>

    );
}
