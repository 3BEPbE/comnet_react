import React from 'react'
import {View,StyleSheet,Text,Dimensions,Image} from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { HeaderTV } from '../components/HeaderTv';
import BigCardCarusel from '../components/BigCardCarusel';
import { DrawerItem } from '@react-navigation/drawer';
import BigJanrCarusel from '../components/BigJanrCarusel';
const { width: screenWidth } = Dimensions.get('window')

export default function SmartTV({navigation}){

    return(
        <ScrollView style={styles.container}>
            <HeaderTV navigation={navigation}/>
            <TouchableWithoutFeedback><></></TouchableWithoutFeedback>
            <BigCardCarusel/>
            <BigJanrCarusel/>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A'
 },
});