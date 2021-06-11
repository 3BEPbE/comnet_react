
import React,{createContext} from 'react'
import {options,HeaderLeft,HeaderRight,HeaderCenter} from '../components/header'

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
    const [isStatusHidden,setStatusHidden] = React.useState(false)
    return(
        <Datas.Provider
          value = {{
            createOption,
            isStatusHidden,
            setStatusHidden
          }}>
            {children}
        </Datas.Provider>
    )
}

