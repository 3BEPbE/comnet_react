import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'; 
import Home from './screens/Home'
import Movie from './screens/Movie'
import ChangeData from './screens/ChangeData'
import Watched from './screens/watched'
import Profile from './screens/Profile'
import Search from './screens/Search'
import Login from './screens/Login'
import Registration from './screens/Registration'
import TV from './screens/TV'
import {options,HeaderLeft,HeaderRight,HeaderCenter} from './components/header'
import {BurgerMenu,BurgerMenuGuest} from './components/BuregerMenu'
import {ContextProvider} from './context/context'
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function stack({ navigation }) {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{...options,headerTitle:()=>(<HeaderCenter  navigation={navigation}/>),headerLeft:()=>(<HeaderLeft  navigation={navigation}/>)}} name="Home"  component={Home} />
        <Stack.Screen options={{...options,headerRight:()=>(<HeaderRight navigation={navigation}/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>)}} name="Watched"  component={Watched} />
        <Stack.Screen options={{...options,headerRight:()=>(<HeaderRight navigation={navigation}/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>)}} name="Profile"  component={Profile} />
        <Stack.Screen options={{...options,headerRight:()=>(<HeaderRight navigation={navigation}/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>)}} name="Movie"  component={Movie} />
        <Stack.Screen options={{...options,headerRight:()=>(<HeaderRight navigation={navigation}/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>)}} name="TV"  component={TV} />
        <Stack.Screen options={{...options,headerRight:()=>(<HeaderRight navigation={navigation}/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>)}} name="Change"  component={ChangeData} />
        <Stack.Screen options={{...options,headerLeft:()=>(<HeaderLeft navigation={navigation}/>),headerRight:()=>(<HeaderRight navigation={navigation}/>)}} name="Search"  component={Search} />
      </Stack.Navigator>
  );
}
export default function App() {
  return (
    <><ContextProvider>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props =>(false?<BurgerMenuGuest {...props}/>:<BurgerMenu {...props}/>)}>
          {/* <Drawer.Screen options={{ swipeEnabled: false,gestureEnabled:false }}  name="Login"  component={Login} />
          <Drawer.Screen options={{ swipeEnabled: false,gestureEnabled:false }}  name="Registration"  component={Registration} /> */}
          <Drawer.Screen  name="BurgerNavigation"  component={stack} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="inverted" />
      </ContextProvider>
    </>
  );
}

