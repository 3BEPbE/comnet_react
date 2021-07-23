import React from 'react'
import {StyleSheet, Dimensions, View, Text, TouchableWithoutFeedback, Image} from 'react-native'
import  Slider  from '@react-native-community/slider';
import {converter, } from './videoHelper'



const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

export const Controller = ({status,setControl,stopStyle,data,setData,timer,setTimer,video}) => {
    
    const [sliderVal,setSliderVal] = React.useState(status.positionMillis)
    React.useEffect(()=>{
      if(stopStyle.opacity){
        setSliderVal(timer)
      }
    },[stopStyle.opacity])

    //console.log(timer)
    const [isMute,setMute] = React.useState(false)
    
    React.useEffect(()=>{                           // when slider change complate,video loaded this time
      const  setSlider = async() =>{
        if(sliderVal!==timer){
          setTimer(sliderVal)
          setData((i)=>{
            const newData = {...i}
            newData.position = sliderVal+i.begin_time
            return newData
          })
        }
      }
     setSlider()
     },[sliderVal])

     React.useEffect(()=>{
      setControl((change)=>!change)
      video.current.setIsMutedAsync(isMute)
    },[isMute])
  
    return(
        <>
         <View style={styles.buttons}>
          <Text style={styles.time}>{converter(data.begin_time)}/{converter(data.end_time)}</Text>
          <View style={styles.leftSide}>
            <View>
            <TouchableWithoutFeedback onPress={()=>setMute((mute)=>!mute)}>
                <Image source={isMute?require('../../images/sound0.png'):require('../../images/sound2.png')} style={styles.icon}/>
              </TouchableWithoutFeedback>
            </View>      
          </View>
        </View>

        {stopStyle.opacity?<Slider
          value={sliderVal}
          style={styles.slider}
          minimumValue={0}
          maximumValue={data.end_time-data.begin_time}
          minimumTrackTintColor="#ff4f12"
          maximumTrackTintColor="#fff"
          thumbTintColor='#fff'
          onValueChange={()=>setControl((a)=>!a)}
          onSlidingComplete={(sec)=>{setSliderVal(sec)}}
        />:<></>}

        </>
    )
}

const styles = StyleSheet.create({
    time:{
        color:'#fff',
        marginTop:5,
        marginLeft:5
      },
      icon:{
        width:24,
        height:22,
        marginRight:20,
        resizeMode:'contain'
      },
      buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1
      },
      leftSide:{
        flexDirection:'row',
        marginTop:5
      },
      slider:{
        width:'100%',
        height:20,
        marginLeft:-10,
        marginBottom:10
      }
})