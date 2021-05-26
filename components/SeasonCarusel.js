import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground,TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')

export default function SeasonCarusel(props) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [carouselItems, setCarouselItems] = React.useState([1,2,3,4,5,6,7]);
    const ref = React.useRef(null);
    const renderItem = React.useCallback(({ item, index }) => (
    <TouchableWithoutFeedback>
        <View style={{...styles.seasonButton,backgroundColor:(index===0?'#373737':'transperent')}}>
           <Text style={styles.seasonButtonText}>СЕЗОН {item}</Text>
        </View>       
    </TouchableWithoutFeedback>
    ), []);
    return (
        <View style={styles.seasonButtonBlock}>
                <Carousel
                    layout="default"
                    ref={ref}
                    data={carouselItems}
                    sliderWidth={screenWidth}
                    itemWidth={90}
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
        marginLeft:20,
        marginBottom:20
    },
    seasonButton:{
        width:80,
        height:40,
        marginLeft:5,
        backgroundColor:'#373737',
        alignItems:'center',
        justifyContent:'center',
        marginRight:20,
        borderRadius:7,
        overflow:'hidden',
        marginTop:5
    },
    seasonButtonText:{
        fontSize:15,
        color:'#fff'
    }
    
  });