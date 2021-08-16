import React,{PureComponent} from 'react';
import { View ,StyleSheet,Text,Dimensions,Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'
import {Datas} from '../context'


const { width: screenWidth } = Dimensions.get('window')

const arr = ['Комедия','Приключения','Драма',"Боевик","Триллер",'Семейный']

class Post extends PureComponent {
  constructor(props){
     super(props);
     this.item = props.item

  }
  render() { return( 
    <DrawerItem  pressColor={'#fff'}  style={styles.focusItem}   label='' icon={()=>(
      <View  style={styles.mainBlockItem}>
        <View style={styles.block1}>
            <Image style={styles.image} source={this.item.image}/>
        </View>
        <View style={styles.block2}>
          <Text style={styles.text}>{this.item.name}</Text>
        </View>
      </View>)}/>)
    }
  }

export default function BigJanrCarusel({navigation,gid,season}) {

    const {getJanr,isLogin} = React.useContext(Datas)
    const [data,setData] = React.useState([])

    React.useEffect(()=>{
      const fetch =async()=>{
        let data = await getJanr()
        let filtered = data.filter((item)=>{
           return arr.some((i)=>i === item.name)   
        })
    
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

     const renderItem = React.useCallback(({ item, index }) => {
      return(
      <Post item ={item}/>
    )}, []);
      
    return (
            <>
            <View style={{marginTop:10}}>
              {data?<Carousel
                layout="default"
                data={data}
                sliderWidth={screenWidth}
                itemWidth={195}
                sliderHeight={200}
                renderItem={renderItem}
                activeSlideAlignment="start"
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
              />:<></>}
            </View>
          </>

  
    );
  };
const styles = StyleSheet.create({
    
   
    mainBlockItem:{
        height: 190,
        width:180,
        position:'relative'
    },
    focusItem:{
        marginHorizontal:0,
        marginVertical:0,
        width:195
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
      width:80,
      height:80,
      resizeMode:'contain'
    },
    text:{
      color:'#fff',
      marginLeft:20
    }
  });