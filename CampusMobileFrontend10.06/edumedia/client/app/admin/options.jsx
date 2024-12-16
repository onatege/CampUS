import { TouchableOpacity, View } from 'react-native'
import { TextLabel } from '../../components/Texts'
import { Image } from 'expo-image';
import { clearTable } from '../../utils/localDbManager';
import { useRouter } from 'expo-router';


function requestManagement() {
    const router = useRouter();
    const handleLogOut = () => {
        clearTable().then(() => router.push("gettingStarted"))
    }
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                display: 'flex',
                gap: 32,
                paddingTop: 32
            }}
        >
            <TouchableOpacity onPress={() => router.push("adminFeatures/manageRequests")} style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}>
                <Image
                    style={{ width: 24, height: 24, borderRadius: 12 }}
                    source={require('../../assets/icons/open.svg')}
                />
                <TextLabel color={'white'}>Show Requests</TextLabel>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogOut()}
                style={{ width: 'auto', height: 'auto', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1D1B20', padding: 8 }}>
                <Image
                    style={{ width: 24, height: 24, borderRadius: 12 }}
                    source={require('../../assets/icons/logout.svg')}
                />
                <TextLabel color={'white'}>Log Out</TextLabel>
            </TouchableOpacity>
        </View>

    )
}

export default requestManagement