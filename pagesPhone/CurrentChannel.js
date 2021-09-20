import React from "react";
import { Text,StyleSheet,FlatList,Dimensions, ImageBackground,View } from "react-native";
import {converter} from '../helper/index'
import { Datas } from "../context";
import DayCarusel from "../componentsPhone/DayCarusel";
import TimeCarusel from "../componentsPhone/TimeCarusel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const {width:screenWidth} = Dimensions.get('window')

const CurrentChannel = ({navigation,route}) =>{

    const {checkToken,getProgramListByDay} = React.useContext(Datas)
    const [days,setDays] = React.useState()
    const [timeShift,setTimeShift] = React.useState()

    React.useEffect(()=>{
        checkToken(navigation)
    },[])

    React.useEffect(()=>{
        const fetch = async()=>{
            const Date = await getProgramListByDay(route.params.id)
            if(Date){
                let date = Object.keys(Date)
                let values = Object.values(Date)
                date[date.length-1] = 'сегодня'
                date =  date.map((item,index)=>{
                            if(date.length-1===index){
                                return {text:item,status:true}
                            }else{
                                return {text:item,status:false}
                            }
                        })
                const index = date.findIndex((item)=>item.status)
                setDays(date)
                setTimeShift(values[index])
                console.log(values[index][0])
            }
        }   
        fetch()
    },[])

    const navigate = () =>{
        navigation.navigate('PlayerPhone',route.params)
    }

    return(
        <View style={styles.page}>
    
            <>
        {timeShift?<View >
            <FlatList
                ListHeaderComponent={()=>(
                    <>
                        <Text style={styles.name}>{route.params.name} смотреть онлайн</Text>
                        <ImageBackground resizeMode='contain' source={{uri:route.params.icon}} style={styles.image}>
                            <ImageBackground resizeMode='stretch' style={styles.gradient} source={require('../images/blackback.png')}>
                                <TouchableWithoutFeedback onPress={navigate}>
                                    <View style={styles.watchBtn}>
                                        <Text style={styles.watch}>Смотреть</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ImageBackground>
                        </ImageBackground>
                        <Text style={styles.name}>{converter(route.params.program_begin_time)} - {converter(route.params.program_end_time)}</Text>
                        <Text style={styles.name}>{route.params.program_name}</Text>
                        <View style={styles.rating}>
                            <Text style={styles.ratingText}>{route.params.program_rating}+</Text>
                        </View>
                        <DayCarusel days={days}/>
                    </>
                )}
                style={styles.flatList}
                data={timeShift}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({item,index})=><TimeCarusel item={item} index={index} />}
                // horizontal={true}
                // getItemLayout={(data, index) => ({  length: 35, offset: (100 * index),index })}
                extraData={timeShift}
            />
      </View>:<></>}
      </>
        </View>
    )
}


export default CurrentChannel

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor:'#010101'
    },
    name:{
        color:'#fff',
        marginTop:20,
        fontSize:24,
        width:screenWidth-40
    },
    image:{
        width:screenWidth-40,
        height:(screenWidth-150),
        resizeMode:'contain',
        backgroundColor:'#fff',
        marginTop:20,
        borderRadius:7,
        overflow:'hidden'
    },
    gradient:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-end'
    },
    watchBtn:{
        width:150,
        height:50,
        backgroundColor:'#E41A4B',
        marginBottom:20,
        borderRadius:7,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:20,
    },
    watch:{
        color:'#fff',
        fontSize:18
    },
    rating:{
        width:38,
        height:30,
        backgroundColor:'#1c1c1c',
        borderRadius:7,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5
    },  
    ratingText:{
        color:'#fff',
        fontSize:18
    },

    flatList:{
        width:screenWidth-40,
        marginLeft:20,
        marginTop:20,
    }
  });