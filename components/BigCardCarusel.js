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
  
        <View >
            <ImageBackground source={require('../images/exampleImage.png')} style={styles.imgBlocl}>
                <ImageBackground source={require('../images/corusulGradient.png')} style={styles.textBlock}>
                    <View style={styles.ranking}>
                        <View style={styles.rankingItem}>
                                <Text  style={styles.rankingNumber}>8.1</Text>
                                <Text style={styles.rankingText}>IMDb</Text>
                        </View>
                        <View style={styles.rankingItem}>
                                <Text style={styles.rankingNumber}>8.0</Text>
                                <Text style={styles.rankingText}>КиноПоиск</Text>
                        </View>
                    </View>
                    <View style={styles.nameBlock}><Text style={styles.name}>Необыкновенный плейлист Зои</Text></View>
                    <Text style={styles.about}>После обследования головного мозга Зои получила дар телепатии. Эта суперспособность ...</Text>
                </ImageBackground>    
            </ImageBackground>
        </View>
    ), []);
  
    return (
        <View style={{ marginTop:20}}>
          <Carousel
            layout="default"
            ref={ref}
            data={carouselItems}
            sliderWidth={screenWidth}
            itemWidth={screenWidth-60}
            sliderHeight={screenWidth}
            renderItem={renderItem}
            activeSlideAlignment={'center'}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
        </View>
  
    );
  };
const styles = StyleSheet.create({
    
    imgBlocl:{
        borderRadius: 8,
        overflow:'hidden',
        height: 300,
        display:'flex',
        justifyContent:'flex-end'
    },
    textBlock:{
        height: 300,
        display:'flex',
        justifyContent:'flex-end',
        padding:15
    },
    about:{
        width:screenWidth-90,
        fontSize:12,
        color:'#fff'
    },
    name:{
        width:screenWidth-130,
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