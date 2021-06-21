import React from 'react'
import {StyleSheet, Dimensions, View, Text, TouchableWithoutFeedback, Image} from 'react-native'
import  Slider  from '@react-native-community/slider';
import * as ScreenOrientation from 'expo-screen-orientation';
import {converter, openFullScreen, closeFullScreen} from './videoHelper'
import { Datas } from '../../context/context';


const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

export const Controller = ({status,fullScreen,setScreen,video,setControl,navigation}) => {
    const {setStatusHidden} = React.useContext(Datas)
    const [sliderVal,setSliderVal] = React.useState(0)
    const [isMute,setMute] = React.useState(false)
    let IntervalSlider = React.useRef()
    navigation.addListener('beforeRemove', e => {
      if(!fullScreen.headerShown){
        closeFullScreen(setScreen,setStatusHidden)
      }
    
    });
    React.useEffect(() => {                         // every 10 secund slider will be equal to video's time position
      IntervalSlider = setInterval(() => {
        setSliderVal(status.positionMillis)
      }, 10000);
      return () => clearInterval(IntervalSlider);
    }, []);

    React.useEffect(()=>{                           // when slider change complate,video loaded this time
     const  setSlider = async() =>{
        await video.current.setPositionAsync(sliderVal)
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
          <Text style={styles.time}>{converter(status.positionMillis)}/{converter(status.durationMillis)}</Text>
          <View style={styles.leftSide}>
            <View>
            <TouchableWithoutFeedback onPress={()=>setMute((mute)=>!mute)}>
                <Image source={isMute?require('../../images/sound0.png'):require('../../images/sound2.png')} style={styles.icon}/>
              </TouchableWithoutFeedback>
            </View>
            {/* <View>
              <TouchableWithoutFeedback onPress={()=>{}}>
                <Image source={require('../../images/settingIcon.png')} style={styles.icon}/>
              </TouchableWithoutFeedback>
            </View> */}
            <View style={{display:fullScreen.headerShown?'flex':'none'}}>
              <TouchableWithoutFeedback onPress={()=>{openFullScreen(setScreen,setStatusHidden)}}>
                <Image source={require('../../images/bigScreen.png')} style={styles.icon}/>
              </TouchableWithoutFeedback>
            </View>
            <View style={{display:fullScreen.headerShown?'none':'flex'}}>
              <TouchableWithoutFeedback onPress={()=>{closeFullScreen(setScreen,setStatusHidden)}}>
                <Image source={require('../../images/smallScreen.png')} style={styles.icon}/>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <Slider
          value={sliderVal}
          style={styles.slider}
          minimumValue={0}
          maximumValue={status.durationMillis}
          minimumTrackTintColor="#ff4f12"
          maximumTrackTintColor="#fff"
          thumbTintColor='#fff'
          onValueChange={()=>setControl((a)=>!a)}
          onSlidingComplete={(sec)=>{setSliderVal(sec)}}
        />

        </>
    )
}

const styles = StyleSheet.create({
    time:{
        color:'#fff',
        marginTop:5
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