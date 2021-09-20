import React from "react";
import { View,Dimensions,Text,StyleSheet, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Datas } from "../context";

const {width:screenWidth} = Dimensions.get('window')

const data = [
    {image:require('../images/channels/1.png')},
    {image:require('../images/channels/2.png')},
    {image:require('../images/channels/3.png')},
    {image:require('../images/channels/4.png')},
    {image:require('../images/channels/5.png')},
    {image:require('../images/channels/6.png')},
    {image:require('../images/channels/7.png')},
    {image:require('../images/channels/8.png')},
    {image:require('../images/channels/9.png')},
    {image:require('../images/channels/10.png')},
    {image:require('../images/channels/11.png')},
    {image:require('../images/channels/12.png')},
]

const data2 = [
    {image:require('../images/channels/13.png')},
    {image:require('../images/channels/14.png')},
    {image:require('../images/channels/15.png')},
    {image:require('../images/channels/16.png')},
    {image:require('../images/channels/17.png')},
    {image:require('../images/channels/18.png')},
    {image:require('../images/channels/19.png')},
    {image:require('../images/channels/20.png')},
    {image:require('../images/channels/21.png')},
    {image:require('../images/channels/22.png')},
    {image:require('../images/channels/23.png')},
    {image:require('../images/channels/24.png')},
]
class Post extends React.PureComponent {
    constructor(props){
       super(props);
       this.item = props.item
       this.index = props.index
       this.navigation = props.navigation
    }

    render() { return( 
       <View style={styles.item}>
           <View style={styles.imageBlock}>
                <Image style={styles.images} source={this.item.image}/>
           </View>
           <Text style={styles.name}>{this.index}</Text>
       </View>
    ) }
  }

export default function ChannelCarusel({navigation,condition}){

    return(
        <>
        {data?<View style={{ marginTop:20,marginBottom:20,marginLeft:20}}>
        <Carousel 
            data={condition===1?data:data2}
            renderItem={({ item, index })=>  <Post navigation={navigation} item={item} index={index}/>}
            sliderWidth={screenWidth}
            sliderHeight={130}
            itemWidth={180}
            windowSize={screenWidth}
            activeSlideAlignment={'start'}
            inactiveSlideOpacity={1}
          />
      </View>:<></>}
      </>
    )
} 
const styles = StyleSheet.create({
    item:{
        width:180,
        height:130,
        backgroundColor:'#1c1c1c',
        borderRadius:7,
        overflow:'hidden'
    },
    images:{
        width:180,
        height:104,
        resizeMode:'contain'
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
    },
    imageBlock:{
        width:180,
        height:104,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    }
  });
  