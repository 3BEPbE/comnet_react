import React from 'react';
import {View, StyleSheet, StatusBar,} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Style from './styles/Style';
import {ContextProvider, Datas} from './context'
import {createStackNavigator} from '@react-navigation/stack'
import {enableScreens} from 'react-native-screens';
import HomeTV from './pages/HomeTV';
import Login from './pages/Login';
import { Dimensions } from 'react-native';
import MovieList from './pages/MovieList';
import Movies from './pages/Movies'
import PlayerTV from './pages/PlayerTV';
import Aksiya from './pages/Aksiya';
import Search from './pages/Search';
import CurrentMovie from './pages/CurrentMovie';
import { PlayerMovie } from './pages/PlayerMovie';

const { width: screenWidth } = Dimensions.get('window')
let isTV = screenWidth>900



enableScreens();
const Stack = createStackNavigator()

const StackTV = (props) => {
  
  const {checkToken,getData,createOption} = React.useContext(Datas)
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
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="Search"  component={Search} /> 
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="Aksiya"  component={Aksiya} /> 
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="CurrentMovie"  component={CurrentMovie} /> 
          <Stack.Screen props={props} options={{...options,headerShown:false}}  name="PlayerMovie"  component={PlayerMovie} /> 
    </Stack.Navigator>
  )
}


const App = () => {
  return (
    <ContextProvider>
        <StatusBar />
        <NavigationContainer >
          <StackTV/>
        </NavigationContainer>
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
