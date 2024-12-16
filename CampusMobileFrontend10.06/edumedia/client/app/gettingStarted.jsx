import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur'
import { TouchableOpacity, View, Text } from 'react-native';
import { TextBody, TextDisplay } from '../components/Texts';
import CustomButton from '../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';

function gettingStarted() {
    const router = useRouter();

    return (
        <View style={{ backgroundColor: '#141218', width: '100%', height: '100%' }}>
            <BlurView intensity={75} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 100, paddingTop: 32, paddingHorizontal: 16, flexDirection: 'column' }} >
                <TextDisplay>Campus</TextDisplay>

                <View style={{ position: 'absolute', bottom: 0, height: '30%', width: '100%', alignSelf: 'center', gap: 8 }}>
                    <TextDisplay>
                        Welcome,
                    </TextDisplay>
                    <TextBody>
                        Share your thoughts, connect with friends and discover the campus
                    </TextBody>
                    <CustomButton text={"Get Started"} onClick={() => router.push('register')} />
                    <TouchableOpacity onPress={() => router.push('login')} style={{ alignSelf: 'center', display:'flex', flexDirection:'row', gap:8 }}>
                        <TextBody>
                            Already on Edumedia ? 
                        </TextBody>
                        <Text style={{ textDecorationLine:'underline', fontFamily:'RobotoR', color:'white'}}>Sign in here</Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
            <LinearGradient
                colors={['transparent', '#141218', '#000000']}
                style={{
                    height: '33%',
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 50
                }}
            />
            <Image
                style={{ width: '100%', height: '100%', opacity: 1, borderRadius: 0, borderBottomWidth: 1, borderColor: 'black' }}
                contentFit='cover'
                source={require('../assets/images/startedImage.webp')}
                alt='edumedia cover'
            />
        </View>

    )
}

export default gettingStarted