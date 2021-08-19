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
                <Image source={{uri:this.item.thumbnail_big}} style={styles.image}/>
                <View>
                  <Text></Text>
                </View>
            </View>
        )}/>
    ) }
  }


export default function FilmCarusel({params,navigation,text}) {
    const {getFilms,isLogin} = React.useContext(Datas)
    const [data,setData] = React.useState()
 
    React.useEffect(()=>{
        const fetch =async()=>{
          let data = await getFilms(1,{limit:10,...params})
          setData(data)
        }
        fetch()
      },[isLogin])
   

    
    const renderItem = React.useCallback(({ item, index }) => {
      return(
           <Post navigation={navigation} item={item} index={index}/>
    )}, []);
  
    return (
        <>
        <View style={styles.container}>
          <Text style={styles.aksiyaText}>{text}</Text>
          {data?<Carousel
            layout="default"
            data={data}
            sliderWidth={screenWidth}
            itemWidth={190}
            sliderHeight={250}
            renderItem={renderItem}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            initialNumToRender={7}
          />:<></>}
        </View>
        </>
    );
  };
const styles = StyleSheet.create({
    container:{

        marginTop:20,
    },
    block:{
        width:180,
        height:200,
        backgroundColor:'#373737',
        borderRadius:7,
        overflow:'hidden',
        flexDirection:'row'
    },
    focus:{
        marginVertical:0,
        marginHorizontal:0,
        width:195,
    },
    image:{
      width:'100%',
      height:'80%',
      resizeMode:'stretch'
    }
  
  });