import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'; 
import Home from './screens/Home'
import Movie from './screens/Movie'
import {BurgerMenu,BurgerMenuGuest} from './components/BuregerMenu'
import Watched from './screens/watched'
import {options,HeaderLeft,HeaderRight,HeaderCenter} from './components/Header'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function stack({ navigation }) {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{...options,headerTitle:()=>(<HeaderCenter/>),headerLeft:()=>(<HeaderLeft navigation={navigation}/>),headerRight:()=>(<HeaderRight navigation={navigation}/>)}} name="Home"  component={Home} />
        <Stack.Screen options={{...options,headerLeft:()=>(<HeaderLeft navigation={navigation}/>),headerRight:()=>(<HeaderRight navigation={navigation}/>)}} name="Watched"  component={Watched} />
        <Stack.Screen options={{...options,headerLeft:()=>(<HeaderLeft navigation={navigation}/>),headerRight:()=>(<HeaderRight navigation={navigation}/>)}} name="Movie"  component={Movie} />
      </Stack.Navigator>
  );
}
export default function App() {
  return (
    <>  
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props =>(false?<BurgerMenuGuest {...props}/>:<BurgerMenu {...props}/>)}>
          <Drawer.Screen  name="BurgerNavigation"  component={stack} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="inverted" />
    </>
  );
}

