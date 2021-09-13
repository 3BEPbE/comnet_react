import React from 'react'
import {View,StyleSheet,Text,Dimensions,Image} from 'react-native'
import { converter } from '../helper'
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

export default function ChannelList({timeData,data,id}){
    const [item,setItem] = React.useState()
    const timerRef = React.useRef()
    React.useEffect(()=>{
        if(timeData.begin_time&&id&&data){
            const item = data.filter((item)=>item.id === id)
            setItem(item[0])
        }
    },[data,id,timeData.begin_time])

    React.useEffect(()=>{
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(()=>{ 
            setItem(false)
        },5000)

    },[id])
    return(
        <>
       {item? <View style={styles.container}>
            <View   View style={styles.block1}><Image style={styles.logo} source={{uri:item.icon.replace('http','https')}}/></View>
            <View style={styles.block2}>
              <Text style={styles.programName}>{timeData.name.length>14?`${timeData.name.slice(0,14)}...`:timeData.name}</Text>
              <Text style={styles.programName}>{`${converter(timeData.begin_time)}:${converter(timeData.end_time)}`}</Text>
            </View>
        </View>:<></>}
        </>
    )
}

const styles = StyleSheet.create({
 container:{
    width:screenWidth/5,
    height:50,
    left:20,
    top:20,
    position:'absolute',
    zIndex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#27272794',
    borderRadius:7,
    overflow:'hidden'
 },
 item:{
    width:screenWidth/5-30,
    height:50,
    backgroundColor:'red',
    borderRadius:7,
    overflow:'hidden'
 },
 block1:{
    width:60,
    height:'100%',
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:7,
    overflow:'hidden'
},
logo:{
    width:50,
    height:50,
    resizeMode:'contain'
},
block2:{
    height:50,
    alignItems:'center',
    width:screenWidth/1.8/2-15-60,
    justifyContent:'center'
},
programName:{
    color:'#fff',
    width:screenWidth/1.8/2-15-70,
    marginLeft:5
},
});