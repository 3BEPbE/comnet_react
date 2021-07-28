import React,{PureComponent} from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground, TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'
import {Datas} from './../context/context'


const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth >950


class Post extends PureComponent {
  constructor(props){
     super(props);
     this.item = props.item
     this.index =props.index
     this.navigation =props.navigation
  }
  render() { return( 
    <DrawerItem  pressColor={'#fff'}  style={{width:isTV?230:screenWidth/2-15}}   label='' onPress={()=>{this.navigation.navigate('Movie', this.item)}} icon={()=>(
      <View  style={styles.mainBlockItem}>
          <ImageBackground resizeMode={'stretch'} source={{uri:this.item.thumbnail_small}} style={styles.imgBlocl}>
          </ImageBackground>
          <Text style={styles.title}>{this.item.name.length>25?`${this.item.name.slice(0,25)}...`:this.item.name}</Text>
      </View>)}/>)
    }
  }

export default function CardCarusel({navigation,gid,season}) {

    const {getFilms,isLogin} = React.useContext(Datas)
    const [data,setData] = React.useState([])

    React.useEffect(()=>{
      const fetch =async()=>{
        let data = await getFilms(1,{gid,season})
        setData(data)
      }
      fetch()
    },[isLogin])
    const renderItem = React.useCallback(({ item, index }) => {
   
      return(
      <Post item ={item} navigation={navigation} index={index}/>
    )}, []);
      
    return (
        <View style={styles.mainBlock}>
          {data?<Carousel
            layout="default"
            data={data}
            sliderWidth={screenWidth}
            itemWidth={isTV?250:screenWidth/2-20}
            sliderHeight={260}
            renderItem={renderItem}
            activeSlideAlignment="start"
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />:<></>}
        </View>
  
    );
  };
const styles = StyleSheet.create({
    
    imgBlocl:{
        borderRadius: 8,
        overflow:'hidden',
        height: 220,
        display:'flex',
        justifyContent:'flex-end',
     
    },
    mainBlockItem:{
        height: 260,
        width:isTV?210:screenWidth/2-30,
    },
    mainBlock:{
      marginBottom:20,
    },
    title:{
        fontSize:14,
        color:'#fff',
        paddingBottom:5,
        paddingTop:5,
        paddingRight:10,
        paddingLeft:10,
        width:isTV?210:screenWidth/2-20,
    }
    
  });