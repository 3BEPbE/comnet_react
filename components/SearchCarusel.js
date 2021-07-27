import React,{Component} from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground, TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'
import {Datas} from './../context/context'

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth >950


export default function SearchCarusel({navigation,data}) {


    return (
        <View style={styles.mainBlock}>
          {data?
          <Carousel
            layout="default"
            data={data}
            sliderWidth={screenWidth}
            itemWidth={isTV?250:screenWidth/2-20}
            sliderHeight={260}
            renderItem={({item})=>
                (<DrawerItem  pressColor={'#fff'}  style={{width:isTV?230:screenWidth/2-15}}   label='' onPress={()=>{navigation.navigate('Movie', item)}} icon={()=>(
                    <View  style={styles.mainBlockItem}>
                        <ImageBackground resizeMode={'stretch'} source={{uri:item.thumbnail_small}} style={styles.imgBlocl}>
                        </ImageBackground>
                        <Text style={styles.title}>{item.name.length>25?`${item.name.slice(0,25)}...`:item.name}</Text>
                    </View>)}/>)
            }
            activeSlideAlignment="start"
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />:<></>}
        </View>
  
    );
  };
const styles = StyleSheet.create({
    
    imgBlocl:{
        borderRadius: 8,
        overflow:'hidden',
        height: 220,
        display:'flex',
        justifyContent:'flex-end',
     
    },
    mainBlockItem:{
        height: 260,
        width:isTV?210:screenWidth/2-30,
    },
    mainBlock:{
      marginBottom:20,
    },
    title:{
        fontSize:14,
        color:'#fff',
        paddingBottom:5,
        paddingTop:5,
        paddingRight:10,
        paddingLeft:10,
        width:isTV?210:screenWidth/2-20,
    }
    
  });