import React from 'react'
import { View, Text, StyleSheet,Dimensions,Image,Share } from 'react-native'



const { width: screenWidth } = Dimensions.get('window')

const icons = [
    {
        image:require('../images/adv1.png'),
        title:'Интерактивные каналы',
        text:`Что-то пропустил или нет возможности досмотреть? Ставь эфир на паузу или перемотай обратно! Архив 7 дней`
    },
    {
        image:require('../images/adv2.png'),
        title:`Online Кинотеатр`,
        text:`Огромный выбор фильмов, сериалов и телепередач`
    },
    {
        image:require('../images/adv3.png'),
        title:`Работает через Интернет`,
        text:`На любом провайдере и в любой точке Узбекистана! Не требует дополнительных антенн`
    },
    {
        image:require('../images/adv4.png'),
        title:`Видео высокой четкости`,
        text:`Поддержка разрешения HD, Full HD и 4K`
    },

]

const Advantages = ({navigation}) => {


    return(
        <View style={styles.container}>
           <Text style={styles.title}>Преимущества TVCOM</Text>
           {icons.map((item,i)=>
             (  <View key={i} style={styles.block}>
                   <View style={styles.iconBlock}><Image source={item.image} style={styles.icon}/></View> 
                   <Text style={styles.text}>{item.title}</Text>
                   <Text style={styles.description}>{item.text}</Text>
               </View>)
           )}
        </View>
    )
}

export default Advantages

const styles = StyleSheet.create({
    container:{
        width:screenWidth-40,
        marginLeft:20,
        padding:10,
        marginTop:20,
        marginBottom:40,
    },
    title:{
        fontSize:24,
        color:'#fff',
        marginTop:10,
        marginBottom:20
    },
    block:{
        alignItems:'center'
    },
   
    iconBlock:{
        width:110,
        height:110,
        borderRadius:100,
        overflow:'hidden',
        backgroundColor: `#E41A4B1A`,
        borderWidth:2,
        borderColor:'#E41A4B',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:'#fff',
        fontSize:18,
        marginBottom:18,
        marginTop:18,
        fontWeight:'bold'
    },
    description:{
        color:'#BCBCBC',
        fontSize:18,
        textAlign:'center',
        marginBottom:25,
        letterSpacing:1.1
    }
})