import React from 'react';
import { View ,StyleSheet,Text,Image, ScrollView,TouchableWithoutFeedback} from 'react-native';
import TarifCarusel from '../components/TarifCarusel'
import {Datas} from '../context/context'


export default function Watched(props) {
    const {test} = React.useContext(Datas)
    return(
        <ScrollView style={styles.Container}>
            <View style={styles.personalData}>
                <Image style={styles.ProfileImage} source={require('../images/burgerMenuProfile.png')}/>
                <Text style={styles.name}>Имя Фамилия</Text>
                <Text style={styles.login}>абонемент0012</Text>
            </View>
            <View style={styles.balanceBlock}>
                <Text style={styles.balanceText}>Баланс:</Text>
                <Text style={styles.balance}>0.00 сум</Text>
            </View>
            <View style={styles.balanceBlock}>
                <Text style={styles.balanceText}>Ежемесячный платеж:</Text>
                <Text style={styles.balanceText}>25.000 сум</Text>
            </View>
            <Text style={styles.additional}>Доступные пакеты:</Text>
            <TarifCarusel pay={true}/>
            <Text style={styles.additional}>Способы оплаты </Text>
            <TarifCarusel pay={false}/>
            <View style={styles.footer}>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Change')}>
                    <View style={styles.iconBlock}>
                        <Image style={styles.icon} source={require('../images/changeIcon.png')}></Image>
                        <Text style={styles.iconText}>Изменить</Text>
                    </View>  
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style={styles.iconBlock}>
                        <Image style={styles.icon} source={require('../images/burgerMenuIcon11.png')}></Image>
                        <Text style={styles.iconText}>Выйти</Text>
                    </View>  
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
   Container:{
       flex:1,
       backgroundColor:'#1C1C1C',
       padding:20
   },
   personalData:{
    alignItems:'center',
    marginTop:20,
    marginBottom:10
   },
   ProfileImage:{
    backgroundColor:'#474747',
    overflow:'hidden',
    borderRadius:100,
    width:77,
    height:77
   },
   name:{
    marginTop:20,
       marginTop:20,
       fontSize:20,
       color:'#fff'
   },
   login:{
    marginTop:10,
    color:'#F08019',
    fontSize:15
   },
   balanceBlock:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       marginTop:25
   },
   balanceText:{
       color:'#fff'
   },
   balance:{
       color:'#F08019'
   },
   additional:{
       color:'#fff',
       marginTop:25,
       marginBottom:20
   },
   iconBlock:{
        marginTop:30,
        display:'flex',
        flexDirection:'row'
   },
   icon:{
       width:21,
       height:21,
       marginRight:17
   },
   iconText:{
       color:'#fff'
   },
   footer:{
       marginBottom:60,
       marginTop:20,
       marginLeft:5
   }
  });