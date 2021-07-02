import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'; 
import Home from './screens/Home'
import Watching from './screens/Watching';
import WatchingTV from './screens/WatchingTV';
import Movie from './screens/Movie'
import ChangeData from './screens/ChangeData'
import MovieList from './screens/MovieList.js'
import Profile from './screens/Profile'
import Search from './screens/Search'
import Login from './screens/Login'
import Registration from './screens/Registration'
import TV from './screens/TV'
import Channel from './screens/Channel';
import {BurgerMenu,BurgerMenuGuest} from './components/BuregerMenu'
import {ContextProvider, Datas} from './context/context'


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function stack({ navigation }) {
  const {createOption} = React.useContext(Datas)
  return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={createOption(navigation,"Home")}    name="Home"    component={Home} />
        <Stack.Screen options={createOption(navigation,"MovieList")} name="MovieList" component={MovieList} />
        <Stack.Screen options={createOption(navigation,"Profile")} name="Profile" component={Profile} />
        <Stack.Screen options={createOption(navigation,"Movie")}   name="Movie"   component={Movie} />
        <Stack.Screen options={createOption(navigation,"TV")}      name="TV"      component={TV} />
        <Stack.Screen options={createOption(navigation,"Channel")} name="Channel"   component={Channel} />
        <Stack.Screen options={createOption(navigation,"Change")}  name="Change"  component={ChangeData} />
        <Stack.Screen options={createOption(navigation,"Search")}  name="Search"  component={Search} />
        <Stack.Screen options={{headerShown:false}}  name="Watching"  component={Watching} />
        <Stack.Screen options={{headerShown:false}}  name="WatchingTV"  component={WatchingTV} />
      
     
      </Stack.Navigator>
  );
}

const DrawerNav = (props) =>{
  const {isStatusHidden,getData,isLogin} = React.useContext(Datas)
  const [initialRoute,setRoute] = React.useState(()=>{
    if(!getData('token')){
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

