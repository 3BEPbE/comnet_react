import React from 'react'
import {View,StyleSheet,Text,Dimensions} from 'react-native'
import  Slider  from '@react-native-community/slider';
const { width: screenWidth } = Dimensions.get('window')

export default function SliderTimeShift({time}){
    const [sliderVal,setSliderVal] = React.useState(0)

    return(
        <>
            {time?<Slider
          value={sliderVal}
          style={styles.slider}
          minimumValue={0}
          maximumValue={time.end_time-time.begin_time}
          minimumTrackTintColor="#ff4f12"
          maximumTrackTintColor="#fff"
          thumbTintColor='#fff'
          onValueChange={(sec)=>setSliderVal(sec)}
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