import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DrawerItem} from '@react-navigation/drawer'
import {Datas} from '../context/context'
import { getSpecificOrientation } from 'react-native-orientation';

const { width: screenWidth } = Dimensions.get('window')
let isTV = screenWidth>950

export default function BigCardCaruselgetSerialasgetSerialas() {
    const {getSerialas,serials} = React.useContext(Datas)
    const ref = React.useRef(null);
    React.useEffect(()=>{
    //  getSerialas(1)
    },[])
   

    
    const renderItem = React.useCallback(({ item, index }) => {
      return(
            <DrawerItem pressColor={'#fff'} label='' icon={()=>{
              return(<ImageBackground source={{uri:item.thumbnail_big}} style={styles.imgBlocl}>
                <ImageBackground source={require('../images/corusulGradient.png')} style={styles.textBlock}>
                    <View style={styles.ranking}>
                        <View style={styles.rankingItem}>
                                <Text  style={styles.rankingNumber}>{item.imdb_rating}</Text>
                                <Text style={styles.rankingText}>IMDb</Text>
                        </View>
                        <View style={styles.rankingItem}>
                                <Text style={styles.rankingNumber}>{item.kinopoisk_rating}</Text>
                                <Text style={styles.rankingText}>КиноПоиск</Text>
                        </View>
                    </View>
                    <View style={styles.nameBlock}><Text style={styles.name}>{item.name}</Text></View>
                    <Text style={styles.about}>{item.description && item.description.slice(0,100)}...</Text>
                </ImageBackground>    
            </ImageBackground>)
            }}/>
            
    )}, []);
  
    return (
        <View style={{ marginTop:20,marginBottom:20}}>
          <Carousel
            layout="default"
            ref={ref}
            data={serials}
            sliderWidth={screenWidth}
            itemWidth={isTV?screenWidth:screenWidth}
            sliderHeight={isTV?700:300}
            renderItem={renderItem}
            activeSlideAlignment={'center'}
            inactiveSlideScale={0.93}
          />
        </View>
  
    );
  };
const styles = StyleSheet.create({
    
    imgBlocl:{
        borderRadius: 8,
        overflow:'hidden',
        height: (isTV?280*1.77:300),
        display:'flex',
        justifyContent:'flex-end', 
        width:screenWidth-40,
        resizeMode:'center'
    },
    textBlock:{
        height: (isTV?280*1.77-40:350),
        display:'flex',
        justifyContent:'flex-end',
        padding:15
    },
    about:{
        width:(isTV?280:320),
        fontSize:12,
        color:'#fff'
    },
    name:{
        width:(isTV?280:320),
        fontSize:20,
        color:'#fff',
        fontWeight:'bold',
        display:'flex',
    },
    ranking:{
        display:'flex',
        flexDirection:'row',
        width:100,
        justifyContent:'space-between'
    },
    rankingNumber:{
        color:'#fff',
        fontSize:15,
        fontWeight:'bold'
    },
    rankingText:{
        color:'#fff',
        fontSize:9,
    },
    nameBlock:{
        height:70,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    }
  });