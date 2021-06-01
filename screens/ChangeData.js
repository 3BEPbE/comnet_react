import React from 'react';
import { View ,StyleSheet,Text,TouchableWithoutFeedback, ScrollView,Image,TextInput} from 'react-native';
import { Button } from 'react-native-paper';
export default function ChangData(props) {

    const [data,setData] = React.useState({
        name:'',
        surname:'',
        password:'',
        repeatPasword:'',
    })
    const changeHandler = (text,condition) => {
        let newData ={...data}
        newData[condition] = text;
        setData(newData)
    }
    return(
        <ScrollView style={styles.Container}>
            <View style={styles.personalData}>
                <Image style={styles.ProfileImage} source={require('../images/burgerMenuProfile.png')}/>
                <Text style={styles.changePhoto}>Изменить фото</Text>
            </View>
            <View style={styles.forma}>
                <View style={styles.formItem}>
                    <Text style={styles.titleInput}>Имя</Text>
                    <TextInput   autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'name')}} value={data.name} multiline  style={styles.input}/>
                </View>
                <View style={styles.formItem} >
                    <Text style={styles.titleInput}>Фамилия</Text>
                    <TextInput   autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'surname')}} value={data.surname} multiline  style={styles.input}/>
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.titleInput}>Пароль</Text>
                    <TextInput secureTextEntry={true}   autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'password')}} value={data.password} multiline  style={styles.input}/>
                </View>
                <View style={styles.formItem}> 
                    <Text style={styles.titleInput}>Повторить Пароль</Text>
                    <TextInput   autoCompleteType={'off'} autoCorrect={false}  onChangeText={(e)=>{changeHandler(e,'repeatPasword')}} value={data.repeatPasword} multiline  style={styles.input}/>
                </View>
                <Button  mode="contained" style={styles.button}> Сохранить</Button>
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
           marginTop:20,
           marginTop:20,
           fontSize:20,
           color:'#fff'
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

       },
       titleInput:{
           color:'#fff',
           fontSize:16
       },
       button:{
           backgroundColor:'#E41A4B',
           height:50,
           textAlign:'center',
           justifyContent:'center',
           marginTop:70,
           marginBottom:40
       }

  });