import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground, TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'
import {Datas} from './../context/context'

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth >950

export default function BigCardCarusel({season,setList1}) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const ref = React.useRef(null);
    const renderItem = React.useCallback(({ item, index }) => (
        <DrawerItem onPress={()=>{setList1(false)}} pressColor={'#fff'}  style={{height:50,width:165}}   label=''  icon={()=>(
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
            data={season}
            sliderWidth={150}
            itemWidth={150}
            itemHeight={40}
            sliderHeight={240}
            renderItem={renderItem}
            activeSlideAlignment="start"
            onSnapToItem={(index) => setActiveIndex(index)}
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
        backgroundColor:'red'
    },
    mainBlock:{
      marginBottom:20,
    },
    title:{
        fontSize:16,
        color:'#fff',
    }
    
  });