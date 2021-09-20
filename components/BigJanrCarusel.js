import React,{PureComponent} from 'react';
import { View ,StyleSheet,Text,Dimensions,Image, FlatList, Touchable, TouchableWithoutFeedback} from 'react-native';
import {Datas} from '../context'


const { width: screenWidth } = Dimensions.get('window')

const arr = ['Комедия','Комедия','Приключения','Драма',"Боевик","Триллер",'Семейный',"Триллер",'Семейный',"Триллер",'Семейный',"Триллер"]

class Post extends React.Component {
  constructor(props){
     super(props);
     this.item = props.item
     this.index = props.index
  }
  render() { 
    return( 
    <>
        <View  style={styles.focusItem} >
      <View  style={styles.mainBlockItem}>
        <View style={{...styles.block1,backgroundColor:this.index===this.item.pressed ? '#E41A4B':'#1c1c1c'}}>
            <Image style={styles.image} source={this.index===this.item.pressed ? this.item.imageuzb : this.item.image}/>
        </View>
        <View style={styles.block2}>
          <Text style={styles.text}>{this.item.name}</Text>
        </View>
      </View>
      </View>
    </>)
    }
  }

export default function BigJanrCarusel({pos,setPos,enterPress,setChosedJanr}) {

    const {getJanr,isLogin} = React.useContext(Datas)
    const [data,setData] = React.useState([])
    const flatList = React.useRef(null)
    const [activeIndex,setIndex] = React.useState(0)
    const [visible,setVisible] = React.useState(false)

    React.useEffect(()=>{
      const fetch =async()=>{
        const data = await getJanr()
        if(data){
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
                 item.imageuzb = require('../images/janruzb1.png')
             }
              if(item.name === 'Приключения'){
                 item.image = require('../images/janr2.png')
                 item.imageuzb = require('../images/janruzb2.png')
             }
              if(item.name === 'Драма'){
                 item.image = require('../images/janr3.png')
                 item.imageuzb = require('../images/janruzb3.png')
             }
              if(item.name === 'Боевик'){
                 item.image = require('../images/janr4.png')
                 item.imageuzb = require('../images/janruzb4.png')
             }
              if(item.name === 'Триллер'){
                 item.image = require('../images/janr5.png')
                 item.imageuzb = require('../images/janruzb5.png')
             }
              if(item.name === 'Семейный'){
                 item.image = require('../images/janr6.png')
                 item.imageuzb = require('../images/janruzb6.png')
             }
 
             return item
 
         }))
        }   
      }
      fetch()
    },[isLogin])

    React.useEffect(()=>{
        if(flatList.current&&data&&pos.main==='janr'){
          if(!visible){
            if(data.length-8<activeIndex+1){
              setPos({main:'janr',index:data.length-8})
            }else{
              setPos({main:'janr',index:activeIndex})
            }
            
          }else{
            setIndex(pos.index)
            flatList.current.scrollToIndex({viewPosition:0,index:pos.index,animated:true })
          }
          setVisible(true)
        }else if(pos.main!=='janr'){
          setVisible(false)
        }
    },[flatList,data,pos])

    React.useEffect(()=>{
      if(pos.main==='janr'){
        setChosedJanr(data[pos.index].name)
        setData(data.map(item=>{
          item.pressed = pos.index
          return item
        }))
      }
    },[enterPress])
    return (
            <>
            <View style={{marginTop:10}}>
            {typeof activeIndex ==='number'&&visible&&data?<View  style={{...styles.focused,marginLeft:activeIndex>data.length-8?screenWidth/8*(activeIndex-(data.length-8)):0}}></View>:<></>}
            {data?<FlatList 
              data={data}
              renderItem={({ item, index })=>   <Post   item={item} index={index}/>}
              keyExtractor={(item,index) => index+100+''}
              horizontal={true}
              ref={flatList}
              scrollEnabled={false}
              extraData={data}
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