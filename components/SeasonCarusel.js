import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground,TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DrawerItem} from '@react-navigation/drawer'

const { width: screenWidth } = Dimensions.get('window')

export default function SeasonCarusel(props) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [carouselItems, setCarouselItems] = React.useState([1,2,3,4,5,6,7]);
    const ref = React.useRef(null);
    const renderItem = React.useCallback(({ item, index }) => (
    <DrawerItem style={{marginRight:-10}} label='' icon={()=>( 
    <View style={{...styles.seasonButton,backgroundColor:(index===0?'#373737':'transperent')}}>
        <Text style={styles.seasonButtonText}>СЕЗОН {item}</Text>
    </View> )} />

    ), []);
    return (
        <View style={styles.seasonButtonBlock}>
                <Carousel
                    layout="default"
                    ref={ref}
                    data={carouselItems}
                    sliderWidth={screenWidth}
                    itemWidth={110}
                    sliderHeight={40}
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
    seasonButtonBlock:{
        display:'flex',
        flexDirection:'row',
        marginBottom:20
    },
    seasonButton:{
        width:100,
        height:40,
        backgroundColor:'#373737',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        overflow:'hidden',
    },
    seasonButtonText:{
        fontSize:15,
        color:'#fff'
    }
    
  });