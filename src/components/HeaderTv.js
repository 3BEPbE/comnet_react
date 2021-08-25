import {Text, View,Image,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import { DrawerItem } from '@react-navigation/drawer'
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

export const HeaderTV = ({navigation,main,pos}) => {

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                    <Image style={styles.logo} source={require('../images/logo.png')}/> 
                   {main? <View style={{...styles.searchBlock,backgroundColor:pos.main==='search'?'#E41A4B':'transparent'}}><Image style={styles.search} source={require('../images/burgerSearchbar.png')}/></View>:<></>}
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
    search:{
        width:25,
        height:25,
        resizeMode:'cover'  
    },
    header:{
        width:screenWidth-40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:20
    },
    logo:{
        width:160,
        height:screenHeight/100*10-20,
        resizeMode:'contain',
    },
    searchFocus:{
        marginHorizontal:0,
        marginVertical:0,
        width:45
    },
    searchBlock:{
        borderRadius:7,
        overflow:'hidden',
        padding:3,
        alignItems:'center',
        justifyContent:'center'
    }
   });