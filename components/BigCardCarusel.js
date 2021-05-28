import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground,Platform} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')
let isTV = screenWidth>1000
const exampleItems = [
    {
      image: require('../images/exampleImage.png'),
      imd:'8.1',
      kinopoisk:'8.0',
      title:'Необыкновенный плейлист Зои',
      text: 'После обследования головного мозга Зои получила дар телепатии. Эта суперспособность ...',
    },
    {
      image: require('../images/exampleImage.png'),
      imd:'8.1',
      kinopoisk:'8.0',
      title:'Необыкновенный плейлист Зои',
      text: 'После обследования головного мозга Зои получила дар телепатии. Эта суперспособность ...',
    },
    {
      image: require('../images/exampleImage.png'),
      imd:'8.1',
      kinopoisk:'8.0',
      title:'Необыкновенный плейлист Зои',
      text: 'После обследования головного мозга Зои получила дар телепатии. Эта суперспособность ...',
    },
    {
      image: require('../images/exampleImage.png'),
      imd:'8.1',
      kinopoisk:'8.0',
      title:'Необыкновенный плейлист Зои',
      text: 'После обследования головного мозга Зои получила дар телепатии. Эта суперспособность ...',
    },
    {
      image: require('../images/exampleImage.png'),
      imd:'8.1',
      kinopoisk:'8.0',
      title:'Необыкновенный плейлист Зои',
      text: 'После обследования головного мозга Зои получила дар телепатии. Эта суперспособность ...',
    },
  ];
export default function BigCardCarusel(props) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [carouselItems, setCarouselItems] = React.useState(exampleItems);
    const ref = React.useRef(null);
   
    console.log(isTV)

    const renderItem = React.useCallback(({ item, index }) => (
        <View >
            <ImageBackground source={item.image} style={styles.imgBlocl}>
                <ImageBackground source={require('../images/example.jpg')} style={styles.textBlock}>
                    <View style={styles.ranking}>
                        <View style={styles.rankingItem}>
                                <Text  style={styles.rankingNumber}>{item.imd}</Text>
                                <Text style={styles.rankingText}>IMDb</Text>
                        </View>
                        <View style={styles.rankingItem}>
                                <Text style={styles.rankingNumber}>{item.kinopoisk}</Text>
                                <Text style={styles.rankingText}>КиноПоиск</Text>
                        </View>
                    </View>
                    <View style={styles.nameBlock}><Text style={styles.name}>{item.title}</Text></View>
                    <Text style={styles.about}>{item.text}</Text>
                </ImageBackground>    
            </ImageBackground>
        </View>
    ), []);
  
    return (
        <View style={{ marginTop:20,marginBottom:20}}>
          <Carousel
            layout="default"
            ref={ref}
            data={carouselItems}
            sliderWidth={screenWidth}
            itemWidth={isTV?screenWidth-400:340}
            sliderHeight={isTV?700:300}
            renderItem={renderItem}
            activeSlideAlignment={'center'}
            onSnapToItem={(index) => setActiveIndex(index)}
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
        justifyContent:'flex-end'
    },
    textBlock:{
        height: (isTV?280*1.77:300),
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