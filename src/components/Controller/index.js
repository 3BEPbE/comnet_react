import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TVEventHandler,
  BackHandler,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import Style from '../../styles/Style';
import FocusableHighlight from '../focusable/FocusableHighlight';
import { DrawerItem } from '@react-navigation/drawer';
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

const Controller = ({setID,currentID}) => {

  const [event,setEvent] = React.useState(false)
  const timerRef = React.useRef(null);
  const [isPlayerVisible,setVisible] = React.useState(true)

    React.useEffect(()=>{
        clearTimeout(timerRef.current);
        setVisible(true)
        timerRef.current = setTimeout(()=>{ 
            setVisible(false)
        },5000)
    },[event])

  useFocusEffect(
    useCallback(() => {
      // Listen to back button
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backEventListener,
      );
      // Enabled TVEventHandler
      const tvEventHandler = new TVEventHandler();
      tvEventHandler.enable(null, tvEventListener);
      // Clean up
      return () => {
        // Remove BackHandler
        backHandler.remove();
        // Disable TVEventHandler
        tvEventHandler.disable();
      };
    }, []),
  );

  function backEventListener(event) {
    // Just add some logs here as navigation will change screen
    console.log('backEventListener received hardwareBackPress event');
    console.log(JSON.stringify(event));
  }

  function tvEventListener(component, event) {
   // console.log(event)
    console.log(isPlayerVisible)
       if(event.eventType==='select'){
         setEvent((i)=>!i)
       }else if(isPlayerVisible&&event.eventKeyAction===1&&event.eventType!=='up'&&event.eventType!=='up'){
        setEvent((i)=>!i)
       }else if(!isPlayerVisible&&event.eventKeyAction===1){
            if(event.eventType==='up'){
                RightChanel()
            }
            if(event.eventType==='down'){
                LeftChanel()
            }
       }
  }

   function LeftChanel(){
   //const index = data.findIndex((item)=>item.id===currentID)
   console.log('LeftChanel')
   if(index===0){
       return
   }else{
    setID(i=>i+1)
   }
   
  }
   function RightChanel(){
    // const index = data.findIndex((item)=>item.id===currentID)
    
        setID(i=>i+1)
    
  }

  function componentEventListener(event) {
    if (!event.eventType) {
      return;
    }
  }
  componentEventListener({eventType:true})



  return (
      <>
      <View style={{...styles.container,backgroundColor:isPlayerVisible?"#00000061":'transparent'}}>
      <DrawerItem label='' style={{width:0,height:0}}/>
          {isPlayerVisible?
        <View style={styles.buttons}>
          <DrawerItem style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../../images/Left.png')}/>}/>
          <DrawerItem style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../../images/Pause-button.png')}/>}/>
          <DrawerItem style={styles.focusPause} pressColor='#fff' label='' icon={()=><Image style={styles.pauseIcon} source={require('../../images/Right.png')}/>}/>
    </View>:<></>}
    </View>
    </>
  );
};

export default Controller;

const styles = StyleSheet.create({
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
    width:300,
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
    marginLeft:5,
    marginRight:5
  }
});
