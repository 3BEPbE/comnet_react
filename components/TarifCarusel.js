import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image,TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')

export default function SeasonCarusel(props) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [carouselItems, setCarouselItems] = React.useState(['Start','Мульти-аккаунт 2','Мульти-аккаунт 2','Мульти-аккаунт 2','Мульти-аккаунт 2','Мульти-аккаунт 2','Мульти-аккаунт 2']);
    const ref = React.useRef(null);
    const renderItem = React.useCallback(({ item, index }) => (
    <TouchableWithoutFeedback>
        <View style={styles.TariffsButton}>
           { props.pay ?<> 
           <View style={styles.dotBlock}>
                <View style={{...styles.dot,display:item==='Start'?'flex':'none'}}></View>
            </View>
            <View style={styles.tarifSection}>
                <Text style={styles.TariffsName}>{item}</Text>
                <Text style={styles.TariffsPrice}>15000 сум/месяц</Text>
            </View></>:<>
            <View style={{alignItems:'center'}}>
                <Image style={styles.payImage} source={require('../images/apelsin.png')}/>
            </View>
            </>}
        </View>       
    </TouchableWithoutFeedback>
    ), []);
    return (
        <View style={styles.Tariffs}>
                <Carousel
                    layout="default"
                    ref={ref}
                    data={carouselItems}
                    sliderWidth={screenWidth}
                    itemWidth={180}
                    sliderHeight={90}
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
    Tariffss:{
        display:'flex',
        flexDirection:'row',
        marginBottom:20
    },
    TariffsButton:{
        width:170,
        height:90,
        marginLeft:5,
        marginRight:20,
        borderRadius:7,
        overflow:'hidden',
        marginTop:5,
        borderColor:'#F08019',
        borderWidth:1
    },
    TariffsPrice:{
        fontSize:14,
        color:'#F08019'
    },
    TariffsName:{
        fontSize:15,
        color:'#F08019',
        fontWeight:'bold',
        marginBottom:8
    },
    dotBlock:{
        height:24,
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        padding:10
    },
    dot:{
        width:9,
        height:9,
        backgroundColor:'#E41A4B',
        borderRadius:100,
        overflow:'hidden',
        shadowColor: "#E41A4B",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,

        elevation: 2,
    },
    tarifSection:{
        paddingLeft:10,
        justifyContent:'space-between'
    },
    payImage:{
        width:120,
        height:90,
        resizeMode:'contain'
    }
  });