import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'; 
import Home from './screens/Home'
import { Text,TouchableHighlight,View} from 'react-native';
import BurgerMenu from './components/BuregerMenu'
import safeArea from './styles/SafeArea';
import Watched from './screens/watched'
import {options,HeaderLeft,HeaderRight} from './components/Header'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function stack({ navigation }) {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{...options,headerLeft:()=>(<HeaderLeft navigation={navigation}/>),headerRight:()=>(<HeaderRight navigation={navigation}/>)}} name="Home"  component={Home} />
        <Stack.Screen options={{...options,headerLeft:()=>(<HeaderLeft navigation={navigation}/>),headerRight:()=>(<HeaderRight navigation={navigation}/>)}} name="Watched"  component={Watched} />
      </Stack.Navigator>
  );
}
export default function App() {
  return (
    <>
    <View style={safeArea.Top}></View>
    
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props =><BurgerMenu {...props}/>}>
        <Drawer.Screen  name="BurgerNavigation" component={stack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

