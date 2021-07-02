import { View ,StyleSheet,Dimensions} from 'react-native';
import React from 'react';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window')
const TrailerAndroid = () => {
    const video = React.useRef(null);
    React.useEffect(()=>{
      video.current.playAsync()
    },[video])
  return (
    <>
    <View style={styles.container}>
        <LinearGradient style={styles.gradient} colors={['transparent', '#000000c4','#000000c4']}>
        </LinearGradient>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'http://mobi.mytube.uz/v3/D/Disc123/6514c1fc-4b74-42af-b79b-fa8d5701a4cc_1024.mp4?file=1',
          }}
          useNativeControls ={false}
          resizeMode="cover"
          isLooping
          isMuted={true}
        />
        </View>
      </>

  );
}

export default TrailerAndroid

const styles = StyleSheet.create({
    container:{
      width:screenWidth+100,
      height:100,
      position:'relative'
    },
    video:{
        display:'flex',
        flexDirection:'row',
        height:screenWidth+100,
        width:screenWidth+100,
        resizeMode:'cover',
        resizeMode:'cover',

   },
   gradient:{
    position:'absolute',
    zIndex:2,
    top:0,left:50,right:0,bottom:0,
    width:screenWidth+100,
    height:screenWidth+100,
   }
})
