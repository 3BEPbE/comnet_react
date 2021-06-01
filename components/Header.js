import {TouchableHighlight,Text,Image, View,TouchableOpacity } from 'react-native'
import HeaderStyle from '../styles/headerStyle'
import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
export const options = {
        title:'',
        headerStyle:HeaderStyle.header,
}

export const HeaderRight = ({navigation}) => (

        <TouchableHighlight  onPress={() => navigation.navigate('Home')}>
            <Text style={HeaderStyle.headerLink}>Главная</Text>
        </TouchableHighlight>
)
export const HeaderLeft = ({navigation}) => {
    return(
    <DrawerItem activeBackgroundColor='#1c1e21'  style={{width:40,height:40}} onPress={() =>  navigation.openDrawer()} label='' icon={()=>( 
        <View acceptsKeyboardFocus={true} onFocus={() => setFocused(true)} style={HeaderStyle.burger} >
            <View style={HeaderStyle.burgerItem}></View>
            <View style={HeaderStyle.burgerItem}></View>
            <View style={HeaderStyle.burgerItem}></View>
        </View>)}/>
       
    
)}
export const HeaderCenter = ({navigation}) => (
    <View  style={HeaderStyle.searchbarBlock}>
    <TouchableHighlight  onPress={() => navigation.navigate('Search')}>
        <Image source={require('../images/burgerSearchbar.png')} style={HeaderStyle.searchBarIcon}/>
    </TouchableHighlight>
    </View>
)