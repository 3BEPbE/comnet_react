import React from 'react';
import { View ,StyleSheet,Text,ImageBackground,Image} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
export default function BurgerMenu(props) {
    return(
        <View style={styles.content}>
            <DrawerContentScrollView {...props} >
                <ImageBackground style={styles.bcImage} source={require('../images/burgerMenu-bc.png')}>
                </ImageBackground>
                <DrawerItem {...props} style={styles.link} icon={()=>(
                    <Image style={styles.icon} source={require('../images/burgerMenuIcon1.png')
                }/>)} onPress={() => props.navigation.navigate('Watched')} inactiveTintColor ='#fff' label='Просмотреные'/>
            </DrawerContentScrollView>
            
        </View>
    )
}
const styles = StyleSheet.create({
   bcImage:{
        flex:1,
        height:145.38
    },
  content:{
    backgroundColor:'#242424',
    flex:1
  },
  link:{
      flex:1,
      marginTop:5
  },
  icon:{
      height:23,
      width:23
  }
 });