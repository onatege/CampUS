import React from 'react'
import { View, StyleSheet } from 'react-native';


function SkeletonDiv({children}) {
  return (
    <View style={styles.container}>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#141218',
      width:'100%',
      height:'100%',
      flexDirection:'column',
      display:'flex',
      gap:32
    }
  });

export default SkeletonDiv