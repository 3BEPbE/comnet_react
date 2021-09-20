import React from "react";
import { Text,StyleSheet,ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import BigCarusel from "../componentsPhone/BigCarusel";
import CardCarusel from "../componentsPhone/CardCarusel";
import ChannelCarusel from "../componentsPhone/ChannelCarusel";
import { Datas } from "../context";

const MainMenu = ({navigation}) =>{

    const {checkToken,isLogin} = React.useContext(Datas)

    React.useEffect(()=>{
        checkToken(navigation)
    },[])

    return(
        <ScrollView style={styles.page}>
            <BigCarusel navigation={navigation}/>
            <TouchableWithoutFeedback onPress={()=>{isLogin?navigation.navigate('Channels'):''}}>
                <Text style={styles.name}>Телеканалы </Text>
            </TouchableWithoutFeedback> 
            <ChannelCarusel condition={1}/>
            <ChannelCarusel condition={2}/>
            <CardCarusel params={{season:0}} condition={'Фильмы'}/>
            <CardCarusel params={{season:1}} condition={'Сериалы'}/>
            <CardCarusel params={{gid:10}} condition={'Мультфильмы'}/>
        </ScrollView>
    )
}


export default MainMenu

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor:'#010101'
    },
    name:{
        color:'#fff',
        marginLeft:10,
        marginTop:10,
        fontSize:20
    },
  });