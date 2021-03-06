import {Text, View,Image,StyleSheet,ImageBackground,Dimensions, BackHandler,Alert } from 'react-native'
import React from 'react'
import { DrawerItem } from '@react-navigation/drawer'
import {Datas} from '../context'
import RNExitApp from 'react-native-exit-app';
import {useFocusEffect} from '@react-navigation/native';


const { width: screenWidth,height:screenHeight } = Dimensions.get('window')



export default function MenuTV ({navigation}) {
    const {isLogin,checkToken} = React.useContext(Datas)

    React.useEffect(()=>{
        checkToken(navigation)
    },[])

    const AlertBusyToken = (navigation) =>{
        Alert.alert(
          "",
          "Do you sure?",
          [
            {
              text: "no",
              onPress: () => {},
              style: "cancel"
            },
            { text: "yes", onPress: () => RNExitApp.exitApp() }
          ],
          { cancelable: false }
        );
      }

    useFocusEffect(
        React.useCallback(() => {
          // Listen to back button
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            ()=>{  
                AlertBusyToken()
                return true
            },
          );
          return () => {
            backHandler.remove();
          };
        }, []),
      );
    
    return(
        <View style={styles.container}>
           <View style={styles.block}>
               <DrawerItem pressColor='#fff' onPress={()=>isLogin?navigation.navigate('PlayerTV'):navigation.navigate('Login',{routeName:'HomeTV'})} style={styles.blockFocus} icon={()=>(
                      <View style={styles.block1}>
                         <Image style={styles.menutv1} source={require('../images/menutv1.png')}/> 
                         <Text style={styles.textmenu1}>Телеканалы</Text>
                      </View>
               )} label=''/>
              
            
                     <DrawerItem pressColor='#fff' style={styles.blockFocus2} icon={()=>(
                    <View style={styles.block3}>
                         <ImageBackground style={styles.menutv2} source={require('../images/menutv5.png')}>
                                <Text style={styles.textmenu2}>Шоу</Text>
                          </ImageBackground>
                    </View>
            )} label=''/>
                  
                        
           </View>
           <View style={styles.block}>
           <DrawerItem pressColor='#fff' onPress={()=>{navigation.navigate('Movies')}} style={styles.blockFocus} icon={()=>(
                      <View style={styles.block2}>
                          <ImageBackground style={styles.menutv2} source={require('../images/menutv2.png')}>
                                <Text style={styles.textmenu2}>Фильмы</Text>
                          </ImageBackground>
                      </View>
                )} label=''/>
              <DrawerItem pressColor='#fff' style={styles.blockFocus} icon={()=>(
                    <View style={styles.block3}>
                                <ImageBackground   style={styles.menutv2} source={require('../images/menutv3.png')}>
                                        <Text style={styles.textmenu2}>Сериалы</Text>
                                </ImageBackground>
                    </View>  
              )} label=''/>
          
            <DrawerItem pressColor='#fff' style={styles.blockFocus2} icon={()=>(
                    <View style={styles.block3}>
                         <ImageBackground style={styles.menutv2} source={require('../images/menutv4.png')}>
                                <Text style={styles.textmenu2}>Мультфильмы</Text>
                          </ImageBackground>
                    </View>
            )} label=''/>
     
           </View>
           <View style={styles.block}>
               <View style={styles.block4}>
                    <DrawerItem onPress={()=>{navigation.navigate('Aksiya')}} pressColor='#fff' style={styles.blockFocus3} label='' icon={()=>(
                        <View style={styles.blockFocus4}>
                                  <Image style={styles.menutv6}  source={require('../images/menutv6.png')}/>
                                  <Text style={styles.textmenu1}>Акции</Text>
                        </View>
                    )}/>
                     <DrawerItem onPress={()=>navigation.navigate('MovieList',{favorited:1})} pressColor='#fff' style={styles.blockFocus3} label='' icon={()=>(
                        <View style={styles.blockFocus4}>
                            <Image style={styles.menutv6}  source={require('../images/menutv7.png')}/>
                            <Text style={styles.textmenu1}>Избранное</Text>
                        </View>
                    )}/>
               </View>
               <DrawerItem pressColor='#fff' style={styles.blockFocus2} icon={()=>(
                    <View style={styles.block3}>
                          <Image style={styles.menutv6}  source={require('../images/watched.png')}/>
                          <Text style={styles.textmenu2}>Просмотреные</Text>
                    </View>
            )} label=''/>
                   <DrawerItem pressColor='#fff' onPress={()=>navigation.navigate('Login',{routeName:'HomeTV'})} style={styles.blockFocus2} icon={()=>(
                    <View style={styles.block3}>
                                <Image style={styles.menutv6}  source={require('../images/person.png')}/>
                                <Text style={styles.textmenu2}>Профиль</Text>
                    </View>
            )} label=''/>
            
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:screenWidth-40,
        marginLeft:10,

    },
    block:{
        width:'32%',
        height:screenHeight/100*90-20,
        justifyContent:'space-between'
    },
    blockFocus:{
        width:screenWidth/100*31+15,
        marginHorizontal:0,
        marginVertical:0
    
    },
    blockFocus2:{
        width:screenWidth/100*31+15,
        marginHorizontal:0,
        marginVertical:0
    },
    blockFocus3:{
        marginHorizontal:0,
        marginVertical:0,
        width:screenWidth/200*31+15,
    },
    block1:{
        width:screenWidth/100*31,
        height:(screenHeight/100*90)/100*65-20,
        backgroundColor:'#E41A4B',
        borderRadius:7
        
    },
    block2:{
        width:screenWidth/100*31,
        height:screenHeight/100*25.5,
        backgroundColor:'#E41A4B',
        borderRadius:7,
        overflow:'hidden'
        
    },
    block3:{
        width:screenWidth/100*31,
        height:screenHeight/100*26,
        backgroundColor:'#E41A4B',
        borderRadius:7,
        overflow:'hidden'
        
    },
    block4:{
       flexDirection:'row',
       width:screenWidth/100*31,
       marginLeft:-5
        
    },
    menutv1:{
        height:'80%',
        width:'100%'
    },
    textmenu1:{
        color:'#fff',
        fontSize:18,
        marginLeft:10,
        position:'absolute',
        bottom:20

    },
    textmenu2:{
        color:'#fff',
        fontSize:18,
        marginTop:20,
        position:'absolute',
        bottom:20,
        left:10

    },
    menutv2:{
        width:'100%',
        height:'100%',
        resizeMode:'cover'
    },
    menutv6:{
        width:50,
        height:screenHeight/100*10,
        marginLeft:10,
        marginTop:15,
        resizeMode:'contain'
    },
    blockFocus4:{
        backgroundColor:'#E41A4B',
        width:screenWidth/200*31,
        height:screenHeight/100*26,
        borderRadius:7,
    }
   });