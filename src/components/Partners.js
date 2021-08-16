import { DrawerItem } from '@react-navigation/drawer';
import React from 'react'
import {View,StyleSheet,Text,Dimensions, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Datas   } from '../context';

const { width: screenWidth } = Dimensions.get('window')

export default function Partners({navigation}){

    const [data,setData] = React.useState()

    const {getParners} = React.useContext(Datas)

    React.useEffect(()=>{
        const fetch = async() =>{
            const data = await getParners()
            setData(data)
        }
        fetch()
    },[])
    
    return(
        <View style={styles.container}>
            {data?data.map((item)=>(
                <DrawerItem pressColor='#fff' style={styles.focus} key = {item.id} label='' icon={()=>(
                    <View style={styles.item}>
                        <Image style={styles.logo} source={require('../images/aksiya_axample.png')}/>
                        <View style={styles.textBlock}>
                            <Text style={styles.text}>{item.title_ru}</Text>        
                        </View>
                    </View>
                )}/>
            ))
            :<></>}
        </View>
    )
}

const styles = StyleSheet.create({
 container:{
    width:screenWidth-40,
    marginLeft:20,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20
 },
 item:{
     width:(screenWidth-40)/4-20,
     backgroundColor:'#373737',
     height:300,
 },
 focus:{
     marginHorizontal:0,
     marginVertical:0,
     width:(screenWidth-40)/4,
 },
 logo:{
     height:'80%',
     width:'100%'
 },
 textBlock:{
    height:'20%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
 },
 text:{
    color:'#fff',
    fontSize:18,
    width:(screenWidth-40)/4-80,
 }

});