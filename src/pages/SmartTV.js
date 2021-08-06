import React from 'react'
import {View,StyleSheet,Text,Dimensions,Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderTV } from '../components/HeaderTv';
import BigCardCarusel from '../components/BigCardCarusel';
import { DrawerItem } from '@react-navigation/drawer';
import { Datas } from '../context';
import { converter } from '../helper';
import { width } from '../helper';
const { width: screenWidth } = Dimensions.get('window')
let isTV = screenWidth>950

export default function SmartTV({navigation}){

    const {getChannel} = React.useContext(Datas)
    const [data,setData] = React.useState()

    React.useEffect(()=>{
        const fetch=async()=>{
            const data = await getChannel()
            setData(data)
        }
        fetch()
    },[])

    return(
        <ScrollView style={styles.container}>
            <HeaderTV navigation={navigation}/>
            <BigCardCarusel/>
            <View style={styles.headline}>
            <Text style={styles.title}>TV-channels</Text>
            <DrawerItem pressColor='#fff' style={styles.filterFocus} label=''  icon={()=><Image style={styles.filterImg} source={require('../images/filterTV.png')}/>}/>
            </View>
            <View style={styles.channelContainer}>

                {data?data.map((item,i)=>(
                    <DrawerItem onPress={()=>navigation.navigate('PlayerTV',{current:item,all:data})} key = {i} pressColor='#fff' style={styles.itemFocus} icon={()=> <View style={styles.item}>
                    <View style={styles.block1}>
                        <Image source={{uri:item.icon}} style={styles.channelPic}/>
                    </View>
                    <View style={styles.block2}>
                        <Text style={styles.channelText1}>{item.program_name}</Text>
                        <Text style={styles.channelText2}>{converter(item.program_begin_time)}-{converter(item.program_end_time)}</Text>
                        <View style={{width:(screenWidth-40)/2-110,height:3,backgroundColor:'#C4C4C4'}}>
                            <View style={{width:width(item.program_begin_time,item.program_end_time,((screenWidth-40)/2-110)),height:3,backgroundColor:'#E41A4B'}}></View>
                        </View>
                    </View>
                </View>} label = ''/>
                )):<></>}
               
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A'
 },
 title:{
    color:'#fff',
    fontSize:22
},
headline:{
    flexDirection:'row',
    width:screenWidth-40,
    marginLeft:20,
    justifyContent:'space-between'
},
filterImg:{
    width:40,
    height:40
},
filterFocus:{
    marginHorizontal:0,
    marginVertical:0,
    width:56
},
channelContainer:{
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-between',
    width:screenWidth-40,
    marginLeft:20,
    marginTop:20

},
item:{
    width:(screenWidth-40)/2-18,
    height:80, 
    backgroundColor:'#1C1C1C',
    borderRadius:7,
    flexDirection:'row',
},
itemFocus:{
    width:(screenWidth-40)/2,
    marginVertical:0,
    marginHorizontal:0
},
block1:{
    width:100,
    height:'100%',
    backgroundColor:'#fff',
    borderRadius:7,
    alignItems:'center',
    justifyContent:'center'

},
block2:{
    justifyContent:'center',
    marginLeft:20

},
channelPic:{
    width:65,
    height:65,
    resizeMode:'contain'
},
channelText1:{
    color:'#fff',
    fontSize:18,
},
channelText2:{
    color:'#fff',
    fontSize:16,
}
});