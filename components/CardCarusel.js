import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground, TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'
import {Datas} from './../context/context'

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth >950

export default function BigCardCarusel(props) {
    const {serials} = React.useContext(Datas)
    const [activeIndex, setActiveIndex] = React.useState(0);
    const ref = React.useRef(null);
    const renderItem = React.useCallback(({ item, index }) => (
        <DrawerItem  pressColor={'#fff'}  style={{marginRight:-15}}   label='' onPress={()=>{props.navigation.navigate('Movie', { id:item.id })}} icon={()=>(
            <View  style={styles.mainBlockItem}>
                <ImageBackground source={{uri:item.thumbnail_small}} style={styles.imgBlocl}>
                </ImageBackground>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        )}/>
    ), []);
  
    return (
        <View style={styles.mainBlock}>
          <Carousel
            layout="default"
            ref={ref}
            data={serials}
            sliderWidth={screenWidth}
            itemWidth={isTV?250:screenWidth/2-20}
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
    
    imgBlocl:{
        borderRadius: 8,
        overflow:'hidden',
        height: 200,
        display:'flex',
        justifyContent:'flex-end',
        resizeMode:'contain'
    },
    mainBlockItem:{
        height: 240,
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