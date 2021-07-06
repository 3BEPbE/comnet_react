import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground, TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'
import {Datas} from './../context/context'

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth >950

export default function SerialCaruselTV({setData,setList1,data}) {
    const ref = React.useRef(null);
    const clickItem = (currentSeason) =>{
      setList1(false)
      setData(currentSeason)   
    }

    const renderItem = React.useCallback(({ item, index }) => (
        <DrawerItem onPress={()=>clickItem(item)} pressColor='#000'  style={{height:50,width:165}}   label=''  icon={()=>(
            <View  style={styles.mainBlockItem}>
                <Text style={styles.title}>{item} сезон</Text>
            </View>
        )}/>
    ), []);
  
    return (
        <View style={styles.mainBlock}>
          <Carousel
            layout="default"
            vertical={true}
            ref={ref}
            data={data}
            sliderWidth={150}
            itemWidth={150}
            itemHeight={40}
            sliderHeight={40*data.length}
            renderItem={renderItem}
            activeSlideAlignment="start"
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />
        </View>
  
    );
  };
const styles = StyleSheet.create({
    
    mainBlockItem:{
        height: 35,
        width:150,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
    },
    mainBlock:{
      marginBottom:20,
    },
    title:{
        fontSize:16,
        color:'#000',
    }
    
  });