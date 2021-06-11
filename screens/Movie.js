import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image,ScrollView} from 'react-native';
import SeasonCarusel from '../components/SeasonCarusel'
import SeriaCarusel from '../components/SeriaCarusel'
import JanrCarusel from '../components/JanrCarusel'
import CardCarusel from '../components/CardCarusel'
import {DrawerItem} from '@react-navigation/drawer'
import CustomVideoPlayer from '../components/Video/index'
import {Datas} from '../context/context'

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

const isTV = 1000<screenWidth

export default function Movie({route,navigation}) {

    const {createOption} = React.useContext(Datas)
    const [fullScreen,setScreen] = React.useState({
        display:'flex',
        headerShown:true,
        styleVideo:{
        height:screenWidth-150,
        width:screenWidth,
        },
        styleBar:{
            bottom:0
        }
    })
    
    React.useEffect(()=>{
        const option = createOption(navigation,'Movie')
        navigation.setOptions({...option,headerShown:fullScreen.headerShown})
    },[fullScreen])

    return(
        <ScrollView style={styles.Page}>
            <View style={{alignItems:'center'}}><CustomVideoPlayer fullScreen={fullScreen} setScreen={setScreen}/></View>
            <View stylle={{...styles.content,display:'none'}}>
                <View style={{...styles.mainInfo,display:fullScreen.display}}>
                    <Image style={styles.secondImage} source={require('../images/exampleImage2.png')}></Image>
                    <View style={styles.mainInfoText}> 
                        <Text style={styles.mainInfoTextItem1}>Необыкновенный плейлист Зои</Text>
                        <Text style={styles.mainInfoTextItem2}>Cезон 1. Cерия 1</Text>
                        <Text style={styles.mainInfoTextItem3}>США. 2020 (2 сезона)</Text>
                        <View style={{flexDirection:'row'}}>
                        <View style={styles.mainInfoTextItem4Block}><Text  style={styles.mainInfoTextItem4}>+18</Text></View>
                        <View style={{...styles.ranking,display:(isTV?'flex':'none')}}>
                            <View style={styles.rankingItem}>
                                    <Text  style={styles.rankingNumber}>8.1</Text>
                                    <Text style={styles.rankingText}>IMDb</Text>
                            </View>
                            <View style={styles.rankingItem}>
                                    <Text style={styles.rankingNumber}>8</Text>
                                    <Text style={styles.rankingText}>КиноПоиск</Text>
                            </View>
                        </View> 
                        </View>
                       
                    </View>
                </View>
                <View style={{display:fullScreen.display}}>
                    <DrawerItem  label='' icon={()=>
                        (<View style={styles.button}><Text style={styles.buttonText}>Приобрети подписку</Text></View>)} />
                    <SeasonCarusel/>
                    <SeriaCarusel/>
                    <Text style={styles.aboutText}>После обследования головного мозга Зои получила дар телепатии. Эта суперспособность превращает жизнь в девушки в мюзикл, ведь все желания и мысли людей она слышит в формате музыкального представления. ...</Text>
                    <DrawerItem label='' icon={()=>(
                    <View style={{height:20}}>
                        <Text style={styles.aboutButton}>Подробнее</Text>
                    </View>)}/>

                    <View style={{...styles.ranking,display:(isTV?'none':'flex')}}>
                            <View style={styles.rankingItem}>
                                    <Text  style={styles.rankingNumber}>8.1</Text>
                                    <Text style={styles.rankingText}>IMDb</Text>
                            </View>
                            <View style={styles.rankingItem}>
                                    <Text style={styles.rankingNumber}>8</Text>
                                    <Text style={styles.rankingText}>КиноПоиск</Text>
                            </View>
                    </View>  
                    <JanrCarusel/>
                    <Text style={styles.caruselTitle}>Похожие фильмы</Text>
                    <CardCarusel navigation={navigation} />
                    <Text style={styles.caruselTitle}>Фильмы которые идут по телеканалам в данный момент</Text>
                    <CardCarusel navigation={navigation}/>
                </View>
            </View>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
   Page:{
       flex:1,
       backgroundColor:'#1C1C1C'
   },
   content:{
       paddingLeft:0,
       paddingRight:0,
   },
   mainInfo:{
    display:'flex',
    flexDirection:'row',
    justifyContent: isTV?`flex-start`:'space-between',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20
   },
   secondImage:{
        height: 200,
        width:150,
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
        marginTop:20,
        marginBottom:20,
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
    aboutText:{
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:20,
        color:'#BCBCBC',
        fontSize:14
    },
    aboutButton:{
        color:'#E41A4B',
        fontSize:16,
        marginBottom:20
    },
    ranking:{
        display:'flex',
        flexDirection:'row',
        width:100,
        justifyContent:'space-between',
        marginLeft:20,
        marginBottom:20
    },
    rankingNumber:{
        color:'#fff',
        fontSize:17,
        fontWeight:'bold'
    },
    rankingText:{
        color:'#fff',
        fontSize:10,
    },
    caruselTitle:{
        paddingLeft:22,
        fontSize:18,
        color:'#fff',
        marginBottom:10,
        width:screenWidth-20,
    }
  }); 