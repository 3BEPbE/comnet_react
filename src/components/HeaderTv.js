import {Text, View,Image,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

export const HeaderTV = ({navigation}) => {

    return(
        <View style={styles.container}>
            <View style={styles.heaader}>
                    <Image style={styles.logo} source={require('../images/logo.png')}/> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#1C1C1C',
        height:screenHeight/100*10,
        justifyContent:'center'
    },
    header:{
        width:screenWidth-40,

    },
    logo:{
        width:160,
        height:screenHeight/100*10-20,
        resizeMode:'contain',
        marginLeft:20,
    }
   });