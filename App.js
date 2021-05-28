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
import {options,HeaderLeft,HeaderRight,HeaderCenter} from './components/Header'
import {BurgerMenu,BurgerMenuGuest} from './components/BuregerMenu'
import {ContextProvider} from './context/context'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function stack({ navigation }) {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{...options,headerTitle:()=>(<HeaderCenter/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>)}} name="Home"  component={Home} />
        <Stack.Screen options={{...options,headerRight:()=>(<HeaderRight navigation={navigation}/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>)}} name="Watched"  component={Watched} />
        <Stack.Screen options={{...options,headerRight:()=>(<HeaderRight navigation={navigation}/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>)}} name="Profile"  component={Profile} />
        <Stack.Screen options={{...options,headerRight:()=>(<HeaderRight navigation={navigation}/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>)}} name="Movie"  component={Movie} />
        <Stack.Screen options={{...options,headerRight:()=>(<HeaderRight navigation={navigation}/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>)}} name="Change"  component={ChangeData} />
      </Stack.Navigator>
  );
}
export default function App() {
  return (
    <><ContextProvider>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props =>(false?<BurgerMenuGuest {...props}/>:<BurgerMenu {...props}/>)}>
          <Drawer.Screen  name="BurgerNavigation"  component={stack} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="inverted" />
      </ContextProvider>
    </>
  );
}

