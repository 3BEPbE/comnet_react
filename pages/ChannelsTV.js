import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderTV } from '../components/HeaderTv';
import BigCardCarusel from '../components/BigCardCarusel';
import { Datas } from '../context';


export default function ChannelTV({navigation}){
    

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
 }
});