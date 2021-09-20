import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, Dimensions, ScrollView} from 'react-native';
import {Datas} from '../context'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

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
    return(
    <View style={styles.container}>
        <View style={styles.block}>
            <View style={styles.content1}>
                <Image style={styles.logo} source={require('../images/logo.png')}/>
                <View style={styles.textBlock}>
                    <Text style={styles.infoText}>Войти</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.infoText}>Зарегистрироватся </Text>
                </View>
            </View>
            <View style={styles.inputBlock}>
                <View style={styles.inputItem}>
                       <Text style={{...styles.titleInput,color:errorColor}}>Абонемент</Text>
                       <TextInput  keyboardType="numeric" ref={(input)=>{textInputs[0]=input}} value={data.abonement} onChangeText={(text)=>changeHandler(text,'abonement')} style={{...styles.input,borderColor:errorColor}} autoCompleteType={'off'} autoCorrect={false}/>
                </View>
                <View style={styles.inputItem}>
                    <Text style={{...styles.titleInput,color:errorColor}}>Пароль</Text>
                         <TextInput  ref={(input)=>{textInputs[1]=input}} secureTextEntry={true} autoCompleteType ='password' value={data.password} onChangeText={(text)=>changeHandler(text,'password')}  keyboardType="numeric" style={{...styles.input,borderColor:errorColor}} autoCompleteType={'off'} autoCorrect={false}/>
                </View>
            </View>
            <View style={styles.blockButton}>
                <Text style={{...styles.error,opacity:errorColor==='#e5474c'?1:0}}>
                Аккаунт по указанным параметрам не найден.
                </Text>
                    <TouchableWithoutFeedback onPress={()=>login(data,setError,navigation,route.params.routeName)}>
                        <View style={styles.buttonLogin}>
                            <Text style={styles.buttonText}>Войти</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.buttonReg}>
                        <Text style={styles.buttonText}>Регистрация</Text>
                    </View>
            </View>
        </View>
    </View>
        
    )
}
const styles = StyleSheet.create({
    content1:{
        height:screenHeight/100*33,
        alignItems:'center', 
        justifyContent:'space-around'
    },
    container:{
        flex:1,
        backgroundColor:'#0A0A0A',
        height:screenHeight
    },
    block:{
        alignItems:'center',
        height:screenHeight
    },
    logo:{
        marginTop:20
    },
    textBlock:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:250,
        marginTop:40
    },
    infoText:{
        fontWeight:'700',
        color:'#fff',
        fontSize:18,
    },
    line:{
        width:2,
        height:25,
        backgroundColor:'#fff',
    },
    titleInput:{
        color:'#6A6A6A',
        fontSize:16
    },
    inputBlock:{
        alignItems:'center',
        height:screenHeight/100*33,
        justifyContent:'space-around'
    },
    inputItem:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
        width:screenWidth-40,
        marginBottom:10,
    },
    input:{
        width:'100%',
        fontSize:20,
        color:'#fff',
        borderBottomWidth:1,
        paddingBottom:3,

    },
    buttonLogin:{
        width:screenWidth-40,
        height:45,
        backgroundColor:'#E41A4B',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        overflow:'hidden'
    },
    buttonReg:{
        width:screenWidth-40,
        height:45,
        backgroundColor:'#242424',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        overflow:'hidden',
        marginTop:20
    },
    buttonText:{
        color:'#fff',
        fontSize:16
    },
    blockButton:{
        height:screenHeight/33,
        alignItems:'center',
    },
    error:{
        color:'#fff',
        width:600,
        textAlign:'center',
        fontSize:15,
        marginTop:0,
        marginBottom:5
    }

  });