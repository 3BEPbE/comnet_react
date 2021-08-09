import React from 'react';
import {View, StyleSheet, StatusBar,} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './Navigation';
import AppProvider from './AppProvider';
import Style from './styles/Style';
import Menu from './components/Menu';
import Content from './components/Content';
import {ContextProvider, Datas} from './context'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import {enableScreens} from 'react-native-screens';
import HomeTV from './pages/HomeTV';
import Login from './pages/Login';
import { Dimensions } from 'react-native';
import SmartTV from './pages/SmartTV';
import Movies from '../src/pages/Movies'
import PlayerTV from './pages/PlayerTV';

const { width: screenWidth } = Dimensions.get('window')
let isTV = screenWidth>900



enableScreens();
const Stack = createStackNavigator()
/////const Drawer = createDrawerNavigator();

const StackTV = (props) => {
  
  const {createOption,checkToken} = React.useContext(Datas)
  const options = createOption(props.navigation,"Home")

  return(
    <Stack.Navigator>
          {/* <Stack.Screen props={props} options={{...options,headerShown:isTV?false:true}}  name="a"  component={EventsDemo} /> */}
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="HomeTV"  component={HomeTV} />
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="Login"  component={Login} />
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="Movies"  component={Movies} />
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="PlayerTV"  component={PlayerTV} />   
    </Stack.Navigator>
  )
}


const App = () => {
  return (
    <ContextProvider>
      <AppProvider>
        <StatusBar />
        <NavigationContainer >
          <StackTV/>
        </NavigationContainer>
      </AppProvider>
    </ContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {
    width: Style.px(1920),
    height: Style.px(1080),
    flex: 1,
    flexDirection: 'row',
  },
});
