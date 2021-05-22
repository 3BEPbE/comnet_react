import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'; 
import Home from './screens/Home'
import { Text,TouchableHighlight,View} from 'react-native';
import HeaderStyle from './styles/header'
import BurgerMenu from './components/BuregerMenu'
import safeArea from './styles/SafeArea';
import Watched from './screens/watched'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function stack({ navigation }) {
  return (
      <Stack.Navigator>
      <Stack.Screen options={{//header
          title:'',
          headerStyle:HeaderStyle.header,
          headerLeft: ()=>(
            <TouchableHighlight onPress={() => navigation.openDrawer()}>
              <Text style={HeaderStyle.headerButton}>Главная</Text>
            </TouchableHighlight>
          )
        }} name="first"  component={Home} />
      <Stack.Screen options={{
         title:'',
         headerStyle:HeaderStyle.header,
         headerLeft: ()=>(
           <TouchableHighlight onPress={() => navigation.openDrawer()}>
             <Text style={HeaderStyle.headerButton}>Главная</Text>
           </TouchableHighlight>
         )
       }} name="Watched"  component={Watched} />
      </Stack.Navigator>
  );
}
export default function App() {
  return (
    <>
    <View style={safeArea.Top}></View>
    
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props =><BurgerMenu {...props}/>}>
        <Drawer.Screen  name="Главная" component={stack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

