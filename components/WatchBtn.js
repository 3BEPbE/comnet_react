import React from 'react'
import {Text, View, StyleSheet, Dimensions} from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
const { width: screenWidth } = Dimensions.get('window')
const isTV = 900<screenWidth
const WatchBtn = ({isLogin,src,navigation}) =>{
   
    
    return(
        <>
        {isLogin?
        <DrawerItem pressColor='#fff' style={{zIndex:2}} label='' onPress={()=>navigation.navigate(isTV?'WatchingTV':'Watching',{vid:{uri:src},isChannel:false})} icon={()=> 
            (<View style={styles.button}>
                <Text style={styles.buttonText}>Смотреть</Text>
            </View>)} />
        : <DrawerItem pressColor='#fff' style={{zIndex:2,marginTop:20}}   label='' onPress={()=>navigation.navigate('Profile')} icon={()=> 
            (<View style={styles.button}>
                <Text style={styles.buttonText}>Приобрети подписку</Text>
            </View>)} />}
        </>
    )
}

export default WatchBtn

const styles = StyleSheet.create({
    button:{
        width:screenWidth-40,
        height:50,
        backgroundColor:'#E41A4B',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7,
        overflow:'hidden',
    },
    buttonText:{
        color:'#fff',
        fontSize:15
    },
})