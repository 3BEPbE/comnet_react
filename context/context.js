
import React,{createContext} from 'react'
import {options,HeaderLeft,HeaderRight,HeaderCenter} from '../components/header'
import axios from 'axios'
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          headerLeft:()=>(<HeaderLeft setOpenBurger={setOpenBurger} navigation={navigation}/>)
        },
        Home:{
          ...options,
          headerTitle:()=>(<HeaderCenter   navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft setOpenBurger={setOpenBurger} navigation={navigation}/>)
        },
        MovieList:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft setOpenBurger={setOpenBurger} navigation={navigation}/>)
        },
        Profile:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft setOpenBurger={setOpenBurger} navigation={navigation}/>)
        },
        TV:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft setOpenBurger={setOpenBurger} navigation={navigation}/>)
        },
        Channel:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft setOpenBurger={setOpenBurger} navigation={navigation}/>)
        },
        Change:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft setOpenBurger={setOpenBurger} navigation={navigation}/>)
        },
        Search:{
          ...options,
          headerLeft:()=>(<HeaderLeft setOpenBurger={setOpenBurger} navigation={navigation}/>),
          headerRight:()=>(<HeaderRight navigation={navigation}/>)
        }
      }
      return Options[position]
    }
    const [isOpenBurger,setOpenBurger] = React.useState(false)

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
                  navigation.navigate('BurgerNavigation')
              }
          }).catch((e)=>{
              console.log(e)
          })
    }
    const getFilms = (page)=>{
      if(isLogin){
       return axios({
          method: 'POST',
          url:`http://172.16.236.84/api/auth/video/list?`,//28 123457
          data:{
            limit:isTV?24:20,
            page,
            authkey:token,
            season:0
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
            limit:isTV?24:20,
            page,
            season:0
          }
          }).then((e)=>{ 
              return(e.data['0'].videos)  
          }).catch((e)=>{
              console.log(e)
          })
      }
    }
    
    const getSerialas = (page)=>{
      if(isLogin){
       return axios({
          method: 'POST',
          url:`http://172.16.236.84/api/auth/video/list?`,//28 123457
          data:{
            limit:isTV?24:20,
            page,
            authkey:token,
            season:1
            
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
            limit:isTV?24:20,
            page,
            season:1
          }
          }).then((e)=>{ 
              return(e.data['0'].videos)
              
          }).catch((e)=>{
              console.log(e)
          })
      }
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
            isLogin,
            serials,
            getSerialas,
            getFilms,
            getCurrentMovie,
            isOpenBurger,
            setOpenBurger
          }}>
            {children}
        </Datas.Provider>
    )
}

