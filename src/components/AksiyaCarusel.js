import React, { PureComponent } from 'react';
import { View ,StyleSheet,Text,Dimensions,Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DrawerItem} from '@react-navigation/drawer'
import {Datas} from '../context'
import { HeaderTV } from './HeaderTv';


const { width: screenWidth } = Dimensions.get('window')
let isTV = screenWidth>950

class Post extends PureComponent {
    constructor(props){
       super(props);
       this.item = props.item
    }

    render() { return( 
        <DrawerItem pressColor='#fff' style={styles.focus} label='' icon={()=>(
            <View style={styles.block}>
                <Image source={this.item.image} style={styles.item1}/>
                <View style={styles.item2}>
                    <Text style={styles.title}>Фильмы и сериалы от Амедиатека со скидкой 25%</Text>
                    <Text style={styles.description}>Без ограничений по времени</Text>
                </View>
            </View>
        )}/>
    ) }
  }


export default function AksiyaCarusel({gid,navigation}) {
    const {getFilms,isLogin} = React.useContext(Datas)

    const [data,setData] = React.useState([{image:require('../images/aksiya_axample.png')},{image:require('../images/aksiya_axample.png')},{image:require('../images/aksiya_axample.png')}])
 
    // React.useEffect(()=>{
    //     const fetch =async()=>{
    //       let data = await getFilms(1,{gid})
    //       setData(data)
    //     }
    //     fetch()
    //   },[isLogin])
   

    
    const renderItem = React.useCallback(({ item, index }) => {
      return(
           <Post navigation={navigation} item={item} index={index}/>
    )}, []);
  
    return (
        <>
        <HeaderTV/>
        <View style={styles.container}>
          <Text style={styles.aksiyaText}>Акции</Text>
          <Carousel
            layout="default"
            data={data}
            sliderWidth={screenWidth-40}
            itemWidth={(screenWidth-40)/2}
            sliderHeight={250}
            renderItem={renderItem}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            initialNumToRender={7}
          />
        </View>
        </>
    );
  };
const styles = StyleSheet.create({
    container:{
        marginLeft:20,
        marginTop:20,
    },
    block:{
        width:(screenWidth-40)/2-15,
        height:250,
        backgroundColor:'#373737',
        borderRadius:7,
        overflow:'hidden',
        flexDirection:'row'
    },
    focus:{
        marginVertical:0,
        marginHorizontal:0,
        width:(screenWidth-40)/2
    },
    item1:{
        width:'45%',
        height:'100%',
        resizeMode:'contain'
    },
    item2:{
        width:'55%',
        height:'100%',
        justifyContent:'space-around',
        zIndex:3,
        alignItems:'center'
    },
    title:{
        color:'#fff',
        width:280   ,
        fontSize:20,
        lineHeight:40
    },
    description:{
        color:'#fff',
        width:280,
        fontSize:18

    },
    aksiyaText:{
        fontSize:36,
        color:'#fff',
        marginLeft:5,
        marginBottom:15
    }
  });