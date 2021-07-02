import { View ,StyleSheet,Dimensions} from 'react-native';
import React from 'react';
import VideoPlayer from '../components/Video/Index'
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = 1000<screenWidth
import { Datas } from '../context/context';

export default function Watching({route}){
  
  const {setStatusHidden} = React.useContext(Datas)
  React.useEffect(()=>{
    setStatusHidden(true)
  },)
  
  return(
    <View style={styles.container}>
      <VideoPlayer src={route.params.src}/>
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
