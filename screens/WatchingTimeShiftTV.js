import { View ,StyleSheet,Dimensions} from 'react-native';
import React from 'react';
import VideoPlayer from '../components/VideoTimeShiftTV/Index'
const { width: screenWidth } = Dimensions.get('window')

import { Datas } from '../context/context';

export default function WatchingTimeShiftTV({route,navigation}){

  const {setStatusHidden,checkToken,getTimeShift} = React.useContext(Datas)

  const [url,setUrl] = React.useState()
  const [data,setData] = React.useState({...route.params,position:route.params.begin_time})
  const [timer,setTimer] = React.useState(0)



  React.useEffect(()=>{
    checkToken(navigation)
    setStatusHidden(true)
  },[])

    React.useEffect(()=>{
      const fetch = async()=>{
        const url = await getTimeShift(data.pid,data.cid,data.position)
        setUrl(url.uri)
      }
      fetch()
    },[data.position])




  return(
    <View style={styles.container}>
      <VideoPlayer data={data} setData={setData} setTimer={setTimer} timer={timer} url={url} />
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
