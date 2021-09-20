import { FlatList,View,Text,Image,StyleSheet,Dimensions } from "react-native";
import { Datas } from "../context";
import React from "react";
import { converter,width } from "../helper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

class Post extends React.PureComponent {
    constructor(props){
       super(props);
       this.item = props.item
       this.index = props.index
       this.navigation = props.navigation
    }

    render() { return( 
        <TouchableWithoutFeedback onPress={()=>this.navigation.navigate('CurrentChannelPhone',this.item)}>
            <View style={styles.item}>
                <View style={styles.block1}>
                    <Image source={{uri:this.item.icon}} style={styles.logo}/>
                </View>
                <View style={styles.block2}>
                    <View style={styles.nameBlock}>
                        <Text style={styles.nameText}>{this.item.program_name.length>20?`${this.item.program_name.slice(0,20)}...`:this.item.program_name}</Text>
                        <Text style={styles.time}>{converter(this.item.program_begin_time)}-{converter(this.item.program_end_time)}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={{...styles.position,width:width(this.item.program_begin_time,this.item.program_end_time,(screenWidth-40)-((screenWidth-40)/100*25)-5)}}></View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    ) }
  }

export default function ListChannels({navigation}){

    const [data,setData] = React.useState()
    const {getChannel,checkToken} = React.useContext(Datas)

    React.useEffect(()=>{
        const fetch = async() => {
            const response = await getChannel()
            setData(response)
            checkToken(navigation)
        }
        fetch()
    },[])



    return(
        <>
        {data? 
            <FlatList
                data={data}
                style={styles.list}
                renderItem={({item,index})=><Post item={item} index={index} navigation={navigation}/>}
                keyExtractor={item => item.id+''}
                
            />:<></>}
        </>
    )
}




const styles = StyleSheet.create({
    item:{
        width:screenWidth-40,
        height:80,
        backgroundColor:'#1c1c1c',
        borderRadius:7,
        overflow:'hidden',
        marginTop:10,
        flexDirection:'row'
    },
    list:{
        width:screenWidth-40,
        marginLeft:20
    },
    block1:{
        width:'25%',
        height:'100%',
        backgroundColor:'#fff',
        borderRadius:7,
        overflow: 'hidden',
    },
    block2:{
        width:'75%',
        height:'100%',
    },
    logo:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    nameBlock:{
        width:'90%',
        marginLeft:10
    },
    nameText:{
        color:'#fff',
        fontSize:18,
    },
    time:{
        color:'#BCBCBC',
        fontSize:16,
        marginTop:5
    },
    position:{
        height:4,
        borderRadius:7,
        overflow:'hidden',
        backgroundColor:'#E41A4B'
    },
    line:{
        height:4,
        width:(screenWidth-40)-((screenWidth-40)/100*25)-5,
        backgroundColor:'#fff',
        marginTop:15,
        marginLeft:2.5,
        borderRadius:7,
        overflow:'hidden'
    }

  });
  