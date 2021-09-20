import React,{PureComponent} from 'react'
import {View,StyleSheet,Text,Dimensions, FlatList, Image} from 'react-native'
import { Datas } from '../context'
import { DrawerItem } from '@react-navigation/drawer'
import { converter } from '../helper'
import Carousel from 'react-native-snap-carousel'
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
        <DrawerItem pressColor='red' onPress={()=>{
            this.fetchTimeShift(this.item.id,this.item.begin_time,this.item.end_time,this.item.name)}}
            style={styles.focusProgram} label='' icon={()=>(
            <View style={{...styles.progarm,backgroundColor:this.currentTime<this.item.begin_time?'rgba(171,171,171,0.4)':'#00000085'}}>
                <View style={styles.programBlock}>
                    <View style={styles.iconBlock}>
                        <Text style={styles.textProgram}>{this.item.name.length>27?`${this.item.name.slice(0,27)}...`:this.item.name}</Text>
                        <Text style={styles.textTime}>{`${converter(this.item.begin_time)} ⚊ ${converter(this.item.end_time)}`}</Text>
                       
                    </View>
                    <View style={styles.liveBlock}>
                         {this.currentTime>this.item.begin_time&&this.currentTime<this.item.end_time?<Text style={styles.live}>Live</Text>:<></>}
                        <Image  source={this.currentTime>this.item.begin_time&&this.currentTime<this.item.end_time?require('../images/shine.png'):require('../images/startIcon.png')} style={{...styles.watched,opacity:(this.currentTime>this.item.begin_time&&this.currentTime<this.item.end_time)|| this.currentTime>this.item.end_time?1:this.activeDay!==6?1:0}}/>
                    </View>
                </View>
               
        
            </View>
        )}/>
    ) }
  }

export default function TimeShift({isPlayerVisible,isOpenMenu,setID,currentID,setVisible,setPaused,setShift,setTimeData,setUri,setTimer}){

    const {getProgramListByDay,getTimeShift} = React.useContext(Datas)
    const [activeDay,setActiveDay] = React.useState(6)
    const [data,setData] = React.useState()
    const [day,setDays] = React.useState()
    const [index,setIndex] = React.useState(false)
    const [carousel,setCarusel] = React.useState(<></>)

    React.useEffect(()=>{
    if(data){
        setCarusel(<></>)
        setTimeout(()=>{
        setCarusel(
            <Carousel
            layout="default"
            vertical={true}
            data={data[activeDay]}
            style={styles.block2}
            itemWidth={190}
            itemHeight={screenHeight/100*14+15}
            firstItem={index?index:0}
            sliderHeight={screenHeight/100*80}
            sliderWidth={screenWidth/2.25/100*75}
            renderItem={({item})=>(<Post fetchTimeShift={fetchTimeShift} activeDay={activeDay}  item = {item}/>)}
            inactiveSlideScale={1}
            activeSlideAlignment={'start'}
        />
        )
        },100)
    }
    },[data,activeDay])


    React.useEffect(()=>{
        const fetch = async () => {
            const data = await getProgramListByDay(currentID)
            if(data){
                const date = Object.keys(data)
                date[date.length-1] = 'сегодня'
                let values = Object.values(data)
                setActiveDay(values.length-1)
                let time = new Date().getTime()/1000
                let index = values[values.length-1].findIndex((item)=>time>item.begin_time&&time<item.end_time)
                if(index-4>0){
                    setIndex(index-4)
                }else{
                    setIndex(index)
                }
                setData(values)
                setDays(date) 
            }
        }
        fetch()
    },[currentID])

    const fetchTimeShift = async(pid,begin_time,end_time,name) =>{
        const data = await getTimeShift(currentID,pid,begin_time)
        setUri(data.uri)
        setTimer(begin_time)
        setTimeData({
            begin_time,
            pid,
            end_time,
            current_time:begin_time,
            name,
        })
        setShift(true)
        setVisible(false)
        setPaused({paused:false,work:false})
        setID(currentID)
    }

    
    return(
        <>
        {isPlayerVisible&&!isOpenMenu?<View style={styles.container}>
            <View style={styles.block1}>
                {day?day.map((item,index)=>(
                    <DrawerItem onPress={()=>{setActiveDay(index)}} key={item} pressColor='red' style={{...styles.focusDay,width:index===activeDay?150:150}}  label='' icon={()=>(
                        <View style={{...styles.day,borderWidth:index===activeDay?2:0,transform:[{scale:index===activeDay?1.1:1}],backgroundColor:index===activeDay?'#E41A4B':'#00000085'}}>
                            <Text style={styles.text}>{item}</Text>
                        </View>
                    )}/>
                )):<></>}
            </View>
            
            {data[activeDay]&&index?
            <>  
              {carousel}
            </>
                :<></>}
        </View>:<></>}
        </>
    )
}

const styles = StyleSheet.create({
 container:{
     position:'absolute',
     zIndex:3,
     height:screenHeight,
     width:screenWidth/1.8,
     right:0,
     top:0,
     flexDirection:'row',
     justifyContent:'space-between',
 },
 block1:{
     width:'25%', 
     height:'100%',
     marginTop:20
 },

 day:{
     width:'100%',
     height:screenHeight/100*7.5,
     backgroundColor:'#00000085',
     marginTop:0,
     alignItems:'center',
     justifyContent:'center',
     borderRadius:7,
     flexDirection:'row',
     borderColor:'#fff'
 },
 text:{
     color:'#fff',
     fontSize:18
 },
 focusDay:{
     marginHorizontal:0,
     marginVertical:0
 },
 focusProgram:{
    marginHorizontal:0,
    marginVertical:0,
    marginLeft:20,
 },
 progarm:{
    width:'100%',
    height:screenHeight/100*14,
    backgroundColor:'#00000085',
    marginTop:0,
    justifyContent:'space-around',
    borderRadius:7,
    position:'relative'
 },
 textProgram:{
    color:'#fff',
    fontSize:18,
    marginLeft:20
 },
 textTime:{
    color:'#fff',
    fontSize:16,
    marginLeft:20
 },
 dott:{
     width:4,
     height:4,
     backgroundColor:'#fff',
     marginTop:10
 },
 programBlock:{
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between'
 },
 watched:{
     width:15,
     height:15  ,
     resizeMode:'cover', 
 },
 iconBlock:{
    height:screenHeight/100*10,
    justifyContent:'space-between',
 },
 live:{
     color:'#fff',
     fontSize:18,
 },
 liveBlock:{
    height:screenHeight/100*10,
    flexDirection:'row',
    alignItems:'center',
    marginRight:10
 }
});