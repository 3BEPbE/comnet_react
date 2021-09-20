import React from "react";
import { Text,StyleSheet,View,Dimensions } from "react-native";
import { StatusBar } from "react-native";
import { Datas } from "../context";
import Video from "react-native-video";
import Orientation from 'react-native-orientation';
import SliderTimeShift from "../componentsPhone/SliderPlayer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const {width:screenWidth,height:screenHeight} = Dimensions.get('window')

const PlayerPhone = ({navigation,route}) =>{

    const {checkToken,isLogin,getTimeShift} = React.useContext(Datas)
    const [uri,setUri] = React.useState()
    const [source,setSource] = React.useState(route.params)
    const [timer,setTimer] = React.useState(new Date().getTime()/1000)
    const [isPaused,setPaused] = React.useState(false)
    const [sliderVisible,setSliderVisible] = React.useState(true)
    const sliderTimeRef = React.useRef()
    const [touched,setTouched] = React.useState(false)

    React.useEffect(()=>{
        if(uri){
          const interval = setInterval(()=>{
            if(!isPaused){
              setTimer((i)=>i+5)
            }
          },5000)
          return () => clearInterval(interval);
        }
      },[source.begin_time,isPaused])
  
    React.useEffect(()=>{
        StatusBar.setHidden(true)
        checkToken(navigation)
        return ()=> {StatusBar.setHidden(false)}
    },[])

    React.useEffect(()=>{
        const fetch=async()=>{
            const time = new Date().getTime()
            const info = await getTimeShift(source.id,source.program_id,time/1000-100)
            setUri(info.uri)
        }
       if(isLogin) fetch()
    },[])

    React.useEffect(()=>{
        Orientation.lockToLandscape();
        return()=>{
            Orientation.lockToPortrait();
        }
    },[])

    React.useEffect(()=>{
        clearTimeout(sliderTimeRef.current);
        setSliderVisible(true)
        sliderTimeRef.current = setTimeout(()=>{ 
            setSliderVisible(false)
        },4000)
    },[touched])

    const leftSkip = () =>{
        setTouched((i)=>!i)
    }
    const rightSkip = () =>{
        setTouched((i)=>!i)
    }

    return( 
        <View style={styles.page}>
            <View style={styles.blockBtn}>
                <TouchableWithoutFeedback onPress={leftSkip}>
                    <View style={styles.leftBlock}></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style={styles.centerBlock}></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={rightSkip}>
                    <View style={styles.rightBlock}></View>
                </TouchableWithoutFeedback>
            </View>
                {uri?<Video
                        source={{uri: uri, type: 'm3u8'}}
                        style={styles.video}
                        // paused={isPaused.paused}
                        // onBuffer={(buffer)=>setBuffer(buffer)}
                        controls={false}
                        resizeMode='stretch' />:<></>}

                    {uri&&sliderVisible?
                    <View style={styles.sliderBlock}>
                        <SliderTimeShift begin_time={source.program_begin_time} end_time={source.program_end_time} timer={timer} />
                    </View>
                    :<></>}
    </View>
    )
}


export default PlayerPhone

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor:'#000'
    },
    video:{
        height:'100%',
        width:'100%',
    },
    sliderBlock:{
        position:'absolute',
        zIndex:11,
        backgroundColor:'#060606c2',
        bottom:0,
        height:50,
        width:'100%'
    },
    blockBtn:{
        position:'absolute',
        top:0,
        left:0,
        height:'100%',
        width:'100%',
        zIndex:10,
        flexDirection:'row'
    },
    leftBlock:{
        width:screenHeight/100*40,
        backgroundColor:'red',
        height:'100%'
    },
    centerBlock:{
        width:screenHeight/100*20,
        backgroundColor:'#fff',
        height:'100%'
    },
    rightBlock:{
        width:screenHeight/100*40,
        backgroundColor:'red',
        height:'100%'
    }
  });