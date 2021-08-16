import {Text, View,Image,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
const { width: screenWidth } = Dimensions.get('window')

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
        height:80
    },
    header:{
        width:screenWidth-40
    },
    logo:{
        width:160,
        height:160/3.7,
        resizeMode:'contain',
        marginLeft:20,
        marginTop:20,
    }
   });