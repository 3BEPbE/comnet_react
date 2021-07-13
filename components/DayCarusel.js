import React from 'react';
import { View ,StyleSheet,Text,Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'


const { width: screenWidth } = Dimensions.get('window')

export default function DayCarusel({data,activeDay,setActiveDay}) {
    
    const ref = React.useRef(null);
    const renderItem = ({ item, index }) => (
    <DrawerItem onPress={()=>setActiveDay(index)} pressColor='#fff' style={{width:105,height:50}} label='' icon={()=>(     
    <View style={{ ...styles.seasonButton,backgroundColor:activeDay===index?'#E41A4B':'#373737'}}>
        <Text style={styles.seasonButtonText}>{item}</Text>
    </View>  )}/>   
    );
    return (
        <View style={styles.seasonButtonBlock}>
               { data ? <Carousel
                    layout="default"
                    ref={ref}
                    data={data}
                    sliderWidth={screenWidth}
                    itemWidth={102}
                    sliderHeight={35}
                    renderItem={renderItem}
                    firstItem={5}
                    activeSlideAlignment="center"
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                />:<></>}
        </View>
  
    );
  };
const styles = StyleSheet.create({
    seasonButtonBlock:{
        display:'flex',
        flexDirection:'row',
        marginBottom:20,
        marginRight:20
    },
    seasonButton:{
        width:85,
        height:33,
        backgroundColor:'#373737',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        overflow:'hidden',

    },
    seasonButtonText:{
        fontSize:12,
        color:'#fff'
    }
    
  });