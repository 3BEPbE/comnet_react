import React from 'react'
import { View, Text, StyleSheet,Dimensions,Image,Share } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import * as Linking from 'expo-linking';

const { width: screenWidth } = Dimensions.get('window')

const icons = [
    {
        image:require('../images/share1.png'),
        url:()=>Linking.openURL('https://www.instagram.com/comnet_uz/'),
    },
    {
        image:require('../images/share2.png'),
        url:()=>Linking.openURL('https://www.instagram.com/comnet_uz/'),
    },
    {
        image:require('../images/share3.png'),
        url:()=>Linking.openURL('https://www.instagram.com/comnet_uz/'),
    },
    {
        image:require('../images/share4.png'),
        url:()=>Linking.openURL('https://www.instagram.com/comnet_uz/'),
    },
    {
        image:require('../images/share5.png'),
        url:()=>Linking.openURL('https://www.instagram.com/comnet_uz/'),
    },
]

const Footer = () => {


    return(
        <View style={styles.container}>
            <Image source={require('../images/LogoFooter.png')} style={styles.logo}/>
            <Text style={styles.number}>71 205 85 55</Text>
            <View style={styles.share}>
                {icons.map((item,i)=>{
                    return(
                        <DrawerItem onPress={()=>item.url()} pressColor='#fff' style={styles.focus} key={i} label='' icon={()=>(
                            <View style={styles.shareItem} >
                                <Image source={item.image} style={styles.shareLogo}/>
                            </View>
                        )}/>
                    )
                })}
            </View>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container:{
        height:190,
        width:screenWidth-40,
        marginLeft:20,
        padding:10,
        marginTop:20
    },
    logo:{
        width:153,
        height:43,
        resizeMode:'stretch'
    },
    number:{
        color:'#fff',
        fontSize:24,
        marginTop:17
    },
    share:{
        flexDirection:'row',
        marginLeft:-10
    },
    shareItem:{
        width:30,
        height:30,
        backgroundColor:'#373737',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        marginLeft:-5

    },
    shareLogo:{
        height:18,
        width:18,
        resizeMode:'stretch'
    },
    focus:{
        width:35,
        marginLeft:8,
        padding:0,
        marginTop:20,
        marginHorizontal:0,
    }
})