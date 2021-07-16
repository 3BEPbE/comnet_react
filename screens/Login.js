import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, Dimensions, ScrollView} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer'
import {Datas} from '../context/context'

const { width: screenWidth } = Dimensions.get('window')

export default function Login({navigation,route}) {

    const {login} = React.useContext(Datas)

    const [errorColor,setError] = React.useState('#969696')
    const [data,setData] = React.useState({
        abonement:'',
        password:'',

    }) 
    const changeHandler = (text,condition) =>{
        let newData = {...data}
        newData[condition] = text;
        setData({...newData})
    }
    const textInputs = []

    console.log()

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
                    <Text style={{...styles.titleInput,color:errorColor}}>Абонемент</Text>
                    <DrawerItem pressColor='#fff' onPress={()=>textInputs[0].focus()} style={styles.focusItem} label='' icon={()=>(
                       <TextInput ref={(input)=>{textInputs[0]=input}} value={data.abonement} onChangeText={(text)=>changeHandler(text,'abonement')} style={{...styles.input,borderColor:errorColor}} autoCompleteType={'off'} autoCorrect={false}/>
                    )}/>
                </View>
                <View style={styles.inputItem}>
                    <Text style={{...styles.titleInput,color:errorColor}}>Пароль</Text>
                    <DrawerItem  pressColor='#fff' onPress={()=>textInputs[1].focus()} style={styles.focusItem} label='' icon={()=>(
                         <TextInput ref={(input)=>{textInputs[1]=input}} secureTextEntry={true} autoCompleteType ='password' value={data.password} onChangeText={(text)=>changeHandler(text,'password')} style={{...styles.input,borderColor:errorColor}} autoCompleteType={'off'} autoCorrect={false}/>
                    )}/>
                </View>
            </View>
            <View style={styles.blockButton}>
                <Text style={{...styles.error,opacity:errorColor==='#e5474c'?1:0}}>
                Аккаунт по указанным параметрам не найден.
                </Text>
                <DrawerItem pressColor='#fff' onPress={()=>login(data,setError,navigation,route.params.routeName)} style={styles.focusItem} label='' icon={()=>(
                    <View style={styles.buttonLogin}>
                        <Text style={styles.buttonText}>Войти</Text>
                    </View>
                )} />
                 <DrawerItem pressColor='#fff' onPress={()=>navigation.navigate('Registration')} style={styles.focusItem}  label='' icon={()=>(
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
        marginTop:50,
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
        marginBottom:10
        ,

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
        paddingBottom:3,
        marginLeft:-5,

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
    },
    error:{
        color:'#fff',
        width:screenWidth-40,
        textAlign:'center',
        fontSize:15,
        marginTop:0,
        marginBottom:10
    }

  });