import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image,TouchableOpacity} from 'react-native';
import { Picker  } from '@react-native-community/picker';
import { DrawerItem } from '@react-navigation/drawer';
import Carusel from '../components/SerialCaruselTv'

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = screenWidth>1000

export default function SerialCarusel({currentFilm,setSerial,setSeason,serial,season}) {

  const [list1,setList1] = React.useState(false)
  const [list2,setList2] = React.useState(false)
  const [tvseason,setTvseason] = React.useState()
  const [selectedValue,SetSelectedValue] = React.useState(currentFilm.files[0])
  const [selectedSeria,SetSelectedSeria] = React.useState(currentFilm.files[0])

  const [unSoretedSerial,setUnsortedSerial] = React.useState([])
    React.useEffect(()=>{
      let array = currentFilm.files.map((item)=>item.name.split(' '))
      SetSelectedValue(array[0][1])
      setUnsortedSerial(array.map((item)=>{
        return {seria:item[3],
                season:item[1]
              }
      }))
    },[])
    React.useEffect(()=>{
      if(unSoretedSerial){
        setTvseason([...new Set(unSoretedSerial.map((item)=>item.season))][0])
        setSeason([...new Set(unSoretedSerial.map((item)=>item.season))])
      }
    },[unSoretedSerial])

    React.useEffect(()=>{
      if(selectedValue){
        let selectedSeasonSeria =  unSoretedSerial.filter(item=>item.season===selectedValue)
        let sorted = selectedSeasonSeria.sort((a, b) => Number(a.seria) - Number(b.seria))
        setSerial(sorted)
      }
    },[selectedValue])

    return (
      <>
     { isTV?<>
     
      {list1?<Carusel setList1={setList1} season={season}/>:
              <DrawerItem onPress={()=>setList1(true)} icon={()=>(
              <View style={{width:150,height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}} >
                <Text style={{color:'#000',fontSize:22}}>{tvseason} сезон</Text>
              </View>
            )} label=''/>}
        </>:<>
      <Picker
          ref={(i)=>console.log(i?i.props:'')}
          selectedValue={selectedValue}
          onValueChange={hand => SetSelectedValue(hand)}
          style={styles.itemStyle}
          mode="dropdown"
          itemStyle={{ color:'red', fontWeight:'900', fontSize: 18, padding:30}}>
          {season && season.map((e,i)=>(
              <Picker.Item key={i} label={`${e} сезон`} value={e} />
          )) }
        </Picker>
          <Picker
          selectedValue={selectedSeria}
          onValueChange={hand => SetSelectedSeria(hand)}
          style={styles.itemStyle}
          mode="dropdown"
          itemStyle={{ color:'red', fontWeight:'900', fontSize: 18, padding:30}}>
          {serial && serial.map((e,i)=>(
              <Picker.Item key={i} label={`${e.seria} серия`} value={e} />
          )) }
        </Picker>
     </>}
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
  });