import React from "react";
import { View,Dimensions,Image,Text,StyleSheet } from "react-native";
import { converter } from "../helper";
const {width:screenWidth} = Dimensions.get('window')

export default class TimeCarusel extends React.PureComponent {
    constructor(props){
       super(props);
       this.item = props.item
       this.index = props.index
       this.currentTime = new Date().getTime()/1000
       this.now = false
       this.watched = false
       if(this.item.end_time<this.currentTime){
           this.watched = true
       }else{
           if(this.item.begin_time<this.currentTime){
               this.now = true
               this.watched = false
           }
       }
    }

    render() { return( 
       <View style={{...styles.item,backgroundColor:!this.watched&&!this.now?'#373636':'#1c1c1c'}}>
         <View style={styles.block}>
             <View style={styles.textBlock}>
                 <Text style={styles.name}>{this.item.name.length>20?`${this.item.name.slice(0,20)}...`:this.item.name}</Text>
                 <Text style={styles.time}>{converter(this.item.begin_time)} - {converter(this.item.end_time)}</Text>
             </View>
            <Image source={!this.now&&this.watched? require('../images/startIcon.png') : require('../images/shine.png')} style={{...styles.watched,opacity:!this.watched&&!this.now?0:1}}/>
         </View>
       </View>
    ) }
  }


const styles = StyleSheet.create({

    item:{
        width:screenWidth-40,
        height:70,
        backgroundColor:'#1c1c1c',
        marginTop:10,
        borderRadius:7,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    block:{
        height:60,
        width:screenWidth-40,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    textBlock:{
        height:60,
        justifyContent:'space-between',
        width:'80%'
    },
    name:{
        color:'#fff',
        fontSize:20,
        marginLeft:20
    },
    time:{
        color:'#fff',
        fontSize:18,
        marginLeft:20
    },
    watched:{
        width:15,
        height:15  ,
        resizeMode:'contain',
        marginRight:10,
        marginTop:5
    },
  });
  