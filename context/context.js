
import React,{createContext} from 'react'
import {options,HeaderLeft,HeaderRight,HeaderCenter} from '../components/header'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Datas = createContext(null);

export const ContextProvider = (props) => {
    const { children } = props;
    const createOption = (navigation,position) => {
      const Options = {
        Movie:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft navigation={navigation}/>)
        },
        Home:{
          ...options,
          headerTitle:()=>(<HeaderCenter  navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft  navigation={navigation}/>)
        },
        Watched:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft navigation={navigation}/>)
        },
        Profile:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft navigation={navigation}/>)
        },
        TV:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft navigation={navigation}/>)
        },
        Channel:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft navigation={navigation}/>)
        },
        Change:{
          ...options,
          headerRight:()=>(<HeaderRight navigation={navigation}/>),
          headerLeft:()=>(<HeaderLeft navigation={navigation}/>)
        },
        Search:{
          ...options,
          headerLeft:()=>(<HeaderLeft navigation={navigation}/>),
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
    const [isLogin,setLogin] = React.useState(false)
    const getData = async (key) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key)
        
        if(jsonValue!=='null'){
          setLogin(true)
        }else{
          setLogin(false)
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        // error reading value
      }
    }
    const [isStatusHidden,setStatusHidden] = React.useState(false)
    const login = async(data,setError,navigation) => {
      axios({
          method: 'POST',
          url:`http://192.168.5.120/api/login`,//28 123457
          data
          }).then((e)=>{
              if(e.data.status==='error'||e.data[0].error){
                  setError('#e5474c')
                  
                  console.log('error')
              }else{
                  storeData('token',{token:e.data[0].authkey})
                  getData('token')
                  console.log('sss')
                  navigation.navigate('BurgerNavigation')
              }
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
            storeData,
            isLogin,
          }}>
            {children}
        </Datas.Provider>
    )
}

