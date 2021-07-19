import React from 'react';
import { View ,StyleSheet,Text, ScrollView,Image,TextInput,Dimensions} from 'react-native';
import { Button } from 'react-native-paper';
import { DrawerItem } from '@react-navigation/drawer'
import { Datas } from '../context/context';

const { width: screenWidth } = Dimensions.get('window')
const isTV = 900<screenWidth

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
                <DrawerItem pressColor='#fff' style={{alignItems:'center',justifyContent:'center'}} label='' icon={()=>(
                    <Text style={styles.changePhoto}>Изменить фото</Text>
                )}/>
                
            </View>
            <View style={styles.forma}>
                <View style={styles.formItem}>
                    <Text style={styles.titleInput}>Имя</Text>
                    <DrawerItem pressColor='#fff' onPress={()=>textInputs[0].focus()}  style={styles.focusInput} label='' icon={()=>(
                    <TextInput  ref={(input)=>{textInputs[0]=input}} autoFocus={true}  autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'name')}} value={data.name}  style={styles.input}/>)} /> 
                </View>
                <View style={styles.formItem} >
                    <Text style={styles.titleInput}>Фамилия</Text>
                    <DrawerItem pressColor='#fff' onPress={()=>textInputs[1].focus()} style={styles.focusInput} label='' icon={()=>(
                    <TextInput  ref={(input)=>{textInputs[1]=input}}  autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'surname')}} value={data.surname} style={styles.input}/>)} /> 
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.titleInput}>Пароль</Text>
                    <DrawerItem pressColor='#fff' onPress={()=>textInputs[2].focus()} style={styles.focusInput} label='' icon={()=>(
                    <TextInput  ref={(input)=>{textInputs[2]=input}}  autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'password')}} value={data.password} style={styles.input}/>)} /> 
                </View>
                <View style={styles.formItem}> 
                    <Text style={styles.titleInput}>Повторить Пароль</Text>
                    <DrawerItem pressColor='#fff' onPress={()=>textInputs[3].focus()} style={styles.focusInput} label='' icon={()=>(
                    <TextInput  ref={(input)=>{textInputs[3]=input}}  autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'repeatPassword')}} value={data.repeatPassword} multiline  style={styles.input}/>)} /> 
                </View>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                <DrawerItem style={styles.focusInput} pressColor='#fff'  label='' icon={()=>( <View  mode="contained" style={styles.button}><Text style={styles.buttonText}>Сохранить</Text></View>)}/>
                </View>
                
               
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
        marginTop:0,
        marginBottom:0
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
            marginTop:10
       },
       formItem:{
            marginTop:0,
            alignItems:'center',
            justifyContent:'center'
       },
       input:{
           borderBottomColor:'#474747',
           borderBottomWidth:1,
           height:40,
           color:'#fff',
           fontSize:20,
           width:'100%',
           paddingLeft:20,
           width:isTV?screenWidth/2:screenWidth-40, 
           
       },
       focusInput:{
        width:isTV?screenWidth/2+20:screenWidth-20,
        marginTop:15
       },
       titleInput:{
           color:'#fff',
           fontSize:16,
           width:isTV?screenWidth/2:screenWidth-40,
           marginBottom:-10
       },
       button:{
           backgroundColor:'#E41A4B',
           height:50,
           textAlign:'center',
           alignItems:'center',
           justifyContent:'center',
           width:isTV?screenWidth/2:screenWidth-40,
           borderRadius:7

       },
       buttonText:{
           color:'#fff',
           fontSize:18
       }
  });