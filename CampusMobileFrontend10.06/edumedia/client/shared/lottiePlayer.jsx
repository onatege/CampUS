import LottieView from 'lottie-react-native';
import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';

const LottiePlayer = ({
    src,
    style,
    autoPlay,
    loop,
    backgroundColor,
    setAnimationFinished
}) => {
    const animation = useRef(null);
    useEffect(() => {
       // You can control the ref programmatically, rather than using autoPlay
       if (autoPlay === false) {
        
       }else{
        animation.current?.play();
       }
     }, [autoPlay]);
     
    return (
        <View style={{ backgroundColor:backgroundColor , alignItems:'center', justifyContent:'center', flex:1}}>
        <LottieView
          autoPlay={autoPlay}
          loop={loop}
          ref={animation}
          style={style}
          onAnimationFinish={() => setAnimationFinished()}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={src}
        />
      </View>
    );
  }
  
  export default LottiePlayer;