import React from 'react';
import { StyleSheet, StatusBar, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ContextProvider, Datas} from './context'
import StackTV from './pages/StackTV';
import { enableScreens } from 'react-native-screens';
import DrawerPhone from './pagesPhone/DrawerPhone';
const { width: screenWidth } = Dimensions.get('window')

const isTV = screenWidth>900

enableScreens();




const App = (props) => {

  return (
    <ContextProvider>
        <StatusBar  />
        <NavigationContainer >
          {isTV?<StackTV props={props}/>:<DrawerPhone props={props}/>}
        </NavigationContainer>
    </ContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'row',
  },
});
