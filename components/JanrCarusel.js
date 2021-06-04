import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground,TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'


const { width: screenWidth } = Dimensions.get('window')

export default function Janr(props) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [carouselItems, setCarouselItems] = React.useState(['Комедии','Драма','Джейн Леви','Драма','Драма','Драма','Драма']);
    const ref = React.useRef(null);
    const renderItem = React.useCallback(({ item, index }) => (
    <DrawerItem style={{marginRight:-13}} label='' icon={()=>(     
    <View style={{...styles.seasonButton,backgroundColor:'#373737'}}>
        <Text style={styles.seasonButtonText}> {item}</Text>
    </View>  )}/>
        
    ), []);
    return (
        <View style={styles.seasonButtonBlock}>
                <Carousel
                    layout="default"
                    ref={ref}
                    data={carouselItems}
                    sliderWidth={screenWidth}
                    itemWidth={120}
                    sliderHeight={35}
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
        width:110,
        height:35,
        marginLeft:5,
        backgroundColor:'#373737',
        alignItems:'center',
        justifyContent:'center',
        marginRight:20,
        borderRadius:50,
        overflow:'hidden',

    },
    seasonButtonText:{
        fontSize:15,
        color:'#fff'
    }
    
  });