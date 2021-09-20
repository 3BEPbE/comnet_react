import { Datas } from "../context"
import { createStackNavigator } from "@react-navigation/stack"
import HomeTV from "./HomeTV"
import Login from './Login';
import MovieList from './MovieList';
import Movies from './Movies'
import PlayerTV from './PlayerTV';
import Aksiya from './Aksiya';
import Search from './Search';
import CurrentMovie from './CurrentMovie';
import { PlayerMovie } from './PlayerMovie';
import React from "react";

const Stack = createStackNavigator()

const StackTV = (props) => {
    const {getData,createOption} = React.useContext(Datas)
    const options = createOption(props.navigation,"free")
    getData('token')
    return(
      <Stack.Navigator>
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

  export default StackTV