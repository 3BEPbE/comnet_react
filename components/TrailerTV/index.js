import { View ,StyleSheet,Dimensions,Image, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import { Video } from 'expo-av';

import { LinearGradient } from 'expo-linear-gradient';
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = 900<screenWidth

const Trailer = ({src}) => {


    // const video = React.useRef(null);
    // React.useEffect(()=>{
    //     video.current.playAsync()
    // },[video])
  return (
    <>
    <View style={styles.stopBlock}>
                {/* <Video
                    ref={video}
                    style={{...styles.firstImage}}
                    source={{
                    uri: 'http://mobi.mytube.uz/v3/D/Disc123/6514c1fc-4b74-42af-b79b-fa8d5701a4cc_1024.mp4?file=1',
                    }}
                    useNativeControls ={false}
                    resizeMode="contain"
                    isMuted={true}
                    isLooping
                /> */}
          <Image source={{uri:src}} style={styles.firstImage}/>
        <LinearGradient style={{ position:'absolute',
     top: -350, left: 0, right: 0, bottom: 0,width:screenWidth,height:screenHeight,}} colors={['transparent', '#000000c4','#000000c4']}>
        </LinearGradient>
      </View>
    </>

  );
}

export default Trailer

const styles = StyleSheet.create({
    firstImage:{
        display:'flex',
        flexDirection:'row',
        height:screenHeight,
        width:screenWidth,
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
     top: 350, left: 0, right: 0, bottom: 0,
     justifyContent:'space-around',
     alignItems:'center',
     zIndex:0,
     width:'100%',
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
