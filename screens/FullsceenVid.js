import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image, TouchableWithoutFeedback} from 'react-native';
import { Video } from 'expo-av'
import { Datas } from '../context/context';
import {converter} from '../components/Video/timeHelper'

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = 900<screenWidth
export default function FullScreen(props) {
    const { checkToken} =React.useContext(Datas)
    React.useEffect(()=>{
        checkToken(props.navigation)
    },[])
    const video = React.useRef(null);
    const [status, setStatus] = React.useState(props.route.params.status);
    const [isPausedStyle,setisPaused] = React.useState({style:{opacity:1}})
    React.useEffect(()=>{
       const setData = async()=>{
        if(typeof video.current.pauseAsync !== 'undefined'){
        if(status.isPlaying){
         await video.current.playAsync()
        }else{
           await video.current.stopAsync()
        }
       await video.current.setVolumeAsync(status.volume)
       await video.current.setPositionAsync(status.positionMillis)}
    }
    setData()
    },[video])
    

 
    React.useEffect(()=>{
        if(status.isPlaying){
            setisPaused({
                style:{opacity:1},
                status:'paused'
            })
            setTimeout(()=>{
                if(isPausedStyle.status === 'playing'){ 
                    setisPaused({
                        style:{opacity:0},
                        status:'playing'
                    })
                }
            },2000)  
        }else{
            setisPaused({
                style:{opacity:1},
                status:'pause'
            })
        }     
    },[status.isPlaying])
    

    return(
        <View style={styles.block}>   
        <Video
            ref={video}
            style={styles.firstImage}
            source={{
            uri: 'http://cache.mytube.uz/v9/D/Disc2/480b1952-e6fd-4092-8501-5abddaff7f9b_768.mp4?file=1',
        }}
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
       <View style={{...styles.videoStart,display:isTV?'none':'flex'}}>
           <TouchableWithoutFeedback  onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}>
                <View style={isPausedStyle.style && {...styles.startButton,...isPausedStyle.style}}>
                <Image source={status.isPlaying ? require('../images/Pause-button.png'):require('../images/startIcon.png')} style={styles.startIcon}/>
                </View>
                
            </TouchableWithoutFeedback>
       </View>
      <View style={styles.bottomBar}>
            <View style={{...styles.controllersTV,display:isTV?'flex':'none'}}>
                <Image source={require('../images/startIcon.png')} style={styles.startIconTV}/>
                <View style={styles.listBtnTV}>
                    <View style={styles.soundTV}></View>
                    <View style={styles.settingTV}></View>
                    <View style={styles.fullScreenTV}></View>
                </View>
            </View>
            <View style={{...styles.controllers,display:isTV?'none':'flex'}}>
                <Text style={styles.time}>{status && converter(status.positionMillis)} / {status && converter(status.durationMillis)}</Text>
                <View style={styles.listBtn}>
                    <TouchableWithoutFeedback onPress={()=>console.log(status)}><Image source={require('../images/sound1.png')} style={styles.sound}/></TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>video.current.presentFullscreenPlayer()}><Image source={require('../images/bigScreen.png')} style={styles.setting}></Image></TouchableWithoutFeedback>
                </View>
            </View>
      </View>
    </View>
        
    )
}
const styles = StyleSheet.create({
    firstImage:{
        display:'flex',
        flexDirection:'row',
        height:isTV?screenHeight:screenWidth-150,
        width:isTV?screenWidth:screenWidth,
        resizeMode:'cover',
        marginBottom:20,
        resizeMode:'cover'

   },
   block:{
    height:isTV?screenHeight-40:screenWidth-150,
    width:isTV?screenWidth:screenWidth,
   },
   bottomBar:{
    height:isTV?screenHeight/5:screenWidth/8,
    width:isTV?screenWidth:screenWidth,
    position:'absolute',
    bottom:9,
    justifyContent:'center',

   },
   startIconTV:{
       width:40,
       height:40,
       marginLeft:10,
       display:isTV?'flex':'none'
   },
   startIcon:{
    width:30,
    height:30,
   },
   controllersTV:{
       flexDirection:'row',
       justifyContent:'space-between'
   },
   listBtnTV:{
        flexDirection:'row',
        marginRight:20
   },
   soundTV:{
        width:40,
        height:40,
        backgroundColor:'#fff',
        marginRight:20
   },
   settingTV:{
        width:40,
        height:40,
        backgroundColor:'#fff',
        marginRight:20
    },
    fullScreenTV:{
        width:40,
        height:40,
        backgroundColor:'#fff',
        marginRight:20
    },
    controllers:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    listBtn:{
         flexDirection:'row',
    },
    sound:{
         width:22,
         height:22,
         marginRight:20
    },
    setting:{
         width:22,
         height:22,
         marginRight:20
     },
     fullScreen:{
         width:22,
         height:22,
         marginRight:20
     },
     time:{
         color:'#fff',
         marginLeft:20,
         fontSize:18
     },
     videoStart:{
         position:'absolute',
         alignItems:'center',
         justifyContent:'center',
         width:'100%',
         height:'100%'
     },
     startButton:{
         width:70,
         height:70,
         alignItems:'center',
         justifyContent:'center',
         backgroundColor:'#ffffff5c',
         overflow:'hidden',
         borderRadius:50
     }
})