import React from 'react'
import {View,StyleSheet,Text,Dimensions,Image,TVEventHandler} from 'react-native'
import { Directions, ScrollView } from 'react-native-gesture-handler';
import { HeaderTV } from '../components/HeaderTv';
import { Datas } from '../context';
import { useFocusEffect } from '@react-navigation/core';
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

export default function CurrentMovie({navigation,route}){
    const movie = route.params
    console.log(movie)
    const tvEventListener = (event)=>{
        if(event.eventKeyAction){
            if(!movie.is_season){
                if(event.eventType==='select'){
                    navigation.navigate('PlayerMovie',movie)
                }
            }
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const tvEventHandler = new TVEventHandler();
          tvEventHandler.enable(null, ((comp,e)=>{tvEventListener(e)}));
          return () => {
            tvEventHandler.disable();
          };
        }, []),

      );
    return(
        <ScrollView style={styles.container}>
            <HeaderTV navigation={navigation}/>
            <View style={styles.mainBlock}>
                <View style={styles.block1}>
                    <Image source={{uri:movie.thumbnail_big}} style={styles.Image}/>
                </View>
                <View style={styles.block2}>
                    <Text style={styles.name}>{movie.name}</Text>
                    <Text style={styles.description}>{movie.description}</Text>
                </View>
                <View style={styles.block3}>
                    <Text style={styles.age}>Категория: {movie.rating}+</Text>
                    <Text style={{...styles.age,marginTop:20}}>{movie.countries}, {movie.year}</Text>
                    <Text style={{...styles.age,marginTop:20}}>IMDB:{movie.imdb_rating}</Text>
                    <Text style={{...styles.age,marginTop:20}}>Kinopoisk:{movie.kinopoisk_rating}</Text>
                    
                    <View style={styles.janres}>
                        {movie.genres.split(',').map((item,index)=>(
                            <View style={styles.janrItem} key={index}>
                                <Text style={styles.janrText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:'#0A0A0A',
     height:screenHeight
 },
 mainBlock:{
     flexDirection:'row',
     marginLeft:20,
     width:screenWidth-20
 },
 Image:{
   height:screenHeight/100*90-80,
   width:(screenHeight/100*90-80)/1.5,
   borderRadius:3,
   overflow:'hidden'
 },
 block1:{
     justifyContent:'center',
     alignItems:'center',
     height:screenHeight/100*85,
     width:screenWidth/3
 },
 block2:{
    height:screenHeight/100*85,
    width:screenWidth/3
},
block3:{
    height:screenHeight/100*85,
    width:screenWidth/3, 
},
name:{
    color:'#fff',
    fontSize:22,
    marginTop:20,
},
description:{
    color:'#fff',
    marginTop:20,
    fontSize:18,
},
age:{
    color:'#fff',
    fontSize:16,
    marginTop:30,
    marginLeft:20,
},
janres:{
    flexWrap:'wrap',
    flexDirection:'row',
    marginTop:30,
    marginLeft:20,
    width:screenWidth/3-40
},
janrText:{
    color:'#fff',
    fontSize:16,
    textAlign:'center'
},
janrItem:{
    padding:5,
    backgroundColor:'#E41A4B',
    marginRight:10,
    marginTop:10,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
}
});