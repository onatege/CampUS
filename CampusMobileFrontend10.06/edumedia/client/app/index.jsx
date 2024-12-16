import { useEffect, useState } from 'react';
import SkeletonDiv from '../components/SkeletonDiv';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import Animated, { FadeOutDown } from 'react-native-reanimated';
import LottiePlayer from '../shared/lottiePlayer';
import { createValidationTable, getValidationData } from '../utils/localDbManager';
import { useDispatch } from 'react-redux';
import { userActions } from '../utils/slices/user-slice';
import { tokenActions } from '../utils/store'

function index() {
  const dispatch = useDispatch();
  const [fontsReady, setFontReady] = useState(false)
  const [animationFinished, setAnimationFinished] = useState(false)
  const [result ,setResult] = useState([]);
  const [loaded ,setLoaded] = useState(false);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'RobotoR': require('../assets/fonts/Roboto-Regular.ttf'),
    'GilroyEB': require('../assets/fonts/Gilroy-ExtraBold.otf')
  });

  const handleValidationData = async () => {
    const query = 'SELECT * FROM validation;'
    getValidationData(query, setResult, setLoaded)
  }

  useEffect(() => {
    
    const fontValue = fontsLoaded.valueOf();
    setFontReady(fontValue)
    createValidationTable();
    handleValidationData();

    if ( animationFinished && loaded) {
      if (result.length === 0) {
        setTimeout(() => {
          router.push("gettingStarted")
        }, 250)
      } else {
        const nowTimestamp = Math.floor(Date.now() / 1000);
        const differenceInSeconds = nowTimestamp - result.expDate;
        differenceInSeconds >= 0 ?
          setTimeout(() => {
            dispatch(userActions.replaceUser([]));
            router.push("gettingStarted")
          }, 250)
          :
          setTimeout(() => {
            console.log("USERID" , result?.userId)
             
            if (result?.userId == 9999) {
              dispatch(tokenActions.getToken(result?.accessToken))
              router.push( "admin/clubManagement")
            }else{
              router.push({ pathname: "home/homepage", params: { userId: result?.userId } })
            }
          }, 250)
      }

    }
  }, [fontsReady, fontsLoaded, animationFinished, loaded])

  return (
    <SkeletonDiv>
      <Animated.View exiting={FadeOutDown} style={{ width: '100%', height: '100%' }}>
        <LottiePlayer src={require("../assets/animations/eduloader.json")} setAnimationFinished={() => setAnimationFinished(true)} backgroundColor={"141218"} style={{ width: '100%', height: '100%' }} autoPlay={true} loop={false} />
      </Animated.View>
    </SkeletonDiv>
  )
}

export default index