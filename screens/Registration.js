import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, Dimensions, ScrollView} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer'
import { Checkbox, Drawer } from 'react-native-paper';
import axios from 'axios'

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth>950
export default function Registration(props) {
    const [checked, setChecked] = React.useState(false);
    const [status,setStatus] = React.useState({
        log:false,
        reg:false
    })
    const textInputs=[];
    const [data,setData] = React.useState({
        number:''
    })
    const changeNumber = (text) => {
        let newData = {...data}
        newData.number = text
        setData(newData)
    }
    const [aksiya,setAksiya] = React.useState({
       one: {backgroundColor:'transparent'},
       two:{backgroundColor:'transparent'}
    })
    return(
        <ScrollView style={styles.container}>
            <View style={styles.block}>
                <Image source={require('../images/logo.png')}/>
                <View style={styles.textBlock}>
                    <Text style={styles.infoText}>Регистрация</Text>      
                </View>
                    <DrawerItem  pressColor='#fff' onPress={()=>{
                        setStatus({log:!status.log,reg:false})
                    }} style={{...styles.focusItem,marginTop:20}} label='' icon={()=>(
                        <View style={{...styles.button,backgroundColor:status.log?'#E41A4B':'transparent'}}>
                            <Text style={styles.buttonText}>Я абонент Comnet</Text>
                        </View>
                    )} />
                     <DrawerItem pressColor='#fff' onPress={()=>{
                        setStatus({log:false,reg:!status.reg})
                        }} style={styles.focusItem}  label='' icon={()=>(
                        <View style={{...styles.button,backgroundColor:status.reg?'#E41A4B':'transparent'}}>
                            <Text style={styles.buttonText}>Я не абонент Comnet</Text>
                        </View>
                    )} />
                <View style={{...styles.inputBlock,display:status.log?'flex':'none'}}>
                    <View style={styles.inputItem}>
                        <Text style={styles.titleInput}>Номер телефона*</Text>
                        <DrawerItem pressColor='#fff' onPress={()=>textInputs[0].focus()} style={styles.focusItem2} label='' icon={()=>(
                           <TextInput ref={(input)=>{textInputs[0]=input}} style={styles.input} autoCompleteType={'off'} autoCorrect={false}/>
                        )}/>
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.titleInput}>Логин Comnet*</Text>
                        <DrawerItem pressColor='#fff' onPress={()=>textInputs[1].focus()} style={styles.focusItem2} label='' icon={()=>(
                             <TextInput ref={(input)=>{textInputs[1]=input}} style={styles.input} autoCompleteType={'off'} autoCorrect={false}/>
                        )}/>
                    </View>
                </View>
                <View style={{...styles.inputBlock,display:status.reg?'flex':'none'}}>
                    <View style={styles.inputItem}>
                        <Text style={styles.titleInput}>Номер телефона*</Text>
                        <DrawerItem pressColor='#fff' onPress={()=>textInputs[2].focus()} style={styles.focusItem2} label='' icon={()=>(
                           <TextInput value={data.number} onChangeText={(e)=>changeNumber(e)} ref={(input)=>{textInputs[2]=input}}  style={styles.input} autoCompleteType={'off'} autoCorrect={false}/>
                        )}/>
                    </View>
                    <View style={styles.aksiya}>
                        <DrawerItem pressColor='#fff' onPress={()=>{
                            if(aksiya.one.backgroundColor==='#E41A4B'){
                                setAksiya({one:{backgroundColor:'transparent'},two:{backgroundColor:'transparent'}});return}
                            setAksiya({one:{backgroundColor:'#E41A4B'},two:{backgroundColor:'transparent'}});}} 
                            style={styles.aksiyaFocus} label='' icon={()=>(
                                <View style={{...styles.aksiyaBtn,...aksiya.one}}><Text style={styles.aksiyaText1}>Использовать Промокод</Text></View>)}/>
                        <DrawerItem pressColor='#fff'
                            onPress={()=>
                               {if(aksiya.two.backgroundColor==='#E41A4B'){
                                setAksiya({one:{backgroundColor:'transparent'},two:{backgroundColor:'transparent'}});return}
                                setAksiya({one:{backgroundColor:'transparent'},two:{backgroundColor:'#E41A4B'}})}} 
                                style={styles.aksiyaFocus} style={styles.aksiyaFocus} label='' icon={()=>(
                                <View style={{...styles.aksiyaBtn,...aksiya.two}}><Text style={styles.aksiyaText2}>Акция “Приведи друга”</Text></View>)}/>
                    </View>
                </View>
                <View style={styles.agreeBlock}>
                    <Checkbox color='#fff' uncheckedColor='#373737' status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}/> 
                        <DrawerItem pressColor='#fff' label='' style={{width:300}} icon={()=>(       
                        <View style={styles.agreeTextBlock}>    
                            <Text style={styles.textAgree1}>Я принимаю<Text style={styles.textAgree2}> условия пользовательского соглашения</Text></Text>

                        </View>)}/>
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
        fontSize:16,
        marginLeft:5,
        marginBottom:5
    },
    inputBlock:{
        marginTop:20,
        alignItems:'center'
    },
    inputItem:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
        width:isTV?400:screenWidth-40,
        marginBottom:15,

    },
    focusItem2:{
        width:isTV?400:screenWidth-40,
        marginLeft:isTV?0:0,
        padding:0,
        alignItems:'center',
        justifyContent:'center'
    },
    focusItem:{
        width:isTV?300:screenWidth-45,
        marginLeft:isTV?0:0,
        top:0,left:0,right:0,bottom:0,
    },
    input:{
        width:isTV?400:screenWidth-40,
        fontSize:20,
        color:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#474747',
        paddingBottom:3,
        marginLeft:80
    },
    blockButton:{
        marginTop:70
    },
    button:{
        width:isTV?300:screenWidth-60,
        marginLeft:isTV?0:0,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        overflow:'hidden',
        borderWidth:1,
        borderColor:'#E41A4B'
    },
    buttonText:{
        color:'#fff',
        fontSize:16
    },
    agreeBlock:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:40,
    },
    agreeTextBlock:{
        flexDirection:'row',
        marginLeft:-40
    },
    textAgree1:{
        color:'#fff',
        marginLeft:40
    },
    textAgree2:{
        color:'#E41A4B',
        width:isTV?'100%':200,
    },
    aksiya:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:isTV?400:screenWidth-40,
    },
    aksiyaBtn:{
        width:isTV?180:screenWidth/2-30,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
        overflow:'hidden',
        borderWidth:1,
        borderColor:'#E41A4B'
    },
    aksiyaFocus:{
        width:isTV?190:screenWidth/2-20,
        marginLeft:0,
        marginRight:0
    },
    aksiyaText1:{
        color:'#fff',
        width:150,
        textAlign:'center'
    },
    aksiyaText2:{
        color:'#fff',
        width:150,
        textAlign:'center'
    }

  });