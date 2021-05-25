import React from 'react';
import { View ,StyleSheet,Image} from 'react-native';
export default function LoadScreen(props) {
    setTimeout(()=>{
        props.navigation.navigate('BurgerNavigation')
    },2000)
    return(
        <View style={styles.background}>
            <Image source={require('../images/LoadingLogo.png')}/>
        </View>
    )
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        height:'100%',
        backgroundColor:'#1C1C1C',
        justifyContent:'center',
        alignItems:'center'
    }

  });