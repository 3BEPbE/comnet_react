
import React,{createContext} from 'react'
import {options,HeaderLeft,HeaderRight,HeaderCenter} from './components/header'
import axios from 'axios'
import { Dimensions } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Network from 'expo-network';
import { Alert } from 'react-native';

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth>900

export const Datas = createContext(null);

export const ContextProvider = (props) => {
    const { children } = props;
    
    const [isLogin,setLogin] = React.useState(false)
    const [token,setToken] = React.useState(null)
    const [isStatusHidden,setStatusHidden] = React.useState(false)
    const [serials,setSerials] = React.useState([])

    const createOption = (navigation,position) => {
      const Options = {
        Home:{
          ...options,
          headerTitle:()=>(<></>),
          headerLeft:()=>(<></>)
        },
      }
      return Options[position]
    }

    const storeData = async (key,value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)

      } catch (e) {
        
      }
    }
    
    const getData = async (key) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key)
        
        if(jsonValue!=='null'){
          setToken(JSON.parse(jsonValue).token)
          setLogin(true)
        }else{
          setLogin(false)
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        // error reading value
      }
    }
  
    const login = async(data,setError,navigation,routeName) => {
      axios({
          method: 'POST',
          url:`http://94.158.63.185/api/login`,//28 123457
          data
          }).then((e)=>{
              if(e.data.status==='error'||e.data[0].error){
                  setError('#e5474c')
                  console.log('error')
              }else{
                  storeData('token',{token:e.data[0].authkey})
                  getData('token')
                  navigation.navigate(routeName)
              }
          }).catch((e)=>{
              console.log(e)
          })
    }
    const getJanr = (params) =>{
      if(isLogin){
        return axios({
          method: 'POST',
          url:`http://94.158.63.185/api/auth/genre/list`,//28 123457
          data:{
            authkey:token,
            ...params
          }
          }).then((e)=>{
              return(e.data['0'].genres)
              
          }).catch((e)=>{
              console.log(e)
          })
      }else{
        return axios({
          method: 'POST',
          url:`http://94.158.63.185/api/noauth/genre/list`,//28 123457
          data:{
            ...params
          }
          }).then((e)=>{
              return(e.data['0'].genres)
              
          }).catch((e)=>{
              console.log(e)
          })
      }
    }
    
    const getFilms = (page,params)=>{
      console.log(params)
      if(isLogin){
       return axios({
          method: 'POST',
          url:`http://94.158.63.185/api/auth/video/list?`,//28 123457
          data:{
            limit:isTV?28:20,
            page,
            authkey:token,
            ...params
          }
          }).then((e)=>{
              return(e.data['0'].videos)
              
          }).catch((e)=>{
              console.log(e)
          })
      }else{
       return axios({
          method: 'POST',
          url:`http://94.158.63.185/api/noauth/video/list?`,//28 123457
          data:{
            limit:isTV?28:20,
            page,
            ...params
          }
          }).then((e)=>{ 
              return(e.data['0'].videos)  
          }).catch((e)=>{
              console.log(e)
          })
      }
    }
    
    const getIPaddress = async() => {
     let ip = await Network.getIpAddressAsync();
    }
 

    const getCurrentMovie = async(id)=>{
     return axios({
        method: 'POST',
        url:`http://94.158.63.185/api/auth/video/detail`,//28 123457
        data:{
          id,
          authkey:token
        }
        }).then((e)=>{
            return e.data['0'].actions
            
        }).catch((e)=>{
            console.log(e)
        })
    }
    const getSrc = async(id)=>{
      return axios({
        method: 'POST',
        url:`http://94.158.63.185/api/auth/video/url`,//28 123457
        data:{
          id:id.id,
          authkey:token,
          fileId:id.fileId
        }
        }).then((e)=>{
           // console.log('e.data')
           return e.data['0'].uri
            
        }).catch((e)=>{
            console.log(e)
        })
    }

    const searchFilm = (text) =>{
      if(isLogin){
        return axios({
           method: 'POST',
           url:`http://94.158.63.185/api/auth/search`,//28 123457
           data:{
             authkey:token,
             search:text
           }
           }).then((e)=>{
            return(e.data['0'].videos)
               
           }).catch((e)=>{
               console.log(e)
           })
       }else{
        return axios({
           method: 'POST',
           url:`http://94.158.63.185/api/noauthsearch`,//28 123457
           data:{
             search:text
           }
           }).then((e)=>{ 
            return(e.data['0'].videos) 
           }).catch((e)=>{
               console.log(e)
           })
       }
    }

    const AlertBusyToken = (navigation) =>{
      Alert.alert(
        "Уважаемый зритель!",
        "Вход в Ваш аккаунт выполнен на другом устройстве. Для одновременного просмотра на нескольких устройствах необходимо подключить услугу “Мультидоступ”.",
        [
          {
            text: "Отмена",
            onPress: () => isTV ? navigation.navigate('HomeTV') : navigation.navigate('Home'),
            style: "cancel"
          },
          { text: "Подключить", onPress: () => navigation.navigate('Login',{routeName:"HomeTV"}) }
        ],
        { cancelable: false }
      );
    }

    const checkToken = (navigation)=>{
      
      if(isLogin){
        axios({
          method: 'POST',
          url:`http://94.158.63.185/api/auth/status`,//28 123457
          data:{
            authkey:token,
          }
          }).then((e)=>{
            if(e.data['0'].status===1){
              console.log(123)
              storeData('token',null)  
              setLogin(false)
              AlertBusyToken(navigation)
            }
           return(e.data['0'])
              
          }).catch((e)=>{
              console.log(e)
          })
      }
    }
    const getChannel = () =>{
      if(isLogin){
       return axios({
          method: 'POST',
          url:`http://94.158.63.185/api/auth/channel/list`,
          data:{
            authkey:token,
          }
          }).then((e)=>{
           return(e.data['0'].channels)
              
          }).catch((e)=>{
              console.log(e)
          })
      }
    }
    const getChannelSrc = (id) =>{
      if(isLogin){
        return axios({
           method: 'POST',
           url:`http://94.158.63.185/api/auth/channel/uri`,
           data:{
             authkey:token,
             id
           }
           }).then((e)=>{
            return(e.data['0'])
               
           }).catch((e)=>{
               console.log(e)
           })
       }
    }
    const getTimeShift = (cid,pid,begin_time) => {
      if(isLogin){
        return axios({
           method: 'POST',
           url:`http://94.158.63.185/api/auth/archive/url`,
           data:{
             authkey:token,
             pid,
             cid,
             time: Math.trunc(begin_time),
           }
           }).then((e)=>{
            return(e.data['0'])
               
           }).catch((e)=>{
               console.log(e)
           })
       }
    }
    const getProgramListByDay = (cid) =>{
      if(isLogin){
        return axios({
           method: 'POST',
           url:`http://94.158.63.185/api/auth/epg/range`,
           data:{
             authkey:token,
             cid,
           }
           }).then((e)=>{
            return(e.data['0'])
               
           }).catch((e)=>{
               console.log(e)
           })
       }
    }
    const getUserInfo = () => {
      if(isLogin){
        return axios({
           method: 'POST',
           url:`http://94.158.63.185/api/auth/profile/costumer/info`,
           data:{
             authkey:token
           }
           }).then((e)=>{
            return(e.data['0'])
               
           }).catch((e)=>{
               console.log(e)
           })
       }
    }
    const getChannelCat = () => {
      if(isLogin){
        return axios({
           method: 'POST',
           url:`http://94.158.63.185/api/auth/category/tv/list`,
           data:{
             authkey:token
           }
           }).then((e)=>{
            return(e.data['0'].categories)
               
           }).catch((e)=>{
               console.log(e)
           })
       }
    }
    const getAksiya = () =>{
       return axios({
          method: 'GET',
          url: 'https://serv.comnet.uz/api/slider',
          headers: {
            Authorization: 'Bearer 1|dFDYUzyxLftGvZqZSZDS28cRgrGyG2Xmg9TjiuMb',
          },
        })
          .then((response) => {
            return response.data.data
          });
        
    }

    const getParners = () =>{
      return axios({
        method: 'GET',
        url: 'https://serv.comnet.uz/api/partners',
        headers: {
          Authorization: 'Bearer 1|dFDYUzyxLftGvZqZSZDS28cRgrGyG2Xmg9TjiuMb',
        },
      })
        .then((response) => {
            return response.data.data
        });
    }
    
    const getDocs = () =>{
      return axios({
        method: 'GET',
        url:`http://94.158.63.185/api/noauth/documents`,
        }).then((e)=>{
         return e.data['0']
            
        }).catch((e)=>{
            console.log(e)
        })
    }


    return(
        <Datas.Provider
          value = {{
            createOption,
            isStatusHidden,
            setStatusHidden,
            login,
            getData,
            getSrc,
            storeData,
            checkToken,
            isLogin,
            serials,
            getFilms,
            getCurrentMovie,
            getJanr,
            searchFilm,
            getChannel,
            getChannelSrc,
            getProgramListByDay,
            getTimeShift,
            getUserInfo,
            getAksiya,
            getParners,
            getDocs,
            getChannelCat
          }}>
            {children}
        </Datas.Provider>
    )
}

