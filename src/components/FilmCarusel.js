import React, { PureComponent } from 'react';
import { View ,StyleSheet,Text,Dimensions,Image, FlatList} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DrawerItem} from '@react-navigation/drawer'
import {Datas} from '../context'
import { HeaderTV } from './HeaderTv';


const { width: screenWidth } = Dimensions.get('window')

class Post extends React.Component {
    constructor(props){
       super(props);
       this.item = props.item
       this.index = props.index
       this.activeIndex = props.activeIndex
    }

    render() { return( 
          <View style={styles.focus}>
              <View style={styles.block}>
                <Image source={{uri:this.item.thumbnail_big}} style={styles.image}/>
                <View style={styles.block2}>
                  <Text style={styles.name}>{this.item.name.lenght>15?this.item.name:`${this.item.name.slice(0,15)}...`}</Text>
                </View>
              </View>
          </View>
    )}
  }


export default function FilmCarusel({params,navigation,text,pos}) {
    const {getFilms,isLogin} = React.useContext(Datas)
    const [data,setData] = React.useState()
    const flatList = React.useRef(null)
    const [activeIndex,setIndex] = React.useState(null)
 
    React.useEffect(()=>{
        const fetch =async()=>{
          let data = await getFilms(1,{limit:10,...params})
          setData(data)
        }
        fetch()
      },[isLogin,params])
   
      React.useEffect(()=>{
        if(flatList.current&&data&&pos.main==='carusel1'){
          setIndex(pos.index)
          flatList.current.scrollToIndex({viewPosition:0,index:pos.index,animated:true })
        }else if(pos.main!=='carusel1'){
          setIndex(null)
        }
      },[flatList,data,pos])
    
  
    return (
        <>
        <View style={styles.container}>
          <Text style={styles.aksiyaText}>{text}</Text>
          {typeof activeIndex ==='number'?<View  style={{...styles.focused,marginLeft:activeIndex-6>=1?screenWidth/6*(activeIndex-6):0}}></View>:<></>}
          {data?<FlatList 
            data={data}
            renderItem={({ item, index })=>  <Post activeIndex={activeIndex} navigation={navigation} item={item} index={index}/>}
            keyExtractor={item => item.id+''}
            horizontal={true}
            ref={flatList}
            scrollEnabled={false}
            getItemLayout={(data, index) => ({ index, length: screenWidth/6, offset: (screenWidth/6 * index) })}
          />:<></>}
        </View>
        </>
    );
  };
const styles = StyleSheet.create({
    container:{
        position:'relative',
        marginTop:20,
    },
    block:{
        width:screenWidth/6-10,
        height:200,
        borderRadius:7,
        overflow:'hidden',
    },
    focus:{
        justifyContent:'center',
        alignItems:'center',
        width:screenWidth/6,
    },
    image:{
      width:'100%',
      height:'85%',
      resizeMode:'stretch'
    },
    aksiyaText:{
      color:'#fff',
      marginLeft:20,
      marginBottom:10
    },
    name:{
      color:'#fff',
      fontSize:12
    },
    block2:{
      height:'20%',
      justifyContent:'center'
    },
    focused:{
      width:screenWidth/6,
      height:210,
      position:'absolute',
      backgroundColor:'#E41A4B',
      top:20,
      borderRadius:7
    }
  
  });