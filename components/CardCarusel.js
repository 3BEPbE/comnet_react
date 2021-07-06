import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground, TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'
import {Datas} from './../context/context'

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth >950

export default function CardCarusel({navigation,gid}) {

    const {getFilms} = React.useContext(Datas)

    const [data,setData] = React.useState([])

    React.useEffect(()=>{
      const fetch =async()=>{
        let data = await getFilms(0,{gid})
        setData(data)
      }
      fetch()
    },[])
    const renderItem = React.useCallback(({ item, index }) => {
   
      return(
        <DrawerItem  pressColor={'#fff'}  style={{marginRight:-15}}   label='' onPress={()=>{props.navigation.navigate('Movie', { id:item.id })}} icon={()=>(
            <View  style={styles.mainBlockItem}>
                <ImageBackground source={{uri:item.thumbnail_small}} style={styles.imgBlocl}>
                </ImageBackground>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        )}/>
    )}, []);
  
    return (
        <View style={styles.mainBlock}>
          {data?<Carousel
            layout="default"
            data={data}
            sliderWidth={screenWidth}
            itemWidth={isTV?250:screenWidth/2-20}
            sliderHeight={240}
            renderItem={renderItem}
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