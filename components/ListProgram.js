import React from 'react';
import { View ,StyleSheet, Text, Dimensions, Image} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { Datas } from '../context/context';
import DayCarusel from './DayCarusel';

const { width: screenWidth, } = Dimensions.get('window')

const isTV = screenWidth>900

const ListProgram = ({currentFilm,navigation}) => {

    const {getProgramListByDay,getTimeShift} = React.useContext(Datas)
    const [data,setData] = React.useState()
    const [width,setWidth] = React.useState(0)
    const [day,setDays] = React.useState()
    const [activeDay,setActiveDay] = React.useState(6)

    const converter = (sec)=>{
        var d = new Date(sec*1000+5*60*1000*60);
        var time = d; 
        let hour = `${time.getUTCHours()}`.length===1?`0${time.getUTCHours()}`:time.getUTCHours()
        let minute =  `${time.getUTCMinutes()}`.length===1?`0${time.getUTCMinutes()}`:time.getUTCMinutes()
        return [`${hour}:${minute}`,]
    }

    React.useEffect(()=>{
        const fetch = async () =>{
            let data = await getProgramListByDay(currentFilm.id)
            setData(Object.values(data))
            setDays(Object.keys(data))
            
        }
        fetch()
    },[])


 React.useEffect(()=>{
       if(activeDay===6){  
        const currentTime = new Date().getTime()/1000-7000
        const position = currentTime - currentFilm.program_begin_time
        const timeProgram = currentFilm.program_end_time - currentFilm.program_begin_time
        const width = (position*(screenWidth-40))/timeProgram
        if(width<screenWidth-40){
            setWidth(width)
        }else{
            setWidth(screenWidth-40)
        }
       }
    },[data])

    const getSrcProgram = async(item)=>{
        if(currentFilm.program_begin_time>=item.begin_time){
            const url = await getTimeShift(currentFilm.id,item.id) 
            if(isTV){
                navigation.navigate('WatchingTV',{vid:{uri:url.uri,overrideFileExtensionAndroid:'m3u8'},isChannel:false})
            }else{
                navigation.navigate('Watching',{vid:{uri:url.uri,overrideFileExtensionAndroid:'m3u8'},isChannel:false})
            }
        }
    }


    
    return(
       <View>
           <DayCarusel activeDay={activeDay} setActiveDay={setActiveDay} data={day}/>
           {data?data[activeDay].map((item,i)=>(
            <DrawerItem key={item.id} pressColor='#fff' onPress={()=>{getSrcProgram(item)}}  icon={()=>(
                <View style={styles.timeTableItem}>
                    <View style={styles.timeTableInfo}> 
                        <View style={styles.timeTableTextblock}>
                            <Text style={styles.timetext1}>{item.name}</Text>
                            <Text style={styles.timetext3}>{converter(item.begin_time)}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={styles.timetext2}>Новости, Кино, Эфирные</Text>
                            {currentFilm.program_begin_time>=item.begin_time?
                        <Image style={{marginLeft:30,marginTop:-5}} source={require('../images/burgerMenuIcon5.png')}/>:<></>}
                        </View>
                    </View>
                     <View style={{...styles.progress,width:currentFilm.program_id===item.id?width:'0%'}}>
                    </View> 
            </View>
            )} label=''/>
         )):<></>}
    </View>
    )
}

export default ListProgram

const styles = StyleSheet.create({
    timeTableItem:{
        position:'relative',
        width:screenWidth-40,
        height:65,
        backgroundColor:'#373737',
        justifyContent:'center',
        borderRadius:7,
        paddingTop:5
    },
    progress:{
       position:'absolute' ,
       height:65,
       width:screenWidth-40,
       backgroundColor:'#E41A4B',
       borderRadius:7,
       overflow:'hidden'
    },
    timeTableInfo:{
        zIndex:2,
        padding:10
    },
    timeTableTextblock:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    timetext1:{
        color:'#fff',
        fontSize:14,
        width:screenWidth/1.5
    },
    timetext2:{
        color: 'rgba(254, 254, 254, 0.5)',
        fontSize:14
    },
    timetext3:{
        color:'#fff',
        fontSize:14
    },
})