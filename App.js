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
import Channel from './screens/Channel';
import {options,HeaderLeft,HeaderRight,HeaderCenter} from './components/header'
import {BurgerMenu,BurgerMenuGuest} from './components/BuregerMenu'
import {ContextProvider, Datas} from './context/context'


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function stack({ navigation }) {
  const {createOption} = React.useContext(Datas)
  return (
      <Stack.Navigator>
        <Stack.Screen options={createOption(navigation,"Home")}    name="Home"    component={Home} />
        <Stack.Screen options={createOption(navigation,"Watched")} name="Watched" component={Watched} />
        <Stack.Screen options={createOption(navigation,"Profile")} name="Profile" component={Profile} />
        <Stack.Screen options={createOption(navigation,"Movie")}   name="Movie"   component={Movie} />
        <Stack.Screen options={createOption(navigation,"TV")}      name="TV"      component={TV} />
        <Stack.Screen options={createOption(navigation,"Channel")} name="Channel"   component={Channel} />
        <Stack.Screen options={createOption(navigation,"Change")}  name="Change"  component={ChangeData} />
        <Stack.Screen options={createOption(navigation,"Search")}  name="Search"  component={Search} />
      </Stack.Navigator>
  );
}

const DrawerNav = (props) =>{
  const {isStatusHidden,getData,isLogin} = React.useContext(Datas)
  const [initialRoute,setRoute] = React.useState(()=>{
    if(getData('token')){
      return 'Login'
    }else{
      return 'BurgerNavigation'
    }
  })

  return(
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName={initialRoute} drawerContent={props =>(!isLogin?<BurgerMenuGuest {...props}/>:<BurgerMenu {...props}/>)}>
          <Drawer.Screen options={{ swipeEnabled: false,gestureEnabled:false }}  name="Login"  component={Login} />
          <Drawer.Screen options={{ swipeEnabled: false,gestureEnabled:false }}  name="Registration"  component={Registration} /> 
          <Drawer.Screen  name="BurgerNavigation"  component={stack} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar hidden={isStatusHidden}  style="inverted" />
    </>
  )
}

export default function App() {
  return (
    <><ContextProvider>
        <DrawerNav/>
      </ContextProvider>
    </>
  );
}

