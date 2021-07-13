import { View ,StyleSheet,Dimensions} from 'react-native';
import React from 'react';
import VideoPlayerTV from '../components/VideoTV/Index'
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = 1000<screenWidth
import { Datas } from '../context/context';

export default function WatchingTV({route}){
  const {setStatusHidden,checkToken} = React.useContext(Datas)

  React.useEffect(()=>{
    setStatusHidden(true)
    checkToken()
  },[])
  
  return(
    <View style={styles.container}>
      <VideoPlayerTV params={route.params}/>
    </View>
  )
} 

const styles = StyleSheet.create({
container:{
  backgroundColor:'#000',
  width:screenWidth,
  height:'100%',
  alignItems:'center',
  justifyContent:'center'
}
})
