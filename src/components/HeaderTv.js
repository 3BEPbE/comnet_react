import {Text, View,Image,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import { DrawerItem } from '@react-navigation/drawer'
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
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#1C1C1C',
        alignItems:'center',
        height:80
    },
    header:{
        marginLeft:20,
        marginTop:40,
        width:screenWidth-40
    },
    logo:{
        width:160,
        height:160/3.7,
        resizeMode:'contain'
    }
   });