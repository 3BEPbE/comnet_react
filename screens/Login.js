import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, Dimensions, ScrollView} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer'
import axios from 'axios'
const { width: screenWidth } = Dimensions.get('window')

export default function Login({navigation}) {
    const [data,setData] = React.useState({
        abonement:'',
        password:'',

    })
    const changeHandler = (text,condition) =>{
        let newData = {...data}
        newData[condition] = text;
        setData(newData)
    }
    const textInputs = []

    const login = () => {
        axios({
            method: 'POST',
            url:`http://192.168.1.106/api/login`,
            body:{
            }
            }).then((e)=>{
                console.log(e)
            }).catch((e)=>{
                console.log(e)
            })
    }
    
    return(
        <ScrollView style={styles.container}>
            <View style={styles.block}>
                <Image source={require('../images/logo.png')}/>
                <View style={styles.textBlock}>
                    <Text style={styles.infoText}>Войти</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.infoText}>Зарегистрироватся </Text>
                </View>
                <View style={styles.inputBlock}>
                    <View style={styles.inputItem}>
                        <Text style={styles.titleInput}>Абонемент</Text>
                        <DrawerItem onPress={()=>textInputs[0].focus()} style={styles.focusItem} label='' icon={()=>(
                           <TextInput ref={(input)=>{textInputs[0]=input}} value={data.abonement} onChangeText={(text)=>changeHandler(text,'abonement')} style={styles.input} autoCompleteType={'off'} autoCorrect={false}/>
                        )}/>
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.titleInput}>Пароль</Text>
                        <DrawerItem  onPress={()=>textInputs[1].focus()} style={styles.focusItem} label='' icon={()=>(
                             <TextInput ref={(input)=>{textInputs[1]=input}} secureTextEntry={true} autoCompleteType ='password' value={data.password} onChangeText={(text)=>changeHandler(text,'password')} style={styles.input} autoCompleteType={'off'} autoCorrect={false}/>
                        )}/>
                    </View>
                </View>
                <View style={styles.blockButton}>
                    <DrawerItem onPress={()=>login()} style={styles.focusItem} label='' icon={()=>(
                        <View style={styles.buttonLogin}>
                            <Text style={styles.buttonText}>Войти</Text>
                        </View>
                    )} />
                     <DrawerItem onPress={()=>navigation.navigate('Registration')} style={styles.focusItem}  label='' icon={()=>(
                        <View style={styles.buttonReg}>
                            <Text style={styles.buttonText}>Регистрация</Text>
                        </View>
                    )} />
                </View>
            </View>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
   
    container:{
        flex:1,
        backgroundColor:'#1C1C1C',
        padding:20
    },
    block:{
        marginTop:120,
        alignItems:'center'
    },
    textBlock:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:250
    },
    infoText:{
        fontWeight:'700',
        color:'#fff',
        fontSize:18,
        marginTop:50
    },
    line:{
        width:2,
        height:25,
        backgroundColor:'#fff',
        marginTop:50
    },
    titleInput:{
        color:'#6A6A6A',
        fontSize:16
    },
    inputBlock:{
        marginTop:55
    },
    inputItem:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
        width:screenWidth-40,
        marginBottom:15,

    },
    focusItem:{
        width:screenWidth-40,
        marginLeft:0,
        padding:0,
    },
    input:{
        width:screenWidth-40,
        fontSize:20,
        color:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#474747',
        paddingBottom:3,
        marginLeft:-5
    },
    buttonLogin:{
        width:'100%',
        height:50,
        backgroundColor:'#E41A4B',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        overflow:'hidden'
    },
    buttonReg:{
        width:'100%',
        height:50,
        backgroundColor:'#E41A4B',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        overflow:'hidden'
    },
    buttonText:{
        color:'#fff',
        fontSize:16
    },
    blockButton:{
        marginBottom:30
    }

  });