import React,{PureComponent} from 'react'
import {View,StyleSheet,Text,Dimensions, FlatList, Image} from 'react-native'
import { Datas } from '../context'
import { DrawerItem } from '@react-navigation/drawer'
import { converter } from '../helper'

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

class Post extends PureComponent {
    constructor(props){
       super(props);
       this.item = props.item;
       this.activeDay = props.activeDay
       this.currentTime = new Date().getTime()/1000
       this.fetchTimeShift = props.fetchTimeShift
    }

    render() { return( 
        <DrawerItem pressColor='#fff' onPress={()=>{
            this.fetchTimeShift(this.item.id,this.item.begin_time,this.item.end_time)}}
            style={styles.focusProgram} label='' icon={()=>(
            <View style={styles.progarm}>
                <Text style={styles.textProgram}>{this.item.name.length>30?`${this.item.name.slice(0,30)}...`:this.item.name}</Text>
                <View style={styles.programBlock}>
                    <Text style={styles.textTime}>{`${converter(this.item.begin_time)}:${converter(this.item.end_time)}`}</Text>
                    <Image  source={require('../images/adv2.png')} style={{...styles.watched,opacity: this.currentTime>this.item.end_time?1:this.activeDay!==6?1:0}}/>
                </View>
            </View>
        )}/>
    ) }
  }

export default function TimeShift({isPlayerVisible,isOpenMenu,currentID,setVisible,setPaused,setShift,setTimeData}){

    const {getProgramListByDay} = React.useContext(Datas)
    const [activeDay,setActiveDay] = React.useState(6)
    const [data,setData] = React.useState()
    const [day,setDays] = React.useState()

    React.useEffect(()=>{
        const fetch = async () => {
            const data = await getProgramListByDay(currentID)
            setData(Object.values(data))
            setDays(Object.keys(data)) 
        }
        fetch()
    },[])

    const fetchTimeShift = async(pid,begin_time,end_time) =>{
        setTimeData({
            begin_time,
            pid,
            end_time,
            current_time:begin_time
        })
        setShift(true)
        setVisible(false)
        setPaused(false)
    }

    return(
        <>
        {isPlayerVisible&&!isOpenMenu?<View style={styles.container}>
            <View style={styles.block1}>
                {day?day.map((item,index)=>(
                    <DrawerItem onPress={()=>{setActiveDay(index)}} key={item} pressColor='#fff' style={styles.focusDay} pressOpacity={0} label='' icon={()=>(
                        <View style={styles.day}>
                            <Text style={styles.text}>{item}</Text>
                            <View style={{...styles.dott,opacity:index===activeDay?1:0}}></View>
                        </View>
                    )}/>
                )):<></>}
            </View>
            
            {data?<FlatList
                style={styles.block2}
                data={data[activeDay]}
                renderItem={({item})=>(<Post fetchTimeShift={fetchTimeShift} activeDay={activeDay}  item = {item}/>)}
                keyExtractor={item => item.id.toString()}
                />:<></>}
        </View>:<></>}
        </>
    )
}

const styles = StyleSheet.create({
 container:{
     position:'absolute',
     zIndex:3,
     height:screenHeight,
     width:screenWidth/2.3,
     right:0,
     top:0,
     flexDirection:'row',
     justifyContent:'space-between'
 },
 block1:{
     width:'18%',
     height:'100%',
     justifyContent:'center'
 },
 block2:{
    width:300,
    height:screenHeight-110
 },
 day:{
     width:'100%',
     height:40,
     backgroundColor:'#00000085',
     marginTop:0,
     alignItems:'center',
     justifyContent:'space-around',
     borderRadius:7,
     flexDirection:'row'
 },
 text:{
     color:'#fff',
     fontSize:20
 },
 focusDay:{
     marginHorizontal:0,
     marginVertical:0
 },
 focusProgram:{
    marginHorizontal:0,
    marginVertical:0
 },
 progarm:{
    width:'100%',
    height:80,
    backgroundColor:'#00000085',
    marginTop:0,
    justifyContent:'space-around',
    borderRadius:7
 },
 textProgram:{
    color:'#fff',
    fontSize:20,
    marginLeft:20
 },
 textTime:{
    color:'#fff',
    fontSize:18,
    marginLeft:20
 },
 dott:{
     width:4,
     height:4,
     backgroundColor:'#fff'
 },
 programBlock:{
     flexDirection:'row',
     alignItems:'center'
 },
 watched:{
     width:30,
     height:30,
     marginLeft:20,
     resizeMode:'contain'
 }
});