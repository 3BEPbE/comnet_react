
import React from 'react'
import {View,StyleSheet,Text,Dimensions,TVEventHandler,Image,BackHandler} from 'react-native'
import { Datas   } from '../context';
import Video from 'react-native-video';
import Controller from '../components/Controller';
import { DrawerItem } from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import PlayerMenu from '../components/PlayerMenu';
import TimeShift from '../components/TimeShift';
import SliderTimeShift from '../components/SlayderTimeShift';

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
export default function PlayerTV({navigation}){
    const {getChannelSrc,getChannel} = React.useContext(Datas)
    const [uri,setUri] = React.useState()
    const [currentID,setID] = React.useState()
    const [isPlayerVisible,setVisible] = React.useState(true)
    const [event,setEvent] = React.useState(false)
    const timerRef = React.useRef(null);
    const [isPaused,setPaused] = React.useState(false)
    const [isOpenMenu,setOpenMenu] = React.useState(false)
    const [data,setData] = React.useState()
    const [isTimeShift,setShift] = React.useState(false)
    const [time,setTime] = React.useState()

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
          tvEventHandler.enable(null, ((comp,e)=>{if(!data){return};tvEventListener(e,setID)}));
          // Clean up
          return () => {
            // Remove BackHandler
            // Disable TVEventHandler
            tvEventHandler.disable();
          };
        }, [data]),
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
           if((event.eventType=='right'||event.eventType=='select')&&event.eventKeyAction===0){
             setEvent((i)=>!i)
           } 
             if(event.eventKeyAction===1){
              setOpenMenu((menu)=>{
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
                     }if(event.eventType==='left'){
                      setOpenMenu(true)
                  }
                    }
                 return visible
                })
                }
                return menu
               })
           }
      }
      function Right (){
        setShift((isShift)=>{
         if(!isShift) 
         { setID((i)=>{
            const index =  data.findIndex((item)=>item.id===i)
            if(index>data.length){
                return data[data.length-1].id
            }else{
               return data[index+1].id
            }
        })}
          return isShift
        })
      
      }
      function Left (){
        setShift((isShift)=>{
          if(!isShift)
          {setID((i)=>{
            const index = data.findIndex((item)=>item.id===i)
            if(index===0){
                return data[0].id
            }else{
               return data[index-1].id
            }
        })}
        return isShift
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
  
  
    return(
        <View style={styles.container}>
            {currentID?<TimeShift setTime={setTime} setShift={setShift} setPaused={setPaused} setUri={setUri} isPlayerVisible={isPlayerVisible} setVisible={setVisible} isOpenMenu={isOpenMenu} currentID={currentID}/>:<></>}
            {isOpenMenu?<PlayerMenu setShift={setShift} setID={setID} channelList={data}/>:<></>}
           {uri? <Video
                paused={isPaused}
                source={{uri: uri, type: 'm3u8'}}
                style={{ width:screenWidth , height: screenHeight }}
                controls={false}
                resizeMode='stretch' />:<></> }
            {!isOpenMenu?<View style={{...styles.controller,backgroundColor:isPlayerVisible?"#00000061":'transparent'}}>
              <DrawerItem label='' style={{width:0,height:0}}/>
              {isPlayerVisible?<SliderTimeShift time={time}/>:<></>}
               {!isOpenMenu? <>{isPlayerVisible?
              <View style={styles.buttons}>
                  <DrawerItem onPress={OpenMenu} style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../images/menuPlayer.png')}/>}/>
                  <DrawerItem onPress={Left} style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../images/Left.png')}/>}/>
                  <DrawerItem onPress={()=>{setPaused(i=>!i)}} style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={isPaused?require('../images/startIcon.png'):require('../images/Pause-button.png')}/>}/>
                  <DrawerItem onPress={Right} style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../images/Right.png')}/>}/>
              </View>:<></>}</>:<></>}
          </View>:<></>}
      
        </View>
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