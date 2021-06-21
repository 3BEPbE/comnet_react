import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground, Image} from 'react-native';
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
                <View style={styles.bottomBlock}>
                  <View style={styles.textBlock}>
                    <Text style={styles.text}>Русский роман HD</Text>
                    <Text style={styles.text}>00:20 - 03:30</Text>
                  </View>
                  <View style={styles.logoBlock}>
                    <Image style={styles.logo} source={require('../images/channelLogo.png')}/>
                  </View>
                </View>
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
            sliderHeight={200}
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
        borderBottomEndRadius:0,
        borderBottomStartRadius:0,
        overflow:'hidden',
        height: 100,
        display:'flex',
        justifyContent:'flex-end',
        resizeMode:'contain'
    },
    mainBlockItem:{
        height: 250,
        width:isTV?210:screenWidth/2-30,
        backgroundColor:'#242424',
        borderRadius: 8,
    },
    mainBlock:{
      marginBottom:20,
    },
    logo:{
      width:36,
      height:36,
      resizeMode:'contain'
    },
    bottomBlock:{
      height:150,
      padding:10,
      justifyContent:'space-between'
    },
    text:{
      color:'#fff',
      fontSize:14
    },
    logoBlock:{
      alignItems:'flex-end'
    }
    
  });