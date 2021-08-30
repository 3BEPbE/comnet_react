import React from 'react'
import {View,StyleSheet,Text,Dimensions,Animated,TVEventHandler} from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { HeaderTV } from '../components/HeaderTv';
import BigCardCarusel from '../components/BigCardCarusel';
import { DrawerItem } from '@react-navigation/drawer';
import BigJanrCarusel from '../components/BigJanrCarusel';
import FilmCarusel from '../components/FilmCarusel';
import Chooser from '../components/Chooser';
import { useFocusEffect } from '@react-navigation/core';
import { Datas } from '../context';
const { width: screenWidth } = Dimensions.get('window')

export default function Movies({navigation}){
    const {checkToken} = React.useContext(Datas)
    const [value,setValue] = React.useState(new Animated.Value(0))
    const [margin,setMargin] = React.useState(0)
    const [eventType,setEvent] = React.useState()
    const stack = React.useRef([{main:'search'},{main:'category',index:1},{main:'janr',index:1},{main:'carusel1',index:1},{main:'carusel2'}]).current
    const [pos,setPos] = React.useState({main:'carusel1',index:0})
    const [activeCat,setActiveCat] = React.useState(1)
    const [params,setParams] = React.useState({season:0,})
    React.useEffect(()=>{
        Animated.timing(value, {
            toValue: -margin,
            duration: 500,
            useNativeDriver:true
          }).start();
    },[value,margin])

    React.useEffect(()=>{
        checkToken(navigation)
    },[])

    React.useEffect(()=>{
        if(eventType){
            if(pos.main === 'search'){
                if(eventType.eventType==='select'){
                    navigation.navigate('Search')
                }
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
                    setMargin(90)
                    setPos({main:'carusel1',index:0})
                }
            }
            if(pos.main==='carusel1'){
                if(eventType.eventType==='up'){
                    setMargin(0)
                    setPos({main:'janr',index:0})
                }
                if(eventType.eventType==='down'){
                    setMargin(210)
                    setPos({main:'carusel2',index:0})
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
            if(pos.main==='carusel2'){
                if(eventType.eventType==='up'){
                    setMargin(90)
                    setPos({main:'carusel1',index:0})
                }
                if(eventType.eventType==='left'){
                    if(pos.index-1>=0){
                        setPos({main:'carusel2',index:pos.index-1})
                    }
                }
                if(eventType.eventType==='right'){
                    if(pos.index+1<=11){
                        setPos({main:'carusel2',index:pos.index+1})
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
    React.useEffect(()=>{
        if(activeCat===1){
            setParams({season:0})
        }else if(activeCat===2){
            setParams({season:1})
        }else if(activeCat===3){
            setParams({gid:10})
        }
    },[activeCat])
    return(
        <View style={styles.container}> 
            <Animated.View style={{ transform: [{ translateY: value }]}}>
                <HeaderTV pos={pos} main={true}/>
                <Chooser activeCat={activeCat} setActiveCat={setActiveCat} setPos={setPos} pos={pos}/>
                <BigJanrCarusel setPos={setPos} pos={pos}/>
                <FilmCarusel setPos={setPos} name={'carusel1'} text={'Новинки'} pos={pos} params={{new:1,...params}}/>
                <FilmCarusel setPos={setPos} name={'carusel2'} text={'Новинки'} pos={pos} params={{new:1,...params}}/>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A'
 },
});