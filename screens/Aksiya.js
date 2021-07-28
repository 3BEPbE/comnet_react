import { View ,StyleSheet,Dimensions, ScrollView,Text, Image} from 'react-native';
import React from 'react';
import { Datas } from '../context/context';
import AksiyaCarusel from '../components/AksiyaCarusel';
import Footer from '../components/Footer'

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = 900<screenWidth


export default function Aksiya({route,navigation}){
  
  const {checkToken,getParners} = React.useContext(Datas)
  const [data,setData] = React.useState(false)

  React.useEffect(()=>{
    checkToken(navigation)
    const fetch = async()=>{
        const data = await getParners()
        setData(data)
    }
    fetch()
  },[])

  return(
    <ScrollView style={styles.container}>
       <Text style={styles.titlePage}>О компании</Text>  
       <AksiyaCarusel navigation={navigation}/>
       <Text style={styles.titlePage}>Предложения партнёров</Text>  
       <View style={styles.block}>
            { data ? data.map((item)=>{
            return (
            <View key={item.id} style={styles.card}>
                <View style={styles.cardItem}>
                    <Image style={styles.logo} source={{uri:`https://serv.comnet.uz/storage/${item.logo}`}}/>
                    <View style={styles.textBlock}>
                        <Text style={styles.title}>{item.title_ru}</Text>
                    </View>
                </View>
            </View>)})
            :<></>}
       </View>
       <Footer/>
    </ScrollView>
  )
} 

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#0A0A0A',
    flex:1
  },
  titlePage:{
    color:'#fff',
    fontSize:24,
    fontWeight:'100',
    marginTop:20,
    marginLeft:20,
  },
  block:{
      flexWrap:'wrap',
      flexDirection:'row',
      justifyContent:isTV?'flex-start':'center'
  },
  card:{
      width:180,
      height:225,
      alignItems:'center',
      justifyContent:'center',
      marginTop:15
  },
  cardItem:{
    width:175,
    height:220,
    backgroundColor:'#373737',
    borderRadius:7
  },
  logo:{
    width:175,
    height:180,
    resizeMode:'contain',
    borderRadius:7,
    marginTop:-3,
    overflow:'hidden'
  },
  textBlock:{
    width:175,
    height:40,
    padding:10
  },
  title:{
    color:'#fff'
  }

})
