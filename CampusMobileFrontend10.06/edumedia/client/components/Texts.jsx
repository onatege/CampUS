import { Text, StyleSheet } from 'react-native';

function TextDisplay({ children, color }) {
    return (
        <Text style={{color:color ? color : '#ffffff' , fontSize:36 , fontFamily:'GilroyEB'}}>
            {children}
        </Text>
    )
}

function TextHeadline({ children, color }) {
    return (
        <Text style={{color:color ? color : '#ffffff' , fontSize:30 , fontFamily:'RobotoR'}}>
            {children}
        </Text>
    )
}

function TextTitle({ children, color }) {
    return (
        <Text style={{color:color ? color : '#ffffff' , fontSize:24 , fontFamily:'RobotoR'}}>
            {children}
        </Text>
    )
}

function TextBody({ children, color }) {
    return (
        <Text style={{color:color ? color : '#ffffff' , fontSize:16 , fontFamily:'RobotoR'}}>
            {children}
        </Text>
    )
}

function TextLabel({ children , color}) {
    return (
        <Text style={{color:color ? color : '#000000' , fontSize:12 , fontFamily:'RobotoR', fontWeight:'900'}}>
            {children}
        </Text>
    )
}

export { TextDisplay, TextHeadline, TextTitle, TextBody, TextLabel } 