import React from 'react';
import {View, StyleSheet, StatusBar,} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppProvider from './AppProvider';
import Style from './styles/Style';
import {ContextProvider, Datas} from './context'
import {createStackNavigator} from '@react-navigation/stack'
import {enableScreens} from 'react-native-screens';
import HomeTV from './pages/HomeTV';
import Login from './pages/Login';
import { Dimensions } from 'react-native';
import MovieList from './pages/MovieList';
import Movies from '../src/pages/Movies'
import PlayerTV from './pages/PlayerTV';
import Aksiya from './pages/Aksiya';

const { width: screenWidth } = Dimensions.get('window')
let isTV = screenWidth>900



enableScreens();
const Stack = createStackNavigator()
/////const Drawer = createDrawerNavigator();

const StackTV = (props) => {
  
  const {createOption,checkToken,getData} = React.useContext(Datas)
  const options = createOption(props.navigation,"Home")
  getData('token')
  return(
    <Stack.Navigator>
          {/* <Stack.Screen props={props} options={{...options,headerShown:isTV?false:true}}  name="a"  component={EventsDemo} /> */}
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="HomeTV"  component={HomeTV} />
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="Login"  component={Login} />
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="MovieList"  component={MovieList} />
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="Movies"  component={Movies} />
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="PlayerTV"  component={PlayerTV} />  
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="Aksiya"  component={Aksiya} /> 
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
