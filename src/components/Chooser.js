import React from 'react'
import {View,StyleSheet,Text,Dimensions,Image} from 'react-native'
import { DrawerItem } from '@react-navigation/drawer';

const { width: screenWidth } = Dimensions.get('window')

export default function Chooser({pos}){

    return(
        <View style={styles.container}>
              <View style={{...styles.item,backgroundColor:pos.main==='category'&&pos.index===1?'#E41A4B':'#1C1C1C'}}>
                    <Text style={styles.text}>Фильмы</Text>
                </View>
                <View style={{...styles.item,backgroundColor:pos.main==='category'&&pos.index===2?'#E41A4B':'#1C1C1C'}}>
                    <Text style={styles.text}>Сериалы</Text>
                </View>
                <View style={{...styles.item,backgroundColor:pos.main==='category'&&pos.index===3?'#E41A4B':'#1C1C1C'}}>
                    <Text style={styles.text}>Мультфильмы</Text>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
 container:{
    marginLeft:20,
    marginTop:20,
    flexDirection:'row',
    width:370,
    justifyContent:'space-around'
 },
 focus1:{
    marginHorizontal:0,
    marginVertical:0,
    width:105
 },
 focus2:{
    marginHorizontal:0,
    marginVertical:0,
    width:110
 },
 focus3:{
    marginHorizontal:0,
    marginVertical:0,
    width:150
 },
 item:{
  justifyContent:'space-between',
  padding:15,
  borderRadius:7
 },
 text:{
     color:'#fff',
     fontSize:15
 },
 line:{
     height:2,
     width:'100%',
     backgroundColor:'#fff',
     borderRadius:7
 }
});