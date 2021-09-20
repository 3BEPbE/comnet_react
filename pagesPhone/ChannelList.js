import React from "react";
import { Text,StyleSheet,Dimensions,View, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Datas } from "../context";
import ListChannels from "../componentsPhone/ListChannels";

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

const ChannelList = ({navigation}) =>{

    const {checkToken,isLogin} = React.useContext(Datas)

    React.useEffect(()=>{
        checkToken(navigation)
    },[])
    return(
        <View style={styles.page}>
            <View style={styles.firstBlock}>
                <Text style={styles.title}>ТВ-каналы</Text>
                <TouchableWithoutFeedback>
                    <Image style={styles.filterBtn} source={require('../images/filterTV.png')}/>
                </TouchableWithoutFeedback>
            </View>
            <ListChannels navigation={navigation}/>
        </View>
    )
}


export default ChannelList

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor:'#010101'
    },
    firstBlock:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:screenWidth-40,
        marginLeft:20,
        marginTop:10,
        height:50,
        alignItems:'center'
    },
    title:{
        color:'#fff',
        fontSize:20
    },
    filterBtn:{
        height:40,
        width:40,
        resizeMode:'contain'
    }
  });