import React, { PureComponent } from 'react';
import { View ,StyleSheet,Text,Dimensions,Image, FlatList, TouchableWithoutFeedback} from 'react-native';
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
      <TouchableWithoutFeedback>
         <View style={styles.focus}>
              <View style={styles.block}>
                <Image source={{uri:this.item.thumbnail_big}} style={styles.image}/>
                <View style={styles.block2}>
                  <Text style={styles.name}>{this.item.name.length>20?`${this.item.name.slice(0,20)}...`:this.item.name}</Text>
                </View>
              </View>
          </View>
      </TouchableWithoutFeedback> 
    )}
  }


export default function FilmCarusel({params,navigation,text,pos,setPos,name,condition,searchText,enterPress}) {
    const {getFilms,isLogin,searchFilm} = React.useContext(Datas)
    const [data,setData] = React.useState([])
    const flatList = React.useRef(null)
    const [activeIndex,setIndex] = React.useState(0)
    const [visible,setVisible] = React.useState(false)
    const count = React.useRef(0)
 
    React.useEffect(()=>{
        const fetch =async()=>{
          if(condition!=='search'){
            let data = await getFilms(1,{limit:12,...params})
            setData(data)}
          else{
            if(searchText.length>3){
              let data = await searchFilm(searchText)
              setData(data.filter((i)=>i.thumbnail_big))
              setIndex(0)
            }else{
              let data = await getFilms(1,{limit:12,...params})
              setData(data)
            }
          }
        }
        fetch()
      },[isLogin,params,searchText])
   
      React.useEffect(()=>{
        if(pos.main===name&&!data.length){
          setPos({main:'search'})
        }
        if(flatList.current&&data&&pos.main===name){
          if(!visible){
            if(data.length-6<activeIndex+1){
                if(data.length<=6){
                  setPos({main:name,index:0})    
                }else{
                  setPos({main:name,index:data.length-6})
                }
            }else{
              setPos({main:name,index:activeIndex})
            }
            
          }else{
            if(pos.index+1>data.length&&data.length){
              setPos({main:name,index:pos.index-1})
            }else{
              setIndex(pos.index)
              if(data.length>=6){
                flatList.current.scrollToIndex({viewPosition:0,index:pos.index,animated:true })
              }
            }
          }
          setVisible(true)
        }else if(pos.main!==name){
          setVisible(false)
        }
        },[flatList,data,pos])
      React.useEffect(()=>{
        if(pos.main === name && typeof pos.index =='number'){
          if(count.current===0){
            count.current++
          }else{
            navigation.navigate('CurrentMovie',data[pos.index])
          }
        }
      },[enterPress])
  
    return (
        <>
        <View style={styles.container}>
          <Text style={styles.aksiyaText}>{text}</Text>
          {typeof activeIndex ==='number'&&visible&&data.length?<View  style={{...styles.focused,marginLeft:data.length<6?activeIndex*(screenWidth/6): activeIndex>data.length-6?screenWidth/6*(activeIndex-(data.length-6)):0}}></View>:<></>}
          {data.length?<FlatList 
            data={data}
            renderItem={({ item, index })=>  <Post activeIndex={activeIndex} navigation={navigation} item={item} index={index}/>}
            keyExtractor={item => item.id+''}
            horizontal={true}
            ref={flatList}
            scrollEnabled={false}
            extraData={data}
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