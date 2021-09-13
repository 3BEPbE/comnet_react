import React from 'react'
import {View,StyleSheet,Text,Dimensions,Image,TouchableWithoutFeedback} from 'react-native'
import { DrawerItem } from '@react-navigation/drawer';

const { width: screenWidth } = Dimensions.get('window')

export default function Chooser({pos,setPos,activeCat,setActiveCat}){
    const [visible,setVisible] = React.useState(false)
    React.useEffect(()=>{
        if(pos.main==='category'){
            if(!visible){
                setPos({main:'category',index:activeCat})  
                setVisible(true)
            }else{
                setActiveCat(pos.index)
                setVisible(true)
            }
        }else{
            setVisible(false)
        }
    },[pos])
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback>
                <View style={styles.item}>
                    <Text style={styles.text}>Фильмы</Text>
                    {activeCat===1?<View style={{...styles.line,backgroundColor:pos.main==='category'?'#E41A4B':'#fff'}}></View>:<></>}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <View style={styles.item}>
                    <Text style={styles.text}>Сериалы</Text>
                    {activeCat===2?<View style={{...styles.line,backgroundColor:pos.main==='category'?'#E41A4B':'#fff'}}></View>:<></>}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <View style={styles.item}>
                    <Text style={styles.text}>Мультфильмы</Text>
                    {activeCat===3?<View style={{...styles.line,backgroundColor:pos.main==='category'?'#E41A4B':'#fff'}}></View>:<></>}
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
 container:{
    marginLeft:20,
    marginTop:20,
    flexDirection:'row',
    width:370,
    justifyContent:'space-around'
 },
 focus1:{
    marginHorizontal:0,
    marginVertical:0,
    width:105
 },
 focus2:{
    marginHorizontal:0,
    marginVertical:0,
    width:110
 },
 focus3:{
    marginHorizontal:0,
    marginVertical:0,
    width:150
 },
 item:{
  justifyContent:'space-between',
  padding:15,
  borderRadius:7
 },
 text:{
     color:'#fff',
     fontSize:15
 },
 line:{
     height:2,
     width:'100%',
     backgroundColor:'#fff',
     borderRadius:7
 }
});