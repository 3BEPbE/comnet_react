
import React from 'react'
import {View,StyleSheet,Text,Dimensions,TVEventHandler,Image,BackHandler,ScrollView} from 'react-native'
import { Datas   } from '../context';
import Video from 'react-native-video';
import { DrawerItem } from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import PlayerMenu from '../components/PlayerMenu';
import TimeShift from '../components/TimeShift';
import SliderTimeShift from '../components/SlayderTimeShift';
import ChannelList from '../components/ChannelList';

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
export default function PlayerTV({navigation}){
    const {getProgramListByDay,getChannel,getTimeShift} = React.useContext(Datas)
    const [uri,setUri] = React.useState()
    const [currentID,setID] = React.useState()
    const [isPlayerVisible,setVisible] = React.useState(false)
    const [event,setEvent] = React.useState(false)
    const timerRef = React.useRef(null);
    const timeMenu = React.useRef(null);
    const [isPaused,setPaused] = React.useState({paused:false,work:true})
    const [isOpenMenu,setOpenMenu] = React.useState(false)
    const [data,setData] = React.useState()
    const [isTimeShift,setShift] = React.useState(false)
    const [timeData,setTimeData] = React.useState({begin_time:false})
    const [timer,setTimer] = React.useState(0)
    const [secondMenu,setSecondMenu] = React.useState(false)
    const [changeMenu,setChangeMenu] = React.useState(false)
    const refNum = React.useRef(0)
    const [blocked,setBlocked] = React.useState(false)
    const [type,setType] = React.useState(false)


    React.useEffect(()=>{
      if(timeData.begin_time){
        const interval = setInterval(()=>{
          if(!isPaused.paused){
            setTimer((i)=>i+5)
          }
        },5000)
        return () => clearInterval(interval);
      }
    },[timeData.begin_time])

    React.useEffect(()=>{
      clearTimeout(timeMenu.current);
      if(isOpenMenu){
        timeMenu.current = setTimeout(()=>{ 
          setOpenMenu(false)
      },5000)
      }

    },[changeMenu,isOpenMenu])


    React.useEffect(()=>{
        clearTimeout(timerRef.current);
        if(!isPaused.paused||isOpenMenu){
        if(!refNum.current){
          refNum.current = 1
          setVisible(false)
        }else{
          refNum.current = 1
          setVisible(true)
        }
        timerRef.current = setTimeout(()=>{ 
            setVisible(false)
        },5000)}
    },[event,isPaused.paused])
    useFocusEffect(
        React.useCallback(() => {
          const tvEventHandler = new TVEventHandler();
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            ()=>{
              let open = false;
              let isVisible = false
              setVisible((visible)=>{
                if(visible){
                  open = true;
                  isVisible= true
                  return false
                }else{
                  isVisible = false
                  return false
                }})

                setOpenMenu((menu)=>{
                  if(isVisible){
                    open = true
                    return false
                  }else{
                      if(menu){
                        open = false
                        return false
                      }else{
                        open = true
                        return true
                      }
                  }
                })
                return open
              
            },
          );
          tvEventHandler.enable(null, ((comp,e)=>{if(!data){return};tvEventListener(e,setID)}));
          return () => {
            backHandler.remove();
            tvEventHandler.disable();
          };
        }, [data]),

      );

      function tvEventListener(event) {
            let isOpen = true
            if(event.eventKeyAction===0){
              setOpenMenu((menu)=>{
                if(menu){
                  isOpen = true
                }else{
                  isOpen = false
                }
                return menu
              })
              if(isOpen){
                setChangeMenu((i)=>!i)
              }
            }

           if((event.eventType=='select')&&event.eventKeyAction===0&&!isOpen){
            setOpenMenu((menu)=>{
              setVisible((visible)=>{
                if(!visible&&!menu)setPaused({paused:false,work:false})
                return visible
              })
              return menu
            })
      
             setEvent((i)=>!i)
           } 
             if(event.eventKeyAction===1){
               let openMenu = false;
               let visible = false;
               let isShift = false
                setOpenMenu((menu)=>{
                openMenu = menu;
                return menu
                })
                if(openMenu && event.eventType==='left'){
                  setSecondMenu(true)
                }
                if(!openMenu){ 
                 setVisible((visible1)=>{
                 visible = visible1 
                 return visible1
                })
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
                     setShift((isShift1)=>{
                       isShift = isShift1
                       return isShift1
                     })
                     if(isShift){
                      skipLeft()
                     }
                 }
                 if(event.eventType==='right'){
                    setShift((isShift1)=>{
                      isShift = isShift1
                      return isShift1
                    })
                    if(isShift){
                      skipRight()
                    }  
                 }}
                }
           }
      }

      async function skipLeft(){
         let id1 = 0;
         let sec1 = 0;
         let timeData1 = false
        for(let i = 0;i<2;i++){
          await setTimeData((timedata)=>{
            timeData1 = timedata
            return timedata
          })
          await setID((id)=>{
            id1 = id
            return id
          })
          await setTimer((sec)=>{
            sec1 = sec-10 
            return sec-10 
          })
          const data = await getTimeShift(id1,timeData1.pid,sec1-10)
          setUri(data.uri)
        } 
      }
      async function skipRight(){
         let id1 = 0;
         let sec1 = 0;
         let timeData1 = false
         for(let i = 0;i<2;i++){
              await setTimeData((timedata)=>{
                  timeData1 = timedata
                  return timedata
                })
              await setID((id)=>{
                  id1 = id
                  return id
                })
              await setTimer((sec)=>{
                  let time = new Date().getTime()/1000
        
                  if(sec+15>time){
                    return sec
                  }else{
                    sec1 = sec+10 
                  return sec1}
              })
         }
         console.log(id1)
        if(id1){
          const data = await getTimeShift(id1,timeData1.pid,sec1)
          setUri(data.uri)
        }
      }
      function Right (){
          setPaused({paused:false,work:true})
          setID((i)=>{
            const filtered = data.filter((item)=>item.has_subscription)
            if(filtered){
              let index =  filtered.findIndex((item)=>item.id===i)
              setOpenMenu()
              if(index>=filtered.length-1){
                  return filtered[0].id
              }else{
                 return filtered[index+1].id
              }
            }else{
              return i
            }
        })
      }
      function Left (){
        setPaused({paused:false,work:true})
          setID((i)=>{
            const filtered = data.filter((item)=>item.has_subscription)
            let index =  filtered.findIndex((item)=>item.id===i)
            if(index===0){
                return filtered[filtered.length-1].id
            }else{
               return filtered[index-1].id
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
         
            const time = new Date().getTime()
            const current = data.filter((item)=>item.id === currentID)
            if(current[0].has_subscription){
              const info = await getTimeShift(currentID,current[0].program_id,time/1000-100)
              const timeShift = await getProgramListByDay(currentID)
              const programData = findClosestId(Object.values(timeShift)[6],time/1000)
  
              setUri(info.uri)
              setShift(true)
              setTimer(time/1000-100)
              setTimeData({
                name:programData.name,
                begin_time:programData.begin_time,
                pid:programData.id,
                end_time:programData.end_time,
                current_time:programData.begin_time,
              })  
            }   
        }
        if(currentID){
          fetch()
        }
        
    },[currentID])

    const findClosestId = (arr,x)=>{
      let newArr = arr.sort((a, b) => a.begin_time - b.begin_time);
      newArr =  newArr.filter((item)=>item.begin_time<=x)
      return newArr[newArr.length-1]
     }
    
    React.useEffect(()=>{
      const fetch=async()=>{
          let data = await getChannel()
          data = data.map((item)=>{item.has_subscription = 0;return item})
          data[24].has_subscription = 1;data[25].has_subscription = 1;data[38].has_subscription = 1;data[39].has_subscription = 1;data[50].has_subscription = 1;data[6].has_subscription = 1
          setData(data)
          const filtered = data.filter(item=>item.has_subscription)
          if(filtered){
            setID(filtered[0].id)
          }else{
            setBlocked(true)
          }
      }
      fetch()
  },[])

  
    return(
        <View style={styles.container}>
            <ChannelList data={data} id={currentID} timeData={timeData}/>
            {currentID?<TimeShift  setTimer={setTimer} setUri={setUri} currentID={currentID} setTimeData={setTimeData} setShift={setShift} setPaused={setPaused} isPlayerVisible={isPlayerVisible} setVisible={setVisible} setID={setID} isOpenMenu={isOpenMenu} currentID={currentID}/>:<></>}
            {isOpenMenu?<PlayerMenu type={type} setType={setType} setPaused={setPaused} data={data} secondMenu={secondMenu} currentID={currentID} setSecondMenu={setSecondMenu} setOpenMenu={setOpenMenu} setTimeData={setTimeData} setShift={setShift} setID={setID} channelList={data}/>:<></>}
           {uri? 
           
           <>
           <Video
                source={{uri: uri, type: 'm3u8'}}
                style={{ width:screenWidth , height: screenHeight }}
                paused={isPaused.paused}
                controls={false}
                resizeMode='stretch' /></>:<></> }
            <View style={{...styles.controller,backgroundColor:isPlayerVisible?"#00000061":'transparent'}}>
              {isPlayerVisible&&timer?<SliderTimeShift setPaused={setPaused} setEvent={setEvent} setTimer={setTimer} timer={timer} setUri={setUri} setID={setID} currentID={currentID} timeData={timeData} />:<></>}
                  <View style={styles.buttons}>
                    <>{isPlayerVisible?<>
                      <DrawerItem onPress={skipLeft} style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../images/leftSkip.png')}/>}/>
                      </>:<></>
                      }</>
                      <DrawerItem onPress={()=>{
                        setPaused((old)=>{ 
                          if(!old.work){
                          return{paused:old.paused,work:true}
                        }
                         return{paused:!old.paused,work:true}
                        })
                      }} style={{...styles.focusPause,opacity:isPlayerVisible?1:0}} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={isPaused.paused?require('../images/startIcon.png'):require('../images/Pause-button.png')}/>}/>
                     <>{isPlayerVisible?<><DrawerItem onPress={skipRight} style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../images/rightSkip.png')}/>}/></>:<></>}</>
                  </View>
          </View>
      
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
    height:110,
    position:'absolute',
    bottom:0,
    backgroundColor:'#00000061',
    alignItems:'center',
    justifyContent:'space-around'
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