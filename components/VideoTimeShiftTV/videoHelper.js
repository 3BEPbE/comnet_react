import React from 'react'
import {Dimensions} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';
import {Datas} from '../../context/context'

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

export const converter = (sec)=>{
  var d = new Date(sec*1000+5*60*1000*60);
  var time = d; 
  let hour = `${time.getUTCHours()}`.length===1?`0${time.getUTCHours()}`:time.getUTCHours()
  let minute =  `${time.getUTCMinutes()}`.length===1?`0${time.getUTCMinutes()}`:time.getUTCMinutes()
  return [`${hour}:${minute}`,]
}

export const leftSkip = (status,video,removeClickTime,setSkipIcon) =>{
    let time = status.positionMillis - 10*1000
    if(time<0){
      time=0
    }
    video.current.setPositionAsync(time)
    removeClickTime.current = setTimeout(() => {
      setSkipIcon({
        right:{opacity:0},
        left:{opacity:0}           
      })
    }, 400) 
      
  }
export const rightSkip = (status,video,removeClickTime,setSkipIcon) =>{
    let time = status.positionMillis + 10*1000
    if(time>status.durationMillis){
      time=status.durationMillis
    }
    video.current.setPositionAsync(time)
    removeClickTime.current = setTimeout(() => {
      setSkipIcon({
        right:{opacity:0},
        left:{opacity:0}           
      })
    }, 400) 
      
  }

export  const doubleClick = (condition,doubleClickCounter,removeClickTime,setSkipIcon,status,video,setControl) =>{
    doubleClickCounter.current++
    setControl((e)=>!e)
    if (doubleClickCounter.current == 2) {
        clearTimeout(removeClickTime.current)
        doubleClickCounter.current = 0
        if(condition==='left'){
          setSkipIcon({
            left:{opacity:1},
            right:{opacity:0}           
          })
          leftSkip(status,video,removeClickTime,setSkipIcon)
        }else{
          setSkipIcon({
            left:{opacity:0},
            right:{opacity:1}           
          })
          rightSkip(status,video,removeClickTime,setSkipIcon)
          removeClickTime.current = setTimeout(() => {
          doubleClickCounter.current = 0
          setSkipIcon({
            right:{opacity:0},
            left:{opacity:0}           
          })
        }, 400)}    
    } else {
            removeClickTime.current = setTimeout(() => {
            doubleClickCounter.current = 0
            setSkipIcon({
                right:{opacity:0},
                left:{opacity:0}           
            })
            }, 400) 
          }
  }