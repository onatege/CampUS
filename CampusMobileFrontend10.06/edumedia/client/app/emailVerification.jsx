import { useState } from "react"
import { View, TextInput, ToastAndroid } from "react-native"
import { TextTitle } from "../components/Texts";
import { useAddMutate } from "../hooks/useGenericMutateHook";
import CustomButton from "../components/CustomButton";

function EmailVerification({userId}) {
    const [value, setValue] = useState(null);
    const {mutate , isPending, isSuccess} = useAddMutate()

    const handleVerification = () => {
        const postData = {
            endpoint:`/api/User/VerifyAccount?userID=${userId}&Otp=${value}`,
            token:"",
            key:["user"],
            data:{
                userID:parseInt(userId),
                Otp: value
            }
        }

        mutate(postData)
    }

    if (isSuccess) {
        ToastAndroid.show('Verification Confirmed , try login again.', ToastAndroid.SHORT);

    }
    return (
        <View style={{ flexDirection: 'column', gap: 8, width: '100%', height: 'auto' }}>
            <TextTitle>
                Verification Screen
            </TextTitle>
            <TextInput
                placeholderTextColor={'gray'}
                placeholder='Verification code'
                style={{ width: '100%', height: '100%', color: 'white', height:50 }}
                onChangeText={(text) => setValue(text)}
            />
            <CustomButton text={"Send"} spinner={isPending} onClick={() => handleVerification()} />
        </View>
    )
}

export default EmailVerification