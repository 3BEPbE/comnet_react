import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')
const exampleItems = [
    {
      title: 'Item 1',
      text: 'Text 1',
    },
    {
      title: 'Item 2',
      text: 'Text 2',
    },
    {
      title: 'Item 3',
      text: 'Text 3',
    },
    {
      title: 'Item 4',
      text: 'Text 4',
    },
    {
      title: 'Item 5',
      text: 'Text 5',
    },
  ];
export default function BigCardCarusel(props) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [carouselItems, setCarouselItems] = React.useState(exampleItems);
    const ref = React.useRef(null);
    const renderItem = React.useCallback(({ item, index }) => (
  
        <View  style={styles.mainBlock}>
            <ImageBackground source={require('../images/exampleImage.png')} style={styles.imgBlocl}>
            </ImageBackground>
            <Text style={styles.title}>Союз зверей: Спасение двуногих</Text>
        </View>
    ), []);
  
    return (
        <View style={{ marginTop:20,marginBottom:20}}>
          <Carousel
            layout="default"
            ref={ref}
            data={carouselItems}
            sliderWidth={screenWidth}
            itemWidth={screenWidth-205}
            sliderHeight={(screenWidth-205)*1.2}
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
        height: (screenWidth-205)*1.2 -40,
        display:'flex',
        justifyContent:'flex-end'
    },
    mainBlock:{
        height: (screenWidth-205)*1.2,
        marginLeft:10
    },
    title:{
        fontSize:14,
        color:'#fff',
        padding:5
    }
    
  });