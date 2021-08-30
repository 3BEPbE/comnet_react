import React from 'react'
import {View,StyleSheet,Text,Dimensions,TextInput,Image,TVEventHandler} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderTV } from '../components/HeaderTv';
import { Datas   } from '../context';
import { useFocusEffect } from '@react-navigation/core';
import FilmCarusel from '../components/FilmCarusel'
import BigJanrCarusel from '../components/BigJanrCarusel';

const { width: screenWidth } = Dimensions.get('window')

export default function Search({navigation}){
    const {getData,checkToken} = React.useContext(Datas)
    const textInputs = React.useRef([])
    const [text,setText] = React.useState('')
    const [event,setEvent] = React.useState(false)
    const [pos,setPos] = React.useState({main:'search'})

    const changeHandler = (text) => {
        setText(text)
    }

    React.useEffect(()=>{
        if(pos.main==='search'&&textInputs.current){
            textInputs.current[0].focus()
        }
    },[pos,textInputs.current])

    React.useEffect(()=>{
        if(event){
            if(pos.main==='search'){
                if(event.eventType==='down'){
                    setPos({main:'janr',index:0})
                }
            }
            if(pos.main==='janr'){
                if(event.eventType==='up'){
                    setPos({main:'search'})
                }
                if(event.eventType==='left'){
                    if(pos.index-1>=0){
                        setPos({main:'janr',index:pos.index-1})
                    }
                }
                if(event.eventType==='right'){
                    if(pos.index+1<11){
                        setPos({main:'janr',index:pos.index+1})
                    }
                }
                if(event.eventType==='down'){ 
                    //setMargin(90)
                    setPos({main:'carusel1',index:0})
                }
            }
            if(pos.main==='carusel1'){
                if(event.eventType==='up'){
                    setPos({main:'janr',index:0})
                }
                if(event.eventType==='left'){
                    if(pos.index-1>=0){
                        setPos({main:'carusel1',index:pos.index-1})
                    }
                }
                if(event.eventType==='right'){
                    if(pos.index+1<=11){
                        setPos({main:'carusel1',index:pos.index+1})
                    }
                }
            }
        }
    },[event])

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
            <HeaderTV navigation={navigation}/>
            <View style={styles.searchArea}>
                <Image style={styles.icon} source={require('../images/Search.png')}/>
                <TextInput ref={(input)=>{textInputs.current[0]=input}} placeholder={'Фильмы, передачи, персоны'} placeholderTextColor={'#fff'} style={{...styles.input,borderColor:pos.main==='search'?'#E41A4B':'#fff'}} onChangeText={(e)=>{changeHandler(e)}} value={text}  autoCompleteType={'off'}/>
            </View>
            <BigJanrCarusel setPos={setPos} pos={pos}/>
            <FilmCarusel searchText={text} condition={'search'} pos={pos} setPos={setPos} name={'carusel1'}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A'
 },

searchArea:{
    flexDirection:'row',
    alignItems:'center',
    position:'relative',
    width:screenWidth-40,
    marginLeft:20,
    marginTop:10
},
input:{
    width:screenWidth-40,
    fontSize:15,
    color:'#fff',
    borderWidth:1,
    borderColor:'#FFF',
    borderRadius:7,
    paddingLeft:10
},
icon:{
    width:30,
    height:30,
    resizeMode:'cover',
    position:'absolute',
    right:10
},
block:{
    flexWrap:'wrap',
    width:screenWidth-40,
    marginLeft:20,
    flexDirection:'row',
    marginTop:20
},
card:{
    width:((screenWidth-40)/7)-11,
    height:((screenWidth-40)/7-11)*1.4,
    borderRadius:7,
    backgroundColor:'#fff',
    marginRight:10,
    marginTop:10
}

});