import React,{PureComponent} from 'react';
import { View ,StyleSheet,Text,Dimensions,Image, FlatList, Touchable, TouchableWithoutFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'
import {Datas} from '../context'


const { width: screenWidth } = Dimensions.get('window')

const arr = ['Комедия','Комедия','Приключения','Драма',"Боевик","Триллер",'Семейный',"Триллер",'Семейный',"Триллер",'Семейный',"Триллер"]

class Post extends PureComponent {
  constructor(props){
     super(props);
     this.item = props.item

  }
  render() { return( 
    <View  style={styles.focusItem} >
      <View  style={styles.mainBlockItem}>
        <View style={styles.block1}>
            <Image style={styles.image} source={this.item.image}/>
        </View>
        <View style={styles.block2}>
          <Text style={styles.text}>{this.item.name}</Text>
        </View>
      </View>
      </View>)
    }
  }

export default function BigJanrCarusel({pos,setPos}) {

    const {getJanr,isLogin} = React.useContext(Datas)
    const [data,setData] = React.useState([])
    const flatList = React.useRef(null)
    const [activeIndex,setIndex] = React.useState(null)
    const [visible,setVisible] = React.useState(false)

    React.useEffect(()=>{
      const fetch =async()=>{
        let data = await getJanr()
        let filtered = data.filter((item)=>{
           return arr.some((i)=>i === item.name)   
        })
        filtered.push(filtered[1])
        filtered.push(filtered[2])
        filtered.push(filtered[4])
        filtered.push(filtered[5])
        filtered.push(filtered[6])
        setData(filtered.map((item)=>{
            if(item.name === 'Комедия'){
                item.image = require('../images/janr1.png')
            }
             if(item.name === 'Приключения'){
                item.image = require('../images/janr2.png')
            }
             if(item.name === 'Драма'){
                item.image = require('../images/janr3.png')
            }
             if(item.name === 'Боевик'){
                item.image = require('../images/janr4.png')
            }
             if(item.name === 'Триллер'){
                item.image = require('../images/janr5.png')
            }
             if(item.name === 'Семейный'){
                item.image = require('../images/janr6.png')
            }

            return item

        }))
      }
      fetch()
    },[isLogin])

    React.useEffect(()=>{
      if(flatList.current&&data&&pos.main==='janr'){
        setVisible(true)
        if(!visible){
          setPos(activeIndex)
          setVisible(true)
        }else{
          setIndex(pos.index)
        }
        flatList.current.scrollToIndex({viewPosition:0,index:pos.index,animated:true })
      }else if(pos.main!=='janr'){
        setVisible(true)
      }
    },[flatList,data,pos])

    return (
            <>
            <View style={{marginTop:10}}>
              <TouchableWithoutFeedback><></></TouchableWithoutFeedback>
            {typeof activeIndex ==='number'?<View  style={{...styles.focused,marginLeft:activeIndex>data.length-8?screenWidth/8*(activeIndex-(data.length-8)):0}}></View>:<></>}
            {data?<FlatList 
              data={data}
              renderItem={({ item, index })=>  <Post item={item} index={index}/>}
              keyExtractor={(item,index) => index+100+''}
              horizontal={true}
              ref={flatList}
           
              getItemLayout={(data, index) => ({ index, length: screenWidth/8, offset: (screenWidth/8 * index) })}
            />:<></>}
            </View>
          </>

  
    );
  };
const styles = StyleSheet.create({
    
   
    mainBlockItem:{
        height: 110,
        width:screenWidth/8-10,
        position:'relative',
        marginLeft:-5
    },
    focusItem:{
        width:screenWidth/8,
        justifyContent:'center',
        alignItems:'center'
    },
    block1:{
      height:'80%',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:7,
      overflow:'hidden',
      backgroundColor:'#1c1c1c',
    },
    block2:{
      height:'20%',
      width:'100%',
      justifyContent:'flex-end'
    },
    image:{
      width:50,
      height:50,
      resizeMode:'contain'
    },
    text:{
      color:'#fff',
      marginLeft:5,
      fontSize:12
    },
    focused:{
      width:screenWidth/8-5,
      height:120,
      position:'absolute',
      backgroundColor:'#E41A4B',
      top:-5,
      borderRadius:7
    }
  });