import React from 'react'
import {View,StyleSheet,Text,Dimensions,Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderTV } from '../components/HeaderTv';
import BigCardCarusel from '../components/BigCardCarusel';
import { DrawerItem } from '@react-navigation/drawer';
const { width: screenWidth } = Dimensions.get('window')

export default function SmartTV({navigation}){

    return(
        <ScrollView style={styles.container}>
            <HeaderTV navigation={navigation}/>
            <BigCardCarusel/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A'
 },
});