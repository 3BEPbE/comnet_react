import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image,TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'

const { width: screenWidth } = Dimensions.get('window')

export default function SeasonCarusel(props) {
    const ref = React.useRef(null);
    const renderItem = () => (
    <DrawerItem pressColor='#fff' style={{marginHorizontal:0,marginVertical:0,width:180}} label='' icon={()=>(
        <View style={styles.TariffsButton}>
        { props.pay ?<> 
        <View style={styles.dotBlock}>
             <View style={{...styles.dot,display:item.name==='Start'?'flex':'none'}}></View>
         </View>
         <View style={styles.tarifSection}>
             <Text style={styles.TariffsName}>{item.name}</Text>
             <Text style={styles.TariffsPrice}>{item.price} сум/месяц</Text>
         </View></>:<>
         <View style={styles.card}>
             <Image style={styles.payImage} source={item.image}/>
         </View>
         </>}
     </View>
    )} />)
    return (
        <View style={styles.Tariffs}>
                <Carousel
                    layout="default"
                    ref={ref}
                    data={props.data?props.data:[]}
                    sliderWidth={screenWidth}
                    itemWidth={190}
                    sliderHeight={90}
                    renderItem={renderItem}
                    activeSlideAlignment="start"
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
        marginBottom:20,
        marginRight:20
    },
    TariffsButton:{
        width:180,
        height:90,
        borderRadius:7,
        overflow:'hidden',
        marginLeft:-8,
        borderColor:'#E41A4B',
        borderWidth:1
    },
    TariffsPrice:{
        fontSize:14,
        color:'#fff'
    },
    TariffsName:{
        fontSize:15,
        color:'#fff',
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
    },
    card:{
        alignItems:'center',
        backgroundColor:'#fff'
    }
  });