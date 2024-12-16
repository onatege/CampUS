import React from 'react';
import { View, Modal, Pressable, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const CustomDialog = ({
    visible,
    onClose,
    children,
    isCloseButtonDisplayed,
    backgroundColor
}) => {
    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={visible}
            onRequestClose={onClose}

        >
            <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.4, position: 'absolute', top: 0, left: 0 }} />
            <View style={{ width: '100%', height: 'auto', borderWidth: 0.8, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: backgroundColor ? backgroundColor : 'white', position: 'absolute', bottom: 0, padding:32, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'gray' }}>
                <Pressable onPress={onClose} style={isCloseButtonDisplayed === true ? { position: 'absolute', top: '5%', right: '10%', display: 'flex' } : { position: 'absolute', top: '2%', left: '5%', display: 'none' }} >
                    <Ionicons name="close-circle-outline" style={{color:'gray'}} size={30} />
                </Pressable>
                <ScrollView style={{ width: '100%', height: '100%', marginTop: '10%' }}>
                    {children}
                </ScrollView>
            </View>
        </Modal>
    );
};

export default CustomDialog;


