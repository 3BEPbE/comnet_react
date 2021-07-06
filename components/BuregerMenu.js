import React from 'react';
import { View ,StyleSheet,Text,ImageBackground,Image} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import { Datas } from '../context/context';

const links =[
    {
        label:'Просмотреные',
        navigation:'MovieList',
        icon:require('../images/burgerMenuIcon1.png')
    },
    {
        label:'Избранные',
        navigation:'MovieList',
        icon:require('../images/burgerMenuIcon2.png')
    },
    {
        label:'Телевидение',
        navigation:'TV',
        params:'TV',
        icon:require('../images/burgerMenuIcon3.png')
    },
    {
        label:'Фильмы',
        navigation:'MovieList',
        params:{season:0},
        icon:require('../images/burgerMenuIcon4.png')
    },
    {
        label:'Сериалы',
        navigation:'MovieList',
        params:{season:1},
        icon:require('../images/burgerMenuIcon5.png')
    },
    {
        label:'Амедиатека',
        navigation:'MovieList',
        icon:require('../images/burgerMenuIcon6.png')
    },
    {
        label:'Мегого',
        navigation:'MovieList',
        icon:require('../images/burgerMenuIcon7.png')
    },
    {
        label:'Start',
        navigation:'MovieList',
        icon:require('../images/burgerMenuIcon8.png')
    },
    {
        label:'Детям',
        navigation:'MovieList',
        icon:require('../images/burgerMenuIcon9.png')
    },
]


export  function BurgerMenu(props) {
    const {storeData,getData,isOpenBurger,setOpenBurger} = React.useContext(Datas)
    const exit = () =>{
        props.navigation.closeDrawer();
        storeData('token',null)  
        getData('token')
    }
    return(
    <>  
            {isOpenBurger?<DrawerContentScrollView style={styles.content} {...props} >
                <ImageBackground style={styles.bcImage} source={require('../images/burgerMenu-bc.png')}>
                    <DrawerItem pressColor='#fff'  onPress={()=>{props.navigation.navigate('Profile');setTimeout(()=>{setOpenBurger(false)},500)}} style={{marginTop:30}} label='' icon={()=>(     
                    <View style={styles.profileBlock}>
                            <><Image source={require('../images/burgerMenuProfile.png')} style={styles.profileImage}/></>
                            <View>
                                <Text style={styles.name}>Имя Фамилия</Text>
                                <Text style={styles.status}>Активный</Text>
                            </View>
                    </View>)}/>
                   
                </ImageBackground>
                <View style={styles.list}>
                    {links.map(e=>(
                        <DrawerItem pressColor='#fff'  key={e.label} {...props} style={styles.link} icon={()=>(
                        <Image style={styles.icon} source={e.icon}/>)}
                        onPress={() => {setTimeout(()=>{setOpenBurger(false)},500);props.navigation.navigate(e.navigation,e.params)}} inactiveTintColor ='#fff' label={e.label}/>
                    ))}
                    <DrawerItem pressColor='#fff'  key={'Узбекские'} {...props} style={styles.link} icon={()=>(
                        <Image style={styles.icon} source={require('../images/burgerMenuIcon10.png')}/>)}
                        onPress={() => {alert('useless');setTimeout(()=>{setOpenBurger(false)},500)}} inactiveTintColor ='#fff' label={'Узбекские'}/>
                    <DrawerItem pressColor='#fff'  key={'Выйти'} {...props} style={styles.link} icon={()=>(
                        <Image style={styles.icon} source={require('../images/burgerMenuIcon11.png')}/>)}
                        onPress={() => {setTimeout(()=>{setOpenBurger(false)},500);exit()}} inactiveTintColor ='#fff' label={'Выйти'}/>
                </View>
            </DrawerContentScrollView>:<></>}
            
    </>
    )
}
export  function BurgerMenuGuest(props) {
    const {isOpenBurger,setOpenBurger} = React.useContext(Datas)
    return(
        <>
            {isOpenBurger?<DrawerContentScrollView style={styles.content} {...props} >
                <View style={styles.bcImage} >
                </View>
                <DrawerItem pressColor='#fff'  key={'Войти'} {...props} style={styles.link} icon={()=>(
                        <Image style={styles.icon} source={require('../images/burgerMenuIcon11.png')}/>)}
                        onPress={() => {props.navigation.navigate('Login');setTimeout(()=>{setOpenBurger(false)},500)}} inactiveTintColor ='#fff' label={'Войти'}/>
                <View style={styles.list}>
                    {links.map(e=>(
                        <DrawerItem pressColor='#fff'  key={e.label} {...props} style={styles.link} icon={()=>(
                        <Image style={styles.icon} source={e.icon}/>)}
                        onPress={() =>{ props.navigation.navigate('MovieList',e.params);setTimeout(()=>{setOpenBurger(false)},500)}} inactiveTintColor ='#fff' label={e.label}/>
                    ))}
                    <DrawerItem pressColor='#fff' key={'Узбекские'} {...props} style={styles.link} icon={()=>(
                        <Image style={styles.icon} source={require('../images/burgerMenuIcon10.png')}/>)}
                        onPress={() => {setTimeout(()=>{setOpenBurger(false)},500);alert('useless')}} inactiveTintColor ='#fff' label={'Узбекские'}/>
                   
                </View>
            </DrawerContentScrollView>:<></>}
        </>   
    
    )
}

const styles = StyleSheet.create({
   bcImage:{
        flex:1,
        height:150,
        paddingLeft:20,
        paddingTop:20
    },
  content:{
    backgroundColor:'#242424',
    flex:1,
    marginTop:-40,
  },
  link:{
      flex:1,
      
  },
  icon:{
      height:19,
      width:19,
      resizeMode:'contain'
  },
  list:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-around'
  },
  profileImage:{
    width:70,
    height:70,  
    backgroundColor:'#242424',
    borderRadius:50,
    marginRight:10
  },
  profileBlock:{
      flex:1,
      display:'flex',
      flexDirection:'row',
      height:70,
      alignItems:'center'
  },
  name:{
      fontSize:15,
      color:'#fff',
      width:110
  },
  status:{
      fontSize:12,
      color:'#fff',
  }

 });