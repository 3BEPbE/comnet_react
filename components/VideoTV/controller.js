import React from 'react'
import {StyleSheet, Dimensions, View, Text, TouchableWithoutFeedback, Image} from 'react-native'
import  Slider  from '@react-native-community/slider';
import {converter, } from './videoHelper'
import { DrawerItem } from '@react-navigation/drawer';


const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

export const Controller = ({status,setControl,stopStyle,video,skipIcon}) => {
    
    const [sliderVal,setSliderVal] = React.useState(status.positionMillis)
    React.useEffect(()=>{
      if(stopStyle.opacity){
        setSliderVal(status.positionMillis)
      }
    },[stopStyle.opacity])

    React.useEffect(()=>{
      if(skipIcon.left.opacity){
        setSliderVal(()=>status.positionMillis-10000)
      }else if(skipIcon.right.opacity){
        setSliderVal(()=>status.positionMillis+10000)
      }
    },[skipIcon])

    const [isMute,setMute] = React.useState(false)
    
    React.useEffect(()=>{                           // when slider change complate,video loaded this time
      const  setSlider = async() =>{
        if(sliderVal!==status.positionMillis&& !skipIcon.left.opacity && !skipIcon.right.opacity){
          await video.current.setPositionAsync(sliderVal)
        }
      }
     setSlider()
     },[sliderVal])
  
    return(
        <>
         <View style={styles.buttons}>
          <Text style={styles.time}>{converter(status.positionMillis)}/{converter(status.durationMillis)}</Text>
          <View style={styles.leftSide}>
            <View style={{marginRight:16}}>
              <DrawerItem pressColor='#fff' style={{width:35,height:40,marginTop:-20}}  icon={()=>(  <Image source={isMute?require('../../images/sound0.png'):require('../../images/sound2.png')} style={styles.icon}/>)} label=''/>
              {/* <TouchableWithoutFeedback  onPress={()=>setMute((mute)=>!mute)}>
                <Image source={isMute?require('../../images/sound0.png'):require('../../images/sound2.png')} style={styles.icon}/>
              </TouchableWithoutFeedback> */}
            </View>      
          </View>
        </View>
        
        {stopStyle.opacity?<Slider
          value={sliderVal}
          style={styles.slider}
          minimumValue={0}
          maximumValue={status.durationMillis}
          minimumTrackTintColor="#ff4f12"
          maximumTrackTintColor="#fff"
          thumbTintColor='#fff'
          onValueChange={(sec)=>{setControl((a)=>!a);setSliderVal(sec)}}
     
        />:<></>}

        </>
    )
}

const styles = StyleSheet.create({
    time:{
        color:'#fff',
        marginTop:0,
        marginLeft:5
      },
      icon:{
        width:24,
        height:22,
        marginRight:0,
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