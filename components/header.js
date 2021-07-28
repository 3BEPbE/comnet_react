import {Text, View,Image } from 'react-native'
import HeaderStyle from '../styles/headerStyle'
import React from 'react'
import { DrawerItem } from '@react-navigation/drawer'
export const options = {
        title:'',
        headerStyle:HeaderStyle.header,
}

export const HeaderRight = ({navigation}) => (

        <DrawerItem pressColor='#fff' style={{width:95,padding:0}} label='' icon={()=>(
            <Text style={HeaderStyle.headerLink}>Главная</Text>
        )}  onPress={() => navigation.navigate('Home')} />
            
      
)
export const HeaderLeft = ({navigation}) => {
    return(
    <View style={{flexDirection:'row',alignItems:'center'}}>
        <DrawerItem  pressColor='#fff' activeBackgroundColor='#1c1e21'  style={{width:40,height:40}} onPress={() =>  {navigation.openDrawer()}} label='' icon={()=>( 
            <View acceptsKeyboardFocus={true} onFocus={() => setFocused(true)} style={HeaderStyle.burger} >
                <View style={HeaderStyle.burgerItem}></View>
                <View style={HeaderStyle.burgerItem}></View>
                <View style={HeaderStyle.burgerItem}></View>
            </View>)}/>
            <DrawerItem  pressColor='#fff' style={{marginHorizontal:0,width:130,marginTop:-15}} label='' icon={()=>( <Image style={{width:112,height:32}} source={require('../images/logo.png')}/>)}  onPress={() => navigation.navigate('Home')}/>
    </View> 
    
)}
export const HeaderCenter = ({navigation}) => (
    <View  style={HeaderStyle.searchbarBlock}>
      <DrawerItem  pressColor='#fff' style={{width:35}} label='' icon={()=>(<Image source={require('../images/burgerSearchbar.png')} style={HeaderStyle.searchBarIcon}/>)}  onPress={() => navigation.navigate('Search')}/>
    </View>
)