import { View ,StyleSheet,Dimensions,Image, TouchableWithoutFeedback,ActivityIndicator} from 'react-native';
import React from 'react';
import { Video } from 'expo-av';
import {Controller} from './controller'
import {doubleClick} from './videoHelper'
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerItem } from '@react-navigation/drawer';
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = 1000<screenWidth
const CustomVideoPlayer = ({data,setData, url,timer,setTimer}) => {

  const [isStop,setIsStop] = React.useState(true)
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [stopStyle,setStopStyle] = React.useState({
    opacity:1
  })
  let timerRef = React.useRef(null);
  const [isClickControl,setControl] = React.useState(false)

  React.useEffect(()=>{
    video.current.playAsync()
  },[video])
    
  React.useEffect(()=>{
    const interval = setInterval(() => {
      if(status.isPlaying){
        setTimer((i)=>i+1)
      }
    }, 1000);
    return () => clearInterval(interval);
  },[status.isPlaying])

  React.useEffect(()=>{
    clearTimeout(timerRef.current);
    setStopStyle({opacity:1})
    timerRef.current = setTimeout(()=>{
      if(status.isPlaying){
        setStopStyle({
          opacity:0
        })
      }
    },3500)
  },[isClickControl])



  React.useEffect(()=>{ 
    if(isStop){
      video.current.pauseAsync()
      clearTimeout(timerRef.current);
      setStopStyle({opacity:1})
    }else{
      video.current.playAsync()
      timerRef.current = setTimeout(()=>{
      setStopStyle({
        opacity:0
      })
    },2000)}
    
  },[isStop])


    let isLoad = status.isBuffering&&isStop
  return (
    <>
     <View style={{...styles.loadIcon,display:isLoad?'flex':'none'}}>
        <ActivityIndicator style={{display:isLoad?'flex':'none'}} size="large" color="#fff" />
     </View>
   
    <View style={styles.stopBlock}>
            <DrawerItem onPress={()=>setIsStop(i=>!i)} pressColor='#fff'  style={{width:75,height:75}} label='' icon={()=>(
               <View style={{...styles.shadow,...stopStyle}}>
               <Image style={styles.stop} source={isStop?require('../../images/startIcon.png'):require('../../images/Pause-button.png')}/>
              </View>  
            )}/> 
    </View>
    <TouchableWithoutFeedback onPress={()=>{setControl((changed)=>!changed)}}>
       <View style={{...styles.bottomBar,...stopStyle}}>
         <Controller timer={timer} setTimer={setTimer} data={data} setData={setData} isClickControl={isClickControl} stopStyle={stopStyle}  setControl={setControl} video={video} status = {status}/>
       </View>
     </TouchableWithoutFeedback>
    <Video
          ref={video}
          rate={1}
          style={styles.firstImage}
          source={{
            uri:url,
            overrideFileExtensionAndroid :'m3u8'
          }}
          useNativeControls ={false}
          resizeMode='stretch'
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </>

  );
}

export default CustomVideoPlayer

const styles = StyleSheet.create({
  firstImage:{
    width:screenWidth,
    height:screenHeight,
    zIndex:3,
 },
 bottomBar:{
   position:'absolute',
   width:screenWidth,
   height:isTV?50:60,
   zIndex:11,
   right:0,
   bottom:0
 },
 
 stopBlock:{
   position:'absolute',
   flexDirection:'column',
   top: 0, left: 0, right: 0, bottom: 0,
   justifyContent:'space-around',
   alignItems:'center',
   zIndex:11,
 },
 stop:{
  width:25,
  height:25,
 },
 shadow:{
   width:60,
   height:60,
   backgroundColor:'#ffffff57',
   alignItems:'center',
   justifyContent:'center',
   borderRadius:50,
   overflow:'hidden',
 },
 leftButton:{
   width:50,
   height:25,
 },
 RightButton:{
  width:50,
  height:25,
},
skipBloack:{
  alignItems:'center',
  justifyContent:'center',
  width:300,
  height:300, 
  zIndex:12,
  justifyContent:'center',
  alignItems:'center',
},
loadIcon:{
   position:'absolute',
   top: 0, left: 0, right: 0, bottom: 0,
   justifyContent:'space-around',
   alignItems:'center',
   zIndex:11,
}
})