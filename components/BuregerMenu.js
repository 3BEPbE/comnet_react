import React from 'react';
import { View ,StyleSheet,Text,ImageBackground,Image,Dimensions} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import { Datas } from '../context';

const { width: screenWidth } = Dimensions.get('window')

let isTV = screenWidth>950

const links =[
    {
        label:'Просмотреные',
        navigation:'MovieList',
        params:{favorited:null,viewed:1,season:null,gid:null},
        icon:require('../images/burgerMenuIcon1.png')
    },
    {
        label:'Избранные',
        navigation:'MovieList',
        params:{favorited:1,viewed:null,season:null,gid:null},
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
        params:{favorited:null,viewed:null,season:0,gid:null},
        icon:require('../images/burgerMenuIcon4.png')
    },
    {
        label:'Сериалы',
        navigation:'MovieList',
        params:{favorited:null,viewed:null,season:1,gid:null},
        icon:require('../images/burgerMenuIcon5.png')
    },
    {
        label:'Амедиатека',
        navigation:'MovieList',
        params:{favorited:null,viewed:null,season:null,gid:91},
        icon:require('../images/burgerMenuIcon6.png')
    },
    {
        label:'О компании',
        navigation:'About',
        icon:require('../images/burgerMenuIcon8.png')
    },
    {
        label:'Акции',
        navigation:'Aksiya',
        icon:require('../images/burgerMenuIcon8.png')
    },
    {
        label:'Детям',
        navigation:'MovieList',
        params:{favorited:null,viewed:null,season:null,gid:24},
        icon:require('../images/burgerMenuIcon9.png')
    },
]
const links2 =[
 
    {
        label:'Телевидение',
        navigation:'TV',
        params:'TV',
        icon:require('../images/burgerMenuIcon3.png')
    },
    {
        label:'Фильмы',
        navigation:'MovieList',
        params:{favorited:null,viewed:null,season:0,gid:null},
        icon:require('../images/burgerMenuIcon4.png')
    },
    {
        label:'Сериалы',
        navigation:'MovieList',
        params:{favorited:null,viewed:null,season:1,gid:null},
        icon:require('../images/burgerMenuIcon5.png')
    },
    {
        label:'Амедиатека',
        navigation:'MovieList',
        params:{favorited:null,viewed:null,season:null,gid:91},
        icon:require('../images/burgerMenuIcon6.png')
    },
    {
        label:'О компании',
        navigation:'About',
        icon:require('../images/burgerMenuIcon8.png')
    },
    {
        label:'Акции',
        navigation:'Aksiya',
        icon:require('../images/burgerMenuIcon8.png')
    },
    {
        label:'Детям',
        navigation:'MovieList',
        params:{favorited:null,viewed:null,season:null,gid:24},
        icon:require('../images/burgerMenuIcon9.png')
    },
]


const payImage = [
    {image:require('../images/pay1.png')},
    {image:require('../images/pay9.png')},
    {image:require('../images/pay11.png')},
    {image:require('../images/pay2.png')},
    {image:require('../images/pay3.png')},
    {image:require('../images/pay4.png')},
    {image:require('../images/pay6.png')},
    {image:require('../images/pay5.png')},
    {image:require('../images/pay10.png')},
    {image:require('../images/pay8.png')},
    {image:require('../images/pay12.png')},
    {image:require('../images/pay7.png')},
]

export  function BurgerMenu(props) {
    
    const {storeData,getData,getUserInfo} = React.useContext(Datas)
    const [data,setData] = React.useState()
    const [janr,setJanr] = React.useState()

    const exit = () =>{
        props.navigation.closeDrawer();
        storeData('token',null)  
        getData('token')
    }
    React.useEffect(()=>{
        const fetch = async() => {
            let data = await getUserInfo()
            if(data){setData({...data,payImage})}
           
        }
        fetch()
    },[])

    
   
    
    return(
    <>  
            {!isTV?<DrawerContentScrollView style={styles.content} {...props} >
                <ImageBackground style={styles.bcImage} source={require('../images/burgerMenu-bc.png')}>
                    <DrawerItem pressColor='#fff'  onPress={()=>{props.navigation.navigate('Profile',data)}} style={{marginTop:30}} label='' icon={()=>(     
                    <View style={styles.profileBlock}>
                            <><Image source={require('../images/burgerMenuProfile.png')} style={styles.profileImage}/></>
                            <View>
                                <Text style={styles.name}>{data && data.firstname} {data && data.lastname}</Text>
                                <Text style={styles.status}>Активный</Text>
                            </View>
                    </View>)}/>
                   
                </ImageBackground>
                <View style={styles.list}>
                    {links.map(e=>(
                        <DrawerItem pressColor='#fff'  key={e.label} {...props} style={styles.link} icon={()=>(
                        <Image style={styles.icon} source={e.icon}/>)}
                        onPress={() => {props.navigation.setParams({});props.navigation.navigate(e.navigation,e.params)}} inactiveTintColor ='#fff' label={e.label}/>
                    ))}
                    <DrawerItem pressColor='#fff'  key={'Выйти'} {...props} style={styles.link} icon={()=>(
                        <Image style={styles.icon} source={require('../images/burgerMenuIcon11.png')}/>)}
                        onPress={() => {exit()}} inactiveTintColor ='#fff' label={'Выйти'}/>
                </View>
            </DrawerContentScrollView>:<DrawerContentScrollView style={styles.content} {...props} >
                      </DrawerContentScrollView>}
            
    </>
    )
}
export  function BurgerMenuGuest(props,) {
    return(
        <> 
            {!isTV?
                 <DrawerContentScrollView style={styles.content} {...props} >
                <View style={styles.bcImage} >
                </View>
                <DrawerItem pressColor='#fff'  key={'Войти'} {...props} style={styles.link} icon={()=>(
                        <Image style={styles.icon} source={require('../images/burgerMenuIcon11.png')}/>)}
                        onPress={() => {props.navigation.navigate('Login',{routeName:'Home'})}} inactiveTintColor ='#fff' label={'Войти'}/>
                <View style={styles.list}>
                    {links2.map(e=>(
                        <DrawerItem pressColor='#fff'  key={e.label} {...props} style={styles.link} icon={()=>(
                        <Image style={styles.icon} source={e.icon}/>)}
                        onPress={() => {props.navigation.setParams({});props.navigation.navigate(e.navigation==='TV'?'Login':e.navigation,e.params)}} inactiveTintColor ='#fff' label={e.label}/>
                    ))}
                   
                </View>
                </DrawerContentScrollView>
                  :<DrawerContentScrollView style={styles.content} {...props} >
                    </DrawerContentScrollView>
            }
          
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
    backgroundColor:'#0A0A0A',
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