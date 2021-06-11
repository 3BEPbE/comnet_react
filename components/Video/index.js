import { View ,StyleSheet,Dimensions,Image, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import { Video } from 'expo-av';
import {Controller} from './controller'
import {doubleClick} from './videoHelper'

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = 1000<screenWidth
const CustomVideoPlayer = ({fullScreen,setScreen}) => {
    const [isStop,setIsStop] = React.useState(true)
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [isClickControl,setControl] = React.useState(false)
    const [stopStyle,setStopStyle] = React.useState({
      opacity:1
    })
    const [skipIcon,setSkipIcon] = React.useState({
      left:{
        opacity:0
      },
      right:{
        opacity:0
      }
    })
    let doubleClickCounter = React.useRef(0)
    let removeClickTime = React.useRef()
    let timerRef = React.useRef(null);

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


    React.useEffect(()=>{
      clearTimeout(timerRef.current);
      setStopStyle({opacity:1})
      timerRef.current = setTimeout(()=>{
        if(status.isPlaying){
          setStopStyle({
            opacity:0
          })
        }
      },2000)
    },[isClickControl])
  return (
    <>
    <View style={styles.stopBlock}>
     
        <><View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableWithoutFeedback onPress={()=>{doubleClick('left',doubleClickCounter,removeClickTime,setSkipIcon,status,video)}}>
               <Image source={require('../../images/leftSkip.png')} style={{...skipIcon.left,...styles.leftButton,marginRight:fullScreen.headerShown?screenWidth/6:screenHeight/4}}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>setIsStop((last)=>!last)}>
              <View style={{...styles.shadow,...stopStyle}}>
                <Image style={styles.stop} source={isStop?require('../../images/startIcon.png'):require('../../images/Pause-button.png')}/>
              </View>   
            </TouchableWithoutFeedback>  
            <TouchableWithoutFeedback onPress={()=>{doubleClick('right',doubleClickCounter,removeClickTime,setSkipIcon,status,video)}}>
              <Image source={require('../../images/rightSkip.png')} style={{...skipIcon.right,...styles.RightButton,marginLeft:fullScreen.headerShown?screenWidth/6:screenHeight/4}}/>
            </TouchableWithoutFeedback>    
            
          </View>
        </>
    
    </View>
      <TouchableWithoutFeedback onPress={()=>{
        setControl((changed)=>!changed)
      }}>
        <View style={{...styles.bottomBar,...fullScreen.styleBar,...stopStyle}}>
          <Controller setControl={setControl} video={video} setScreen={setScreen} fullScreen={fullScreen} status = {status}/>
        </View>
      </TouchableWithoutFeedback>  
      <Video
        ref={video}
        style={{...styles.firstImage,...fullScreen.styleVideo}}
        source={{
          uri: 'http://mobi.mytube.uz/v9/D/Disc2/6e27e816-6e8e-40c8-9edd-7787c3096293_768.mp4?file=1',
        }}
        useNativeControls ={false}
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      </>

  );
}

export default CustomVideoPlayer

const styles = StyleSheet.create({
    firstImage:{
        display:'flex',
        flexDirection:'row',
        // height:isTV?screenHeight-300:screenWidth-150,
        // width:isTV?screenWidth:screenWidth,
        resizeMode:'cover',
        resizeMode:'cover',

   },

   bottomBar:{
     position:'absolute',
     width:'100%',
     height:isTV?(screenWidth-150)/9:60,
     zIndex:11,
     paddingLeft:20
   },
   
   stopBlock:{
     position:'absolute',
     top: 0, left: 0, right: 0, bottom: 0,
     justifyContent:'space-around',
     alignItems:'center',
     zIndex:11,
     width:'100%'
   },
   stop:{
    width:25,
    height:25
   },
   shadow:{
     width:50,
     height:50,
     backgroundColor:'#ffffff57',
     alignItems:'center',
     justifyContent:'center',
     borderRadius:50,
     overflow:'hidden'
   },
   leftButton:{
     width:40,
     height:25,
   },
   RightButton:{
    width:40,
    height:25,
  },
})
