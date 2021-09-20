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
    }

    render() { return( 
       <View style={{...styles.item,backgroundColor:this.item.status?'#E41A4B':'#1c1c1c'}}>
           <Text style={styles.name}>
               {this.item.text}
           </Text>
       </View>
    ) }
  }

export default function DayCarusel({days}){

    const ref = React.useRef()

    React.useEffect(()=>{
        if(days&&ref.current){
           const index = days.findIndex((item)=>item.status)
           ref.current.scrollToIndex({ animated: false, index: index });
        }
    },[days,ref])

    return(
        <>
        {days?<View >
            <FlatList
                ref={ref}
                style={styles.flatList}
                data={days}
                keyExtractor={(item) => `${item.text}`}
                renderItem={({item,index})=><Post item={item} index={index} />}
                horizontal={true}
                getItemLayout={(data, index) => ({  length: 35, offset: (100 * index),index })}
                extraData={days}
            />
      </View>:<></>}
      </>
    )
} 
const styles = StyleSheet.create({
    item:{
        width:90,
        height:35,
        backgroundColor:'#1c1c1c',
        borderRadius:7,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
        marginRight:10
    },
    name:{
        color:'#fff',
        fontSize:18
    },
    flatList:{
        width:screenWidth-40,
        marginTop:20,
        marginBottom:10
    }
  });
  