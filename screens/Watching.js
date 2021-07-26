import { View ,StyleSheet,Dimensions} from 'react-native';
import React from 'react';
import VideoPlayer from '../components/Video/Index'
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = 900<screenWidth
import { Datas } from '../context/context';

export default function Watching({route,navigation}){
  
  const {setStatusHidden,checkToken} = React.useContext(Datas)
  React.useEffect(()=>{
    checkToken(navigation)
    setStatusHidden(true)
  },[])
  return(
    <View style={styles.container}>
      <VideoPlayer params={route.params}/>
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
