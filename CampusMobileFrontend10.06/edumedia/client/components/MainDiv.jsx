import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';

const initialLayout = { width: Dimensions.get('window').width };



function MainDiv({children}) {
  return (
    <View style={styles.container}>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#141218',
      width:initialLayout,
      height:'100%',
      paddingHorizontal:16,
      paddingTop:64,
      paddingBottom:16,
      flexDirection:'column',
      display:'flex',
      position:'relative'
    }
  });

export default MainDiv