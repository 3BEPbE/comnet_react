
import React from 'react';
import {  Text, View ,StyleSheet} from 'react-native';
export default function SafeArea({children}) {

    return(
        <View style={styles.safeArea}> 
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        marginTop:20,
        backgroundColor: '#1C1C1C',
    },

  });