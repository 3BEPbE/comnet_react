import React from "react";
import { View,Dimensions,FlatList,ImageBackground,Text,StyleSheet, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Datas } from "../context";

const {width:screenWidth} = Dimensions.get('window')

class Post extends React.PureComponent {
    constructor(props){
       super(props);
       this.item = props.item
       this.index = props.index
       this.navigation = props.navigation
    }

    render() { return( 
       <View style={styles.item}>
           <Image style={styles.images} source={{uri:this.item.thumbnail_big}}/>
           <Text style={styles.name}>{this.item.name.length>17?`${this.item.name.slice(0,17)}...`:this.item.name}</Text>
       </View>
    ) }
  }

export default function DayCarusel({navigation,condition}){

    const [data,setData] = React.useState()
    const {getFilms} = React.useContext(Datas)

    React.useEffect(()=>{
        const fetch = async()=>{
            const response = await getFilms(1,{limit:12,...params})
            setData(response)
        }
        fetch()
    },[])

    return(
        <>
        {data?<View style={{ marginTop:20,marginBottom:20,marginLeft:20}}>
        <Text style={styles.title}>{condition}</Text>
        <Carousel 
            data={data}
            renderItem={({ item, index })=>  <Post navigation={navigation} item={item} index={index}/>}
            sliderWidth={screenWidth}
            sliderHeight={265}
            itemWidth={180}
            windowSize={screenWidth}
            activeSlideAlignment={'start'}
          />
      </View>:<></>}
      </>
    )
} 
const styles = StyleSheet.create({
    item:{
        width:180,
        height:265,
        backgroundColor:'#1c1c1c',
        borderRadius:7,
        overflow:'hidden'
    },
    images:{
        width:180,
        height:225,
        resizeMode:'stretch'
    },
    title:{
        fontSize:22,
        color:'#fff',
        marginBottom:5
    },
    name:{
        color:'#fff',
        marginLeft:10,
        marginTop:10,
    }
  });
  