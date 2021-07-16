import React from 'react';
import { View ,StyleSheet,Text,TouchableWithoutFeedback, ScrollView,Image,TextInput} from 'react-native';
import { Button } from 'react-native-paper';
import { DrawerItem } from '@react-navigation/drawer'
import { Datas } from '../context/context';

export default function ChangData(props) {

    const { checkToken} =React.useContext(Datas)
    React.useEffect(()=>{
        checkToken(props.navigation)
    },[])
    const [data,setData] = React.useState({
        name:'',
        surname:'',
        password:'',
        repeatPassword:'',
    })
    const changeHandler = (text,condition) => {
        let newData ={...data}
        newData[condition] = text;
        setData(newData)
    }
    const textInputs=[]
    return(
        <ScrollView style={styles.Container}>
            <View style={styles.personalData}>
                <Image style={styles.ProfileImage} source={require('../images/burgerMenuProfile.png')}/>
                <DrawerItem style={{alignItems:'center',justifyContent:'center'}} label='' icon={()=>(
                    <Text style={styles.changePhoto}>Изменить фото</Text>
                )}/>
                
            </View>
            <View style={styles.forma}>
                <View style={styles.formItem}>
                    <Text style={styles.titleInput}>Имя</Text>
                    <DrawerItem onPress={()=>textInputs[0].focus()}  style={{marginLeft:-20,marginRight:-20,marginBottom:-10}} label='' icon={()=>(
                    <TextInput  ref={(input)=>{textInputs[0]=input}} autoFocus={true}  autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'name')}} value={data.name}  style={styles.input}/>)} /> 
                </View>
                <View style={styles.formItem} >
                    <Text style={styles.titleInput}>Фамилия</Text>
                    <DrawerItem onPress={()=>textInputs[1].focus()} style={{marginLeft:-20,marginRight:-20,marginBottom:-10}} label='' icon={()=>(
                    <TextInput  ref={(input)=>{textInputs[1]=input}}  autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'surname')}} value={data.surname} style={styles.input}/>)} /> 
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.titleInput}>Пароль</Text>
                    <DrawerItem onPress={()=>textInputs[2].focus()} style={{marginLeft:-20,marginRight:-20,marginBottom:-10}} label='' icon={()=>(
                    <TextInput  ref={(input)=>{textInputs[2]=input}}  autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'password')}} value={data.password} style={styles.input}/>)} /> 
                </View>
                <View style={styles.formItem}> 
                    <Text style={styles.titleInput}>Повторить Пароль</Text>
                    <DrawerItem onPress={()=>textInputs[3].focus()} style={{marginLeft:-20,marginRight:-20,marginBottom:-10}} label='' icon={()=>(
                    <TextInput  ref={(input)=>{textInputs[3]=input}}  autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'repeatPassword')}} value={data.repeatPassword} multiline  style={styles.input}/>)} /> 
                </View>
                <DrawerItem style={{marginLeft:-20,marginRight:-20}} label='' icon={()=>( <View  mode="contained" style={styles.button}><Text style={styles.buttonText}>Сохранить</Text></View>)}/>
               
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
       changePhoto:{
           fontSize:20,
           color:'#fff',
           marginLeft:60
       },
       forma:{
            marginTop:20
       },
       formItem:{
            marginTop:15
       },
       input:{
           borderBottomColor:'#474747',
           borderBottomWidth:1,
           height:40,
           color:'#fff',
           fontSize:20,
           width:'100%',
           paddingLeft:20
       },
       titleInput:{
           color:'#fff',
           fontSize:16
       },
       button:{
           backgroundColor:'#E41A4B',
           height:50,
           textAlign:'center',
           alignItems:'center',
           justifyContent:'center',
           width: '100%',
           marginTop:40,
           marginBottom:60
       },
       buttonText:{
           color:'#fff',
           fontSize:18
       }

  });