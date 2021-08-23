import React from 'react'
import {View,StyleSheet,Text,PermissionsAndroid} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderTV } from '../components/HeaderTv';
import  MenuTV  from '../components/MenuTV';
import { Datas   } from '../context';


export default function HomeTV({navigation}){
    const {getData,checkToken} = React.useContext(Datas)



      
    return(
        <View style={styles.container}>
            <HeaderTV navigation={navigation}/>
            <MenuTV navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A'
 },

});