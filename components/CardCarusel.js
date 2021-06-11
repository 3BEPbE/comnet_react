import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground, TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'
const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth >950
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
        <DrawerItem  pressColor={'#fff'}  style={{marginRight:-15}}   label='' onPress={()=>{props.navigation.navigate('Movie', { id:index })}} icon={()=>(
            <View  style={styles.mainBlockItem}>
                <ImageBackground source={require('../images/exampleImage.png')} style={styles.imgBlocl}>
                </ImageBackground>
                <Text style={styles.title}>Союз зверей: Спасение двуногих</Text>
            </View>
        )}/>
    ), []);
  
    return (
        <View style={styles.mainBlock}>
          <Carousel
            layout="default"
            ref={ref}
            data={carouselItems}
            sliderWidth={screenWidth}
            itemWidth={isTV?250:screenWidth/2-20}
            sliderHeight={240}
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
        padding:5,
        width:isTV?210:screenWidth/2+10,
    }
    
  });