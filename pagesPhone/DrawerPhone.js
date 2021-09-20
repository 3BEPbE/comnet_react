import { Datas } from "../context"
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import MainMenu from "./mainMenu";
import ChannelList from './ChannelList'
import { BurgerMenu,BurgerMenuGuest } from "../componentsPhone/BurgerMenu";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import CurrentChannel from './CurrentChannel' 
import PlayerPhone from "./PlayerPhone";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()

const StackNavigator = (props) =>{
    const {createOption} = React.useContext(Datas)
    return(
        <Stack.Navigator>
             <Stack.Screen  options={createOption(props.navigation,"Home")} name="HomePhone"  component={MainMenu} />
             <Stack.Screen  options={createOption(props.navigation,"Home")} name="Channels"  component={ChannelList} />
             <Stack.Screen  options={{headerShown:false}} name="LoginPhone"  component={Login} />
             <Stack.Screen  options={{headerShown:false}} name="PlayerPhone"  component={PlayerPhone} />
             <Stack.Screen  options={createOption(props.navigation,"Home")} name="CurrentChannelPhone"  component={CurrentChannel} />
        </Stack.Navigator>
    )
}

const DrawerPhone = (props) => {
    const {getData,createOption,isLogin} = React.useContext(Datas)
    getData('token')
    return(
        <Drawer.Navigator  drawerContent={props =>(!isLogin?<BurgerMenuGuest {...props}/>:<BurgerMenu {...props}/>)}> 
            <Drawer.Screen options={{headerShown:false}} name="BurgerNavigation"  component={StackNavigator} />
        </Drawer.Navigator>

    )
  }

  export default DrawerPhone