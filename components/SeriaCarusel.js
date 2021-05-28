import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image,TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth>1000
export default function SerialCarusel(props) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [carouselItems, setCarouselItems] = React.useState([1,2,3,4,5,6,7]);
    const ref = React.useRef(null);
    const renderItem = React.useCallback(({ item, index }) => (
        <TouchableWithoutFeedback>
            <>
                <View>
                    <Image style={styles.image} source={require('../images/exampleImage.png')}/>
                </View>
                <Text style={styles.text}>{item}-я серия</Text>    
            </>   
        </TouchableWithoutFeedback>
    ), []);
    return (
        <View style={styles.mainBlock}>
                <Carousel
                    layout="default"
                    ref={ref}
                    data={carouselItems}
                    sliderWidth={screenWidth}
                    itemWidth={(isTV?360:140)}
                    sliderHeight={100}
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
    image:{
        height:(isTV?180:100),
        borderRadius:4,
        overflow:'hidden',
        resizeMode:'cover',
        width:(isTV?350:130),
    },
    mainBlock:{
        marginLeft:20,
        marginBottom:20
    },
    text:{
        color:'#fff',
        fontSize:14,
        marginTop:2
    }
    
  });