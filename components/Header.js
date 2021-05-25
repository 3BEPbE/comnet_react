import {TouchableHighlight,Text,Image, View} from 'react-native'
import HeaderStyle from '../styles/headerStyle'
import React from 'react'
export const options = {
        title:'',
        headerStyle:HeaderStyle.header,
}

export const HeaderLeft = ({navigation}) => (

        <TouchableHighlight  onPress={() => navigation.navigate('Home')}>
            <Text style={HeaderStyle.headerButton}>Главная</Text>
        </TouchableHighlight>
)
export const HeaderRight = ({navigation}) => (
    <TouchableHighlight onPress={() =>  navigation.openDrawer()}>
            <View style={HeaderStyle.burger}>
                <View style={HeaderStyle.burgerItem}></View>
                <View style={HeaderStyle.burgerItem}></View>
                <View style={HeaderStyle.burgerItem}></View>
            </View>
        </TouchableHighlight>
)
export const HeaderCenter = ({navigation}) => (
    <View >
    <TouchableHighlight style={HeaderStyle.searchbarBlock}  onPress={() => console.log('a')}>
        <Image source={require('../images/burgerSearchbar.png')} style={HeaderStyle.searchBarIcon}/>
    </TouchableHighlight>
    </View>
)