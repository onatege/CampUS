import React, { useEffect, useState } from 'react';
import SkeletonDiv from '../components/SkeletonDiv';
import { Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import MainDiv from '../components/MainDiv';
import { TextDisplay, TextBody } from '../components/Texts';
import Form from '../components/Form';
import { useRouter } from 'expo-router';
import Loader from '../shared/Loader';
import { decodeAccessToken } from '../utils/tokenDecoder';
import { insertValidationData } from '../utils/localDbManager';
import { useDispatch } from 'react-redux';
import { tokenActions } from '../utils/store';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CustomDialog from '../components/CustomDialog';
import EmailVerification from './emailVerification';
import { baseUrl } from '../utils/config';

const addData = async (data, setModalVisible, setUserId) => {
    console.log(data.endpoint, data.data);
    try {
        const response = await axios.post(`${baseUrl}${data.endpoint}`, data.data, {
            headers: {
                'Authorization': `Bearer ${data?.token ? data?.token : ""}`
            }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.Data || 'Bilinmeyen bir hata oluştu';
        const userIdMatch = errorMessage.match(/userid:(\d+)/);
        if (userIdMatch) {
            const userId = userIdMatch[1];
            setUserId(userId);
            setModalVisible(true);
        }
        throw new Error(errorMessage);
    }
};

function Login() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState(null);

    const {mutate, isPending, data: token, isSuccess } = useMutation(
        {
            mutationFn:(data) => addData(data, setModalVisible , setUserId),
            onSuccess: (data, variables) => Promise.all([
                variables.key.forEach(key => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                })
            ]),
            onError: (error) => Promise.all([
                console.log(error.message , "MESAJ")
            ])
        }
    )

    async function onSubmitForm(data, setIsLoading) {
        const postData = {
            endpoint: "/api/User/LoginUser",
            key: ["login", "user","posts", "tags"],
            token: "",
            data: {
                email: data.email,
                password: data.password
            }
        };

        mutate(postData);
    }

    useEffect(() => {
        if (isSuccess) {
            const decodedToken = decodeAccessToken(token);
            const query = 'INSERT INTO validation (userId, expDate , accessToken) VALUES ( ?, ?, ?);';
            const postData = {
                userId: decodedToken?.Id,
                expDate: decodedToken?.exp,
                accessToken: token?.data
            };
            insertValidationData(query, postData);
            dispatch(tokenActions.getToken(token?.data));

            setTimeout(() => {
                if (decodedToken?.Id) {
                    const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                    if (role === "User") {
                        router.push({ pathname: "home/homepage", params: { userId: decodedToken?.Id } });
                    } else if (role === "ClubAdmin") {
                        router.push({ pathname: "home/homepage", params: { userId: decodedToken?.Id } });
                    } else if (role === "SuperAdmin") {
                        router.push("admin/clubManagement");
                    } else {
                        ToastAndroid.show('Could not determine user role', ToastAndroid.SHORT);
                    }
                } else {
                    ToastAndroid.show('Could not find user', ToastAndroid.SHORT);
                }
            }, 250);
        }
    }, [isSuccess, dispatch, token, router]);

    const defaultValues = {
        email: "",
        password: "",
    };

    const formProps = {
        formClassName: "",
        fields: [
            {
                name: "email",
                type: "email",
                rules: { required: "This field is required" },
                placeholder: "Email",
            },
            {
                name: "password",
                type: "password",
                rules: { required: "This field is required" },
                placeholder: "Password",
            }
        ],
    };

    if (isPending) {
        return <Loader />;
    }

    return (
        <MainDiv>
            <SkeletonDiv>
                <TextDisplay>Campus</TextDisplay>
                <View style={{ height: '90%', width: '100%', flexDirection: 'column', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Form
                        formProps={formProps}
                        submit={onSubmitForm}
                        defaultValues={defaultValues}
                        btnText={'Sign In'}
                    />
                    <TouchableOpacity onPress={() => router.push('register')} style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', gap: 8 }}>
                        <TextBody>
                            Don't have an account?
                        </TextBody>
                        <Text style={{ textDecorationLine: 'underline', fontFamily: 'RobotoR', color: 'white' }}>Sign up here</Text>
                    </TouchableOpacity>
                </View>
                <CustomDialog backgroundColor={"#141218"} visible={modalVisible} isCloseButtonDisplayed={true} onClose={() => setModalVisible(false)}>
                    <EmailVerification userId={userId} />
                </CustomDialog>
            </SkeletonDiv>
        </MainDiv>
    );
}

export default Login;
