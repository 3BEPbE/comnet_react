import { View ,StyleSheet,Dimensions,Image} from 'react-native';
import React from 'react';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window')
const TrailerAndroid = ({src}) => {
    // const video = React.useRef(null);
    
    // React.useEffect(()=>{
    //   video.current.playAsync()
    // },[video])
  return (
    <>
    <View style={styles.container}>
        <LinearGradient style={styles.gradient} colors={['transparent', '#000000c4','#000000c4']}>
        </LinearGradient>
        <Image source={{uri:src}} style={styles.video}/>
        {/* <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'http://mobi.mytube.uz/v3/D/Disc123/6514c1fc-4b74-42af-b79b-fa8d5701a4cc_1024.mp4?file=1',
          }}
          useNativeControls ={false}
          resizeMode="cover"
          isLooping
          isMuted={true}
        /> */}
        </View>
      </>

  );
}

export default TrailerAndroid

const styles = StyleSheet.create({
    container:{
      width:screenWidth,
      height:100,
      position:'relative'
    },
    video:{
        display:'flex',
        flexDirection:'row',
        height:screenWidth+80,
        width:screenWidth,
        resizeMode:'stretch',

   },
   gradient:{
    position:'absolute',
    zIndex:2,
    top:0,left:0,right:0,bottom:0,
    width:screenWidth,
    height:screenWidth+100,
   }
})
