import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'; 
import Home from './screens/Home'
import SafeArea from './components/SafeArea'
import { Button ,StyleSheet,Text,TouchableHighlight} from 'react-native';
import HeaderStyle from './styles/header'

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
      </Stack.Navigator>
  );
}
export default function App() {
  return (
    <>
    <NavigationContainer>
      <Drawer.Navigator>
      <Drawer.Screen name="Главная" component={stack} />
      </Drawer.Navigator>
    </NavigationContainer>
    </>
  );
}

