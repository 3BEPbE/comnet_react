import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderTV } from '../components/HeaderTv';
import  MenuTV  from '../components/MenuTV';
import { Datas   } from '../context';

export default function HomeTV({navigation}){
    const {getData} = React.useContext(Datas)
    React.useEffect(()=>{
        getData('token')
    },[])
    return(
        <ScrollView style={styles.container}>
            <HeaderTV navigation={navigation}/>
            <MenuTV navigation={navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A'
 },

});