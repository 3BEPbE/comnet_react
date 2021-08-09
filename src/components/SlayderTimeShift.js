import React from 'react'
import {View,StyleSheet,Text,Dimensions} from 'react-native'
import  Slider  from '@react-native-community/slider';
import {Datas} from '../context'

const { width: screenWidth } = Dimensions.get('window')

export default function SliderTimeShift({setUri,setTimer,timeData,currentID,timer}){

    const {getTimeShift} = React.useContext(Datas)
    const [sliderVal,setSliderVal] = React.useState(()=>{
      if(timer){return timer}
    })
    
    const changePosition  = async(sec) =>{
      setTimer(sec)
      const uri = await getTimeShift(currentID,timeData.pid,timeData.current_time+sec)
      setUri(uri.uri)
    }





    return(
        <>
            {timeData.begin_time?<Slider
          value={sliderVal}
          style={styles.slider}
          minimumValue={0}
          maximumValue={timeData.end_time-timeData.begin_time}
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
    width:screenWidth/1.5,
    height:20,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  }
});