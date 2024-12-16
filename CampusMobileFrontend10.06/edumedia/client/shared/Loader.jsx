import React from 'react'
import { View } from 'react-native'
import LottiePlayer from './lottiePlayer'

function Loader({backgrounColor}) {
    return (
        <View style={{ width: '100%', height: '100%', position: 'relative' }}>
            <LottiePlayer src={require("../assets/animations/eduloader.json")} backgroundColor={ backgrounColor ? backgrounColor : "#141218"} style={{ width: '100%', height: '100%' }} autoPlay={true} loop={true} />
        </View>
    )
}

export default Loader