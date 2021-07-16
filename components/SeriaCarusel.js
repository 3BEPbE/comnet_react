import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image,TouchableOpacity} from 'react-native';
import { Picker  } from '@react-native-community/picker';
import { DrawerItem } from '@react-navigation/drawer';
import Carusel from '../components/SerialCaruselTv'

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = screenWidth>1000

export default function SerialCarusel({currentFilm,currentSeria,setCurrentSeria,currentSeason,setCurrentSeason}) {

  const [list1,setList1] = React.useState(false)
  const [list2,setList2] = React.useState(false)

  const [season,setSeason] = React.useState()
  const [serial,setSerial] = React.useState()

  const [unSoretedSerial,setUnsortedSerial] = React.useState([])
    React.useEffect(()=>{
      let array = currentFilm.files.map((item)=>item.name.split(' '))
      setCurrentSeason(array[0][1])
      setUnsortedSerial(array.map((item)=>{
        return {
                seria:item[3],
                season:item[1]
              }
      }))
    },[])
    React.useEffect(()=>{
      if(unSoretedSerial){
        setSeason([...new Set(unSoretedSerial.map((item)=>item.season))])
      }
    },[unSoretedSerial])

    React.useEffect(()=>{
      if(currentSeason){
        let selectedSeasonSeria =  unSoretedSerial.filter(item=>item.season===currentSeason).map(i=>i.seria)
        let sorted = selectedSeasonSeria.sort((a, b) => Number(a) - Number(b))
        setCurrentSeria([sorted[0]])
        setSerial(sorted)
      }
    },[currentSeason])
    return (
      <>
       <View style={{flexDirection:'row'}}>
     { isTV?<>
     
      {list1?<Carusel setData={setCurrentSeason} text='сезон'   setList1={setList1} data={season}/>:
              <DrawerItem onPress={()=>setList1(true)} icon={()=>(
              <View style={styles.button} >
                <Text style={{color:'#000',fontSize:22}}>{currentSeason} сезон</Text>
              </View>
            )} label=''/>}

       {list2?<Carusel setData={setCurrentSeria} text='серия'  setList1={setList2} data={serial}/>:
          <DrawerItem onPress={()=>setList2(true)} icon={()=>(
          <View style={styles.button} >
            <Text style={{color:'#000',fontSize:22}}>{currentSeria} серия</Text>
          </View>
        )} label=''/>} 
     
     
        </>:<>
      <Picker
          selectedValue={currentSeason}
          onValueChange={hand => setCurrentSeason(hand)}
          style={styles.itemStyle}
          mode="dropdown"
          itemStyle={{ color:'red', fontWeight:'900', fontSize: 18, padding:30}}>
          {season && season.map((e,i)=>(
              <Picker.Item key={i} label={`${e} сезон`} value={e} />
          )) }
        </Picker>
          <Picker
          selectedValue={currentSeria}
          onValueChange={hand => setCurrentSeria(hand)}
          style={styles.itemStyle}
          mode="dropdown"
          itemStyle={{ color:'red', fontWeight:'900', fontSize: 18, padding:30}}>
          {serial && serial.map((e,i)=>(
              <Picker.Item key={i} label={`${e} серия`} value={e} />
          )) }
        </Picker>
     </>}
     </View>
       </>
    );
  };

const styles = StyleSheet.create({
  block:{
    flexDirection:'row'
  },
  itemStyle:{
      height:50,
      width:100,
      marginBottom:10,
      marginLeft:20,
      color:'#fff',
      backgroundColor:'#373737',
      paddingLeft:10,
      borderRadius:50,
    },
  button:{
    width:150,height:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  }
  });