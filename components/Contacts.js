import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image,TouchableOpacity, ImageBackground} from 'react-native';
import Footer from './Footer'
import { DrawerItem } from '@react-navigation/drawer';
import Carousel from 'react-native-snap-carousel';
import * as Linking from 'expo-linking';
const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = screenWidth>900

export default function Contacts() {

  const data = ['Ташкент','Фергана','Коканд']
  const [value,setValue] = React.useState('Ташкент')
  const [list,setList] = React.useState(false)
  const [status,setStatus] = React.useState()
  const clickItem = (currentVal) =>{
    setList(false)
    setValue(currentVal)  
  }
  React.useEffect(()=>{
    if(value === 'Ташкент'){
        setStatus({
            location:'г. Ташкент, м. Айбек,ул. Шахрисабз, д.10б (ориентир м. Айбек)',
            tell:'71 205-86-55',
            email:'info@tvcom.uz',
            map:'https://comnet.uz/home-users/cover-zone'
        })
    }else if(value === 'Фергана'){
        setStatus({
            location:`г. Фергана, ул. Ал-Фаргоний, д. 20`,
            tell:'73 249-00-00',
            email:'info@tvcom.uz',
            map:'https://comnet.uz/home-users/cover-zone'
        })
    }else{
        setStatus({
            location:`г. Коканд, ул. Турон, д.8`,
            tell:'73 542-63-63',
            email:'info@tvcom.uz',
            map:'https://comnet.uz/home-users/cover-zone'
        }) 
    }
  },[value])

  const renderItem = React.useCallback(({ item, index }) => (
    <DrawerItem pressColor='#fff' style={styles.itemFocus} onPress={()=>clickItem(item)}  label=''  icon={()=>(
    <View style={styles.button}>
        <View style={styles.list}>
            <Image style={styles.icon} source={require('../images/location.png')}/>
            <Text style={styles.text}>{item}</Text>
        </View>
      
    </View>
    )}/>
), []);

    return (
      <>
         {list? <Carousel
            layout="default"
            vertical={true}
            data={data}
            sliderWidth={screenWidth-40}
            itemWidth={screenWidth-40}
            itemHeight={55}
            sliderHeight={60*data.length}
            renderItem={renderItem}
            activeSlideAlignment="start"
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />:
          <DrawerItem onPress={()=>setList((i)=>!i)} pressColor='#fff' label='' icon={()=>
          <View style={styles.button}>
                <View style={styles.list}>
                    <Image style={styles.icon} source={require('../images/location.png')}/>
                    <Text style={styles.text}>{value}</Text>
                </View>
        <Image style={styles.arrow} source={require('../images/arrow.png')}/>
          </View>}/>
          }
          {status?
          <View>
              <Text style={styles.location}>{status.location}</Text>
              <Text style={styles.tell}>{status.tell}</Text>
              <Text style={styles.email}>{status.email}</Text>
              <ImageBackground style={styles.map} source={require('../images/map.png')}>
                    <DrawerItem onPress={()=>{Linking.openURL(status.map)}} style={{marginHorizontal:0,marginVertical:0,width:245}} label='' icon={()=>(
                        <View style={styles.mapBtn}>
                            <Text style={styles.mapText}>Открыть зону покрытия на карте</Text>
                        </View>
                    )}/>
              </ImageBackground>
          </View>:
          <></>}
          <Footer/>
       </>
    );
  };

const styles = StyleSheet.create({
  block:{
    flexDirection:'row'
  },
  button:{
    height:50,
    width:screenWidth-40,
    backgroundColor:'#373737',
    justifyContent:'center',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    borderRadius:7
  },
  focus:{
    marginHorizontal:0,
    marginVertical:0,
  },
  text:{
      color:'#fff',
      marginLeft:20
  },
  itemFocus:{
    marginHorizontal:0,
    marginVertical:0,
    width:screenWidth-25,
    marginLeft:10,
  },
  icon:{
      width:24,
      height:34,
      resizeMode:'contain',
      marginLeft:20
  },
  list:{
    flexDirection:'row',
    alignItems:'center'
  },
  arrow:{
    width:12,
    height:12,
    marginRight:20
  },
  location:{
     color:'#fff',
     marginLeft:20,
     width:screenWidth-40,
     textAlign:'center',
     marginTop:20,
     fontSize:18,
     fontWeight:'700'
  },
  tell:{
     marginLeft:20,
     width:screenWidth-40,  
     fontSize:36,
     color:'#E41A4B',
     marginTop:20,
     textAlign:'center'
  },
  email:{
    marginLeft:20,
    width:screenWidth-40,
    fontSize:18,
    color:'#fff',
    textAlign:'center',
    marginTop:15
  },
  map:{
      marginLeft:20,
      marginTop:20,
      width:screenWidth-40,
      height:200,
      resizeMode:'cover',
      justifyContent:'center',
      alignItems:'center'
  },
  mapBtn:{
      width:230,
      height:71,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#E41A4B',
      borderRadius:7,

  },
  mapText:{
      color:'#fff',
      fontSize:18,
      fontWeight:'700',
      textAlign:'center'
  }
  });