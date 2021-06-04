
import React,{createContext} from 'react'


export const Datas = createContext(null);

export const ContextProvider = (props) => {
    const { children } = props;
    const test ='ss';

    return(
        <Datas.Provider
          value = {{
            test,
          }}>
            {children}
        </Datas.Provider>
    )
}

