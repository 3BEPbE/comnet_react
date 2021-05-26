import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image,TouchableWithoutFeedback,ScrollView} from 'react-native';
import SeasonCarusel from '../components/SeasonCarusel'
import SeriaCarusel from '../components/SeriaCarusel'

const { width: screenWidth } = Dimensions.get('window')

export default function Movie({route}) {
    return(
        <ScrollView style={styles.Page}>
            <Image style={styles.firstImage} source={require('../images/exampleImage.png')}>
            </Image>
            <View stylle={styles.content}>
                <View style={styles.mainInfo}>
                    <Image style={styles.secondImage} source={require('../images/exampleImage2.png')}></Image>
                    <View style={styles.mainInfoText}> 
                        <Text style={styles.mainInfoTextItem1}>Необыкновенный плейлист Зои</Text>
                        <Text style={styles.mainInfoTextItem2}>Cезон 1. Cерия 1</Text>
                        <Text style={styles.mainInfoTextItem3}>США. 2020 (2 сезона)</Text>
                        <View style={styles.mainInfoTextItem4Block}><Text  style={styles.mainInfoTextItem4}>+18</Text></View>
                    </View>
                </View>
                <TouchableWithoutFeedback style={styles.button}>
                        <View style={styles.button}><Text style={styles.buttonText}>Приобрети подписку</Text></View>
                </TouchableWithoutFeedback>
                <SeasonCarusel/>
                <SeriaCarusel/>
            </View>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
   Page:{
       flex:1,
       backgroundColor:'#1C1C1C'
   },
   firstImage:{
        display:'flex',
        flexDirection:'row',
        height:200,
        width:screenWidth,
        resizeMode:'cover',
        marginBottom:20
   },
   content:{
       paddingLeft:20,
       paddingRight:20,
   },
   mainInfo:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20
   },
   secondImage:{
        height: (screenWidth-240)*1.4 -20,
        width:screenWidth-240,
        borderRadius:7,
        overflow:'hidden'
   },
   mainInfoText:{
    width:screenWidth - (screenWidth-230),
    marginLeft:20
   },
   mainInfoTextItem1:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
        marginBottom:15
   },
   mainInfoTextItem2:{
    fontSize:20,
    color:'#fff',
    marginBottom:15
    },
   mainInfoTextItem3:{
    fontSize:12,
    color:'#fff',
    marginBottom:18
    },
    mainInfoTextItem4:{
     fontSize:12,
     color:'#fff',
     },
    mainInfoTextItem4Block:{
     width:24,
     height:24,
     backgroundColor:'#373737',
     alignItems:'center',
     display:'flex',
     justifyContent:'center',
     flexDirection:'row',
     marginBottom:10,
     borderRadius: 7,
     overflow:'hidden'
     },
    button:{
        width:screenWidth-40,
        height:50,
        backgroundColor:'#E41A4B',
        margin:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7,
        overflow:'hidden'

    },
    buttonText:{
        color:'#fff',
        fontSize:15
    },
     
  });