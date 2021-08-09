
import React from 'react'
import {View,StyleSheet,Text,Dimensions,TVEventHandler,Image,BackHandler,ScrollView} from 'react-native'
import { Datas   } from '../context';
import Video from 'react-native-video';
import { DrawerItem } from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import PlayerMenu from '../components/PlayerMenu';
import TimeShift from '../components/TimeShift';
import SliderTimeShift from '../components/SlayderTimeShift';

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
export default function PlayerTV({navigation}){
    const {getChannelSrc,getChannel,getTimeShift} = React.useContext(Datas)
    const [uri,setUri] = React.useState()
    const [currentID,setID] = React.useState()
    const [isPlayerVisible,setVisible] = React.useState(true)
    const [event,setEvent] = React.useState(false)
    const timerRef = React.useRef(null);
    const [isPaused,setPaused] = React.useState(false)
    const [isOpenMenu,setOpenMenu] = React.useState(false)
    const [data,setData] = React.useState()
    const [isTimeShift,setShift] = React.useState(false)
    const [timeData,setTimeData] = React.useState({begin_time:false})
    const [timer,setTimer] = React.useState(0)
    const [secondMenu,setSecondMenu] = React.useState(false)
    

    React.useEffect(()=>{
      if(timeData.begin_time){
        setTimer(0)
        const interval = setInterval(()=>{
          if(!isPaused){
            setTimer((i)=>i+5)
          }
        },2000)
        return () => clearInterval(interval);
      }
    },[timeData.begin_time])


    React.useEffect(()=>{
        clearTimeout(timerRef.current);
        if(!isPaused||isOpenMenu){
        setVisible(true)
        timerRef.current = setTimeout(()=>{ 
            setVisible(false)
        },5000)}
    },[event,isPaused])
    useFocusEffect(
        React.useCallback(() => {
          // Enabled TVEventHandler
          const tvEventHandler = new TVEventHandler();
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            ()=>{
              let open = false;
            
                setOpenMenu((isOpen)=>{
                    if(!isOpen){
                      open = true;
                      return true
                    }else{
                      open = false
                    }
                });
                return open
              
            },
          );
          tvEventHandler.enable(null, ((comp,e)=>{if(!data){return};tvEventListener(e,setID)}));
          return () => {
            backHandler.remove();
            tvEventHandler.disable();
          };
        }, [data,currentID]),

      );
      React.useEffect(()=>{
        navigation.addListener('beforeRemove', (e) => {
          setOpenMenu((menu)=>{
            if(menu){
              setOpenMenu(false)
              e.preventDefault();
            }})
          })
      },[navigation])
 
      function tvEventListener(event) {

           if((event.eventType=='select')&&event.eventKeyAction===0){
             setEvent((i)=>!i)
           } 
             if(event.eventKeyAction===1){
              setOpenMenu((menu)=>{
                if(menu && event.eventType==='left'){
                  setSecondMenu(true)
                }
                if(!menu){
                
                  setVisible((visible)=>{
                    if(visible){
                      setEvent((i)=>!i)
                    }    
                    if(!visible){
                     if(event.eventType === 'up'){
                        Right()
                     }
                     if(event.eventType==='down'){
                         Left()

                     }
                     if(event.eventType==='left'){
                         setShift((isShift)=>{
                           if(isShift){
                            skipLeft()
                           }
                           return isShift
                         })
                     }
                     if(event.eventType==='right'){
                       setShift((isShift)=>{
                           if(isShift){
                            skipRight()
                           }
                           return isShift
                         })  
                     }}
                 return visible
                })
                }
                return menu
               })
           }
           console.log(event,2)
      }

       function skipLeft(){
        setTimer((sec)=>{
          setID((id)=>{

            setTimeData((timedata)=>{
              const fetch = async()=>{
                const uri = await getTimeShift(id,timedata.pid,timedata.current_time+sec-10)
                setUri(uri.uri)
              }
              fetch()
              return timedata
            })
            return id
          })
          return sec-10
        })
      }
       function skipRight(){
        setTimer((sec)=>{
          setID((id)=>{

            setTimeData((timedata)=>{
              const fetch = async()=>{
                const uri = await getTimeShift(id,timedata.pid,timedata.current_time+sec+10)
                setUri(uri.uri)
              }
              fetch()
              return timedata
            })
            return id
          })
          return sec+10
        })
      }
      function Right (){
          setTimeData({begin_time:false})
          setShift(false)
          setID((i)=>{
            const index =  data.findIndex((item)=>item.id===i)
            if(index>data.length){
                return data[data.length-1].id
            }else{
               return data[index+1].id
            }
        })
      }
      function Left (){
        setTimeData({begin_time:false})
        setShift(false)
          setID((i)=>{
            const index = data.findIndex((item)=>item.id===i)
            if(index===0){
                return data[0].id
            }else{
               return data[index-1].id
            }
        })
      }
      function componentEventListener(event) {
        if (!event.eventType) {
          return;
        }
      }
      componentEventListener({eventType:true})// i dont know what is it but without it does't work:)
    React.useEffect(()=>{
        const fetch=async()=>{
            const data = await getChannelSrc(currentID)
            setUri(data.uri)
        }
        if(currentID){
          fetch()
        }
        
    },[currentID])
    const OpenMenu = ()=>{
        setOpenMenu(true)
        
    }

    React.useEffect(()=>{
      const fetch=async()=>{
          const data = await getChannel()
          setID(data[0].id)
          setData(data)
      }
      fetch()
  },[])

  React.useEffect(()=>{
    const fetch = async()=>{
      const uri = await getTimeShift(currentID,timeData.pid,timeData.current_time)
      setUri(uri.uri)
    }
    if(timeData.begin_time) fetch();
},[timeData.begin_time])
  
    return(
        <ScrollView style={styles.container}>
            {currentID?<TimeShift currentID={currentID} setTimeData={setTimeData} setShift={setShift} setPaused={setPaused} isPlayerVisible={isPlayerVisible} setVisible={setVisible} isOpenMenu={isOpenMenu} currentID={currentID}/>:<></>}
            {isOpenMenu?<PlayerMenu secondMenu={secondMenu} setSecondMenu={setSecondMenu} setOpenMenu={setOpenMenu} setTimeData={setTimeData} setShift={setShift} setID={setID} channelList={data}/>:<></>}
           {uri? <Video
                paused={isPaused}
                source={{uri: uri, type: 'm3u8'}}
                style={{ width:screenWidth , height: screenHeight }}
                controls={false}
                resizeMode='stretch' />:<></> }
            {!isOpenMenu?<View style={{...styles.controller,backgroundColor:isPlayerVisible?"#00000061":'transparent'}}>
              {isPlayerVisible?<SliderTimeShift setTimer={setTimer} timer={timer} setUri={setUri} currentID={currentID} timeData={timeData} setTimeData={setTimeData}/>:<></>}
               {!isOpenMenu? <>{isPlayerVisible?
              <View style={styles.buttons}>
                  <DrawerItem onPress={OpenMenu} style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../images/menuPlayer.png')}/>}/>
                  <DrawerItem onPress={Left} style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../images/Left.png')}/>}/>
                  <DrawerItem onPress={()=>{setPaused(i=>!i)}} style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={isPaused?require('../images/startIcon.png'):require('../images/Pause-button.png')}/>}/>
                  <DrawerItem onPress={Right} style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../images/Right.png')}/>}/>
              </View>:<></>}</>:<></>}
          </View>:<></>}
      
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#000',
     height:screenHeight,
     width:screenWidth,
     position:'relative'
 },
 controller:{
    width:screenWidth,
    height:100,
    position:'absolute',
    bottom:0,
    backgroundColor:'#00000061',
    alignItems:'center'
  },
  buttons:{
    alignItems:'center',
    flexDirection:'row',
    width:400,
    height:100,
    justifyContent:'center'
  },
  pauseIcon:{
      width:30,
      height:30,
      resizeMode:'contain'
  },
  focusPause:{
    marginHorizontal:0,
    marginVertical:0,
    width:45,
    marginLeft:15,
    marginRight:15
  }
 

});