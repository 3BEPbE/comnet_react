import { View ,StyleSheet,Dimensions, ScrollView,Text, Image} from 'react-native';
import React from 'react';
import Advantages from '../components/Advantages';
import Contacts from '../components/Contacts';

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = 900<screenWidth
import { Datas } from '../context/context';

export default function About({route,navigation}){
  
  const {checkToken} = React.useContext(Datas)

  React.useEffect(()=>{
    checkToken(navigation)
  },[])


  return(
    <ScrollView style={styles.container}>
        <Text style={styles.titlePage}>О компании</Text>
        <View style={styles.banner}>
            <View style={styles.textBlock}><Text style={styles.bannerTitle}>Интерактивное IP-телевидение</Text></View>
            <Image style={styles.bannerImage} source={require('../images/iptv1.png')}/>
            <View style={styles.textBlock}><Text style={styles.bannerDescription}>ТВ-каналы и Online-кинотеатр в одном приложении  Смотрите везде, где есть Интернет!</Text></View>
        </View>
        <Advantages/>
        <Contacts/>
        
    </ScrollView>
  )
} 

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#000',
    flex:1
  },
  titlePage:{
    color:'#fff',
    fontSize:24,
    fontWeight:'100',
    marginTop:20,
    marginLeft:20,
  },
  textBlock:{
    marginLeft:20,
    width:screenWidth-40,
    alignItems:'center'
  },
  banner:{
    marginTop:28
  },
  bannerTitle:{
    color:'#fff',
    marginLeft:20,
    width:screenWidth-40,
    textAlign:'center',
    fontSize:24
  },
  bannerImage:{
    width:screenWidth-40,
    height:(screenWidth-40)*0.6,
    marginLeft:20,
    marginTop:20
  },
  bannerDescription:{
    fontSize:20,
    color:'#fff',
    marginLeft:20,
    width:screenWidth-40,
    marginTop:20,
    textAlign:'center'
  }
})
