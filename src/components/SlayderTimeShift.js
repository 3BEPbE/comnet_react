import React from 'react'
import {View,StyleSheet,Text,Dimensions} from 'react-native'
import  Slider  from '@react-native-community/slider';
import {Datas} from '../context'

const { width: screenWidth } = Dimensions.get('window')

export default function SliderTimeShift({setUri,setTimer,timeData,currentID,timer,setEvent,setPaused,sliderChange}){

    const {getTimeShift} = React.useContext(Datas)
    const [sliderVal,setSliderVal] = React.useState(()=>{
      if(timer){return timer}
    })
    React.useEffect(()=>{
      if(sliderChange){
        setSliderVal(sliderChange)
      }
    },[sliderChange])
    
    const changePosition  = async(sec) =>{
      setPaused({paused:false,work:true})
      const time = new Date().getTime()/1000
      if(sec>time){
        setSliderVal(time)
        return
      }
      setEvent((i)=>!i)
      setTimer(sec)
      const uri = await getTimeShift(currentID,timeData.pid,sec)
      setUri(uri.uri)
    }

    return(
        <>
          {timeData.begin_time?<Slider
          value={sliderVal}
          style={styles.slider}
       
          minimumValue={timeData.begin_time}
          maximumValue={timeData.end_time}
          minimumTrackTintColor="#ff4f12"
          maximumTrackTintColor="#fff"
          thumbTintColor='#fff'
          onValueChange={(sec)=>changePosition(sec)}
        />:<></>}
        </>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A'
 },
 slider:{
    width:screenWidth,
    height:15,
  }
});