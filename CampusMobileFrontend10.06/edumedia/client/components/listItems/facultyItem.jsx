import { TouchableOpacity, View } from "react-native"
import { TextBody } from "../Texts";
import { useRouter } from "expo-router";
import { Image } from "expo-image";


function FacultyItem({ item }) {
    const router = useRouter()
    return (
        <View style={{ padding: 8, display: 'flex', flexDirection: 'row', gap: 8, height:'auto' }}>
            <View style={{ width: '90%', height: '100%', padding: 4, flexDirection: 'column', gap: 4 }}>
                <View>
                    <TextBody color={'gray'}>
                        {item?.title}
                    </TextBody>
                </View>
            </View>
        </View>
    )
}

export default FacultyItem