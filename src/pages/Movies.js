import React from 'react'
import {View,StyleSheet,Text,Dimensions,Image,TVEventHandler} from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { HeaderTV } from '../components/HeaderTv';
import BigCardCarusel from '../components/BigCardCarusel';
import { DrawerItem } from '@react-navigation/drawer';
import BigJanrCarusel from '../components/BigJanrCarusel';
import FilmCarusel from '../components/FilmCarusel';
import Chooser from '../components/Chooser';
import { useFocusEffect } from '@react-navigation/core';
const { width: screenWidth } = Dimensions.get('window')

export default function Movies({navigation}){
    const [select,setSelect] = React.useState(1)
    const [eventType,setEvent] = React.useState()
    const stack = React.useRef([{main:'search'},{main:'category',index:1},{main:'janr',index:1},{main:'carusel1',index:1},{main:'carusel2'}]).current
    const [pos,setPos] = React.useState({main:'search'})

    React.useEffect(()=>{
        if(eventType){
            if(pos.main === 'search'){
                if(eventType.eventType==='down'){
                    setPos({main:'category',index:1})
                }
            }
            if(pos.main==='category'){
                if(eventType.eventType==='up'){
                        setPos({main:'search'})
                }
                if(eventType.eventType==='left'){
                        if(pos.index-1>0){
                            setPos({main:'category',index:pos.index-1})
                        }
                }
                if(eventType.eventType==='right'){
                    if(pos.index+1<=3){
                        setPos({main:'category',index:pos.index+1})
                    }
                }
                if(eventType.eventType==='down'){
                    setPos({main:'janr',index:0})
                }
            }
            if(pos.main==='janr'){
                if(eventType.eventType==='up'){
                    setPos({main:'category',index:1})
                }
                if(eventType.eventType==='left'){
                    if(pos.index-1>=0){
                        setPos({main:'janr',index:pos.index-1})
                    }
                }
                if(eventType.eventType==='right'){
                    if(pos.index+1<11){
                        setPos({main:'janr',index:pos.index+1})
                    }
                }
                if(eventType.eventType==='down'){
                    if(pos.index+1<=11){
                        setPos({main:'carusel1',index:0})
                    }
                }
            }
            if(pos.main==='carusel1'){
                if(eventType.eventType==='up'){
                    setPos({main:'janr',index:0})
                }
                if(eventType.eventType==='left'){
                    if(pos.index-1>=0){
                        setPos({main:'carusel1',index:pos.index-1})
                    }
                }
                if(eventType.eventType==='right'){
                    if(pos.index+1<=11){
                        setPos({main:'carusel1',index:pos.index+1})
                    }
                }
            }
        }
    },[eventType])

    useFocusEffect(
        React.useCallback(() => {
          const tvEventHandler = new TVEventHandler();
          tvEventHandler.enable(null, ((comp,e)=>{tvEventListener(e)}));
          return () => {
            tvEventHandler.disable();
          };
        }, []),

      );

    function tvEventListener(event) {
        if(event.eventKeyAction===0){
            setEvent(event)
        }
    }

    return(
        <ScrollView style={styles.container}>
         <HeaderTV pos={pos} main={true}/>
         <Chooser pos={pos}/>
         <BigJanrCarusel setPos={setPos} pos={pos}/>
         <FilmCarusel text={'Новинки'} pos={pos} params={{new:1,season:0,limit:12}}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A'
 },
});