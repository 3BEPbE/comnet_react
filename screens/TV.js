import React from 'react';
import { View ,StyleSheet,Text, Dimensions, ScrollView,Image} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer'
import { Datas } from '../context/context';
const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth>950

export default function TV(props) {

    const {checkToken,isLogin,getChannel} = React.useContext(Datas)

    const [data,setData] = React.useState([])

    React.useEffect(()=>{
        if(!isLogin){
            props.navigation.navigate('Home')
        }
    },[isLogin])

    React.useEffect(()=>{
        const fetch = async () => {
            checkToken()
            const data = await getChannel()
            setData(data)
            
        }
        fetch()
    },[])

    const converter = (sec)=>{
        var d = new Date(sec*1000+5*60*1000*60);
        var time = d; 
        let hour = `${time.getUTCHours()}`.length===1?`0${time.getUTCHours()}`:time.getUTCHours()
        let minute =  `${time.getUTCMinutes()}`.length===1?`0${time.getUTCMinutes()}`:time.getUTCMinutes()
        return [`${hour}:${minute}`,]
    }

    return(
        <ScrollView style={styles.Container}>
               <View  style={styles.listBlock}>
                {data ? data.map((item,i)=>(
                        <DrawerItem onPress={()=>{props.navigation.navigate('Channel', item)}}  key={i} style={styles.listFocus}  label='' icon={()=>(
                            <View style={styles.listItem}>
                                <View style={{width:85,height:85,backgroundColor:'#fff'}}><Image resizeMode='cover'style={styles.icon} source={{uri:item.icon}}/></View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                    <Text style={{...styles.tvInfo,width:40}}>{converter(item.program_begin_time)}</Text>
                                    <Text style={styles.tvInfo}>{item.program_name}</Text>
                                    <Text style={styles.tvData}>{converter(item.program_end_time)}</Text>
                                </View>
                            </View>)}/>
                    )):<></>}
                </View>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
     Container:{
        flex:1,
        backgroundColor:'#1C1C1C',
    },
    listBlock:{
        marginTop:20
    },
    listItem:{
        height:85,
        marginTop:-6,
        marginBottom:-6,
        marginRight:0,
        backgroundColor:'#373737',
        width:isTV?screenWidth-90:screenWidth-40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    icon:{
        height:85,
        width:85,
        resizeMode:'center'
      
    },
    listFocus:{
        marginTop:0,
        marginBottom:0,
        marginRight:0,
    },

    tvInfo:{
        color:'#BCBCBC',
        width:isTV?'auto':165,
        marginLeft:10
    },
    tvData:{
        color:'#BCBCBC',
        marginLeft:0,
        marginRight:20
    }

  });