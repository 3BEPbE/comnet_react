import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Datas   } from '../context';
import AksiyaCarusel from '../components/AksiyaCarusel';
import Partners from '../components/Partners';

export default function Aksiya({navigation}){
    const {getData} = React.useContext(Datas)
    React.useEffect(()=>{
        getData('token')
    },[])
    return(
        <ScrollView style={styles.container}>
          <AksiyaCarusel/>
          <Partners/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A'
 },

});