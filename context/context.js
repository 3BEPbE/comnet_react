
import React,{createContext} from 'react'
import {options,HeaderLeft,HeaderRight,HeaderCenter} from '../components/header'
import axios from 'axios'
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth>950

export const Datas = createContext(null);

export const ContextProvider = (props) => {
    const { children } = props;
    
    const [isLogin,setLogin] = React.useState(false)
    const [token,setToken] = React.useState(null)
    const [isStatusHidden,setStatusHidden] = React.useState(false)
    const [serials,setSerials] = React.useState([])

    const createOption = (navigation,position) => {
      const Options = {
        Movie:{
          ...options,
          headerRight:()=>(<HeaderRight  navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft  navigation={navigation}/>)
        },
        Home:{
          ...options,
          headerTitle:()=>(<HeaderCenter   navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft navigation={navigation}/>)
        },
        MovieList:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft  navigation={navigation}/>)
        },
        Profile:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft  navigation={navigation}/>)
        },
        TV:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft  navigation={navigation}/>)
        },
        Channel:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft  navigation={navigation}/>)
        },
        Change:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft  navigation={navigation}/>)
        },
        Search:{
          ...options,
          headerLeft:()=>(<HeaderLeft  navigation={navigation}/>),
          headerRight:()=>(<HeaderRight navigation={navigation}/>)
        }
      }
      return Options[position]
    }

    const storeData = async (key,value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
      } catch (e) {
        // saving error
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
  
    const login = async(data,setError,navigation) => {
      axios({
          method: 'POST',
          url:`http://172.16.236.84/api/login`,//28 123457
          data
          }).then((e)=>{
              if(e.data.status==='error'||e.data[0].error){
                  setError('#e5474c')
                  console.log('error')
              }else{
                  storeData('token',{token:e.data[0].authkey})
                  getData('token')
                  navigation.navigate('Home')
              }
          }).catch((e)=>{
              console.log(e)
          })
    }
    const getJanr = (params) =>{
      if(isLogin){
        return axios({
          method: 'POST',
          url:`http://172.16.236.84/api/auth/genre/list`,//28 123457
          data:{
            limit:isTV?24:12,
            categories:0,
            authkey:token,
            season:0,
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
          url:`http://172.16.236.84/api/noauth/genre/list`,//28 123457
          data:{
            limit:isTV?24:12,
            page:0,
            season:0,
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
      if(isLogin){
       return axios({
          method: 'POST',
          url:`http://172.16.236.84/api/auth/video/list?`,//28 123457
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
          url:`http://172.16.236.84/api/noauth/video/list?`,//28 123457
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
        url:`http://172.16.236.84/api/auth/video/detail`,//28 123457
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
        url:`http://172.16.236.84/api/auth/video/url`,//28 123457
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
           url:`http://172.16.236.84/api/authsearch`,//28 123457
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
           url:`http://172.16.236.84/api/noauthsearch`,//28 123457
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

    const checkToken = ()=>{
      if(isLogin){
        axios({
          method: 'POST',
          url:`http://172.16.236.84/api/auth/status`,//28 123457
          data:{
            authkey:token,
          }
          }).then((e)=>{
            if(e.data['0'].status===1){
              storeData('token',null)  
               setLogin(false)
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
          url:`http://172.16.236.84/api/auth/channel/list`,
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
           url:`http://172.16.236.84/api/auth/channel/uri`,
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
    const getProgramList = (id) => {
      if(isLogin){
        return axios({
           method: 'POST',
           url:`http://172.16.236.84/api/auth/channel/program`,
           data:{
             authkey:token,
             id,
             limit:10
           }
           }).then((e)=>{
            return(e.data['0'].programs)
               
           }).catch((e)=>{
               console.log(e)
           })
       }
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
            getProgramList
          }}>
            {children}
        </Datas.Provider>
    )
}

