import React from 'react';
import { View ,StyleSheet, Text, Dimensions} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { Datas } from '../context/context';


const { width: screenWidth, } = Dimensions.get('window')


const ListProgram = ({currentFilm}) => {

    const {getProgramList} = React.useContext(Datas)
    const [data,setData] = React.useState()
    const [width,setWidth] = React.useState(1)

    const converter = (sec)=>{
        var d = new Date(sec*1000+5*60*1000*60);
        var time = d; 
        let hour = `${time.getUTCHours()}`.length===1?`0${time.getUTCHours()}`:time.getUTCHours()
        let minute =  `${time.getUTCMinutes()}`.length===1?`0${time.getUTCMinutes()}`:time.getUTCMinutes()
        return [`${hour}:${minute}`,]
    }

    React.useEffect(()=>{
        const fetch = async () =>{
            let data = await getProgramList(currentFilm.id)
            setData(data)
        }
        fetch()
    },[])


 React.useEffect(()=>{
       if(data){

           const currentTime = new Date().getTime()/1000
           const position = currentTime - data[0].program_begin_time
           const timeProgram = data[0].program_end_time-data[0].program_begin_time
           const width = (position*(screenWidth-40))/timeProgram
           console.log(currentTime)
           setWidth(width)
       }
    },[data])


    
    return(
       <View>{data?data.map((item,i)=>(
            <DrawerItem key={item.id} pressColor='#fff'  icon={()=>(
                <View style={styles.timeTableItem}>
                    <View style={styles.timeTableInfo}> 
                        <View style={styles.timeTableTextblock}>
                            <Text style={styles.timetext1}>{item.program_name}</Text>
                            <Text style={styles.timetext3}>{converter(item.program_begin_time)}</Text>
                        </View>
                        <Text style={styles.timetext2}>Новости, Кино, Эфирные</Text>
                    </View>
                    <View style={{...styles.progress,width:i===0?width:'0%'}}>
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
        height:55,
        backgroundColor:'#373737',
        marginTop:10,
        justifyContent:'center',
        borderRadius:7,
    },
    progress:{
       position:'absolute' ,
       height:55,
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
        fontSize:14
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