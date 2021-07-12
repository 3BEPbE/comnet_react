import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image,ScrollView} from 'react-native';
import SeriaCarusel from '../components/SeriaCarusel'
import JanrCarusel from '../components/JanrCarusel'
import CardCarusel from '../components/CardCarusel'
import {DrawerItem} from '@react-navigation/drawer'
import TrailerAndroid from '../components/TrailerAndroid'
import Trailer from '../components/TrailerTV';
import { Datas } from '../context/context';

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

const isTV = 1000<screenWidth

export default function Movie({route,navigation}) {
    const {isLogin,getCurrentMovie,getSrc,checkToken} = React.useContext(Datas) 
    const [description,setDiscription] = React.useState(false)
    const currentFilm = route.params;
    const [src,setSrc] = React.useState('')
    const [currentSeason,setCurrentSeason] = React.useState()
    const [currentSeria,setCurrentSeria] = React.useState()

    React.useEffect(()=>{      
        if(isLogin){
            checkToken()
            if(currentFilm.is_season&&currentSeason&&currentSeria){
            const fetch = async()=>{ 
                const actions = await getCurrentMovie(currentFilm.id)
                const currentVid = await actions.filter((elem)=>{return elem.caption === `Сезон ${currentSeason} серия ${currentSeria}`})
               if(currentVid[0]){
                 const src =  await getSrc({fileId:currentVid[0].file_id,id:currentVid[0].video_id})
                 setSrc(src)   
               }

                }
            fetch()
        }}
    },[currentSeason,currentSeria])
    return(
        <ScrollView style={styles.Page}>
            {isTV?
            <View style={{alignItems:'center'}}><Trailer src={currentFilm.thumbnail_big} /></View>:
            <View style={{alignItems:'center'}}><TrailerAndroid src={currentFilm.thumbnail_big} navigation={navigation}/></View>
            }
                <View style={styles.mainInfo}>
                    <Image style={styles.secondImage} source={{uri:currentFilm.thumbnail_small}}></Image>
                    <View style={styles.mainInfoText}> 
                        <Text style={styles.mainInfoTextItem1}>{currentFilm.name}</Text>
                        <Text style={styles.mainInfoTextItem3}>{currentFilm.countries}. {currentFilm.year} </Text>
                        <View style={{flexDirection:'row'}}>
                        <View style={styles.mainInfoTextItem4Block}><Text  style={styles.mainInfoTextItem4}>{currentFilm.rating}+</Text></View>
                        <View style={{...styles.ranking,display:(isTV?'flex':'none')}}>
                            <View style={styles.rankingItem}>
                                    <Text  style={styles.rankingNumber}>{currentFilm.imdb_rating}</Text>
                                    <Text style={styles.rankingText}>IMDb</Text>
                            </View>
                            <View style={styles.rankingItem}>
                                    <Text style={styles.rankingNumber}>{currentFilm.kinopoisk_rating}</Text>
                                    <Text style={styles.rankingText}>КиноПоиск</Text>
                            </View>
                        </View> 
                        </View>
                       
                    </View>
                </View>
            <View stylle={styles.content}>
               {isLogin?<DrawerItem pressColor='#fff' style={{zIndex:2}} label='' onPress={()=>navigation.navigate(isTV?'WatchingTV':'Watching',{src})} icon={()=> 
                        (<View style={styles.button}><Text style={styles.buttonText}>Смотреть</Text></View>)} />
                        : <DrawerItem pressColor='#fff' style={{zIndex:2,marginTop:20}}   label='' onPress={()=>navigation.navigate('Watching')} icon={()=> 
                        (<View style={styles.button}><Text style={styles.buttonText}>Приобрети подписку</Text></View>)} />}
                   {isLogin&&currentFilm.is_season? <SeriaCarusel currentSeria={currentSeria} setCurrentSeria={setCurrentSeria} currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} currentFilm={currentFilm}/>:<></>}
                   {currentFilm.description ? <View> 
                   { description? <Text style={styles.aboutText}>{currentFilm.description}</Text>:
                   <Text style={styles.aboutText}>{currentFilm.description.slice(0,100)}...</Text>}
                    <DrawerItem pressColor='#fff' label='' onPress={()=>setDiscription((item)=>!item)} icon={()=>(
                    <View style={{height:20}}>                      
                    {description? <Text style={styles.aboutButton}>Скрыть</Text>:
                    <Text style={styles.aboutButton}>Подробнее</Text>}
                    </View>)}/></View>:<></>}

                    <View style={{...styles.ranking,display:(isTV?'none':'flex')}}>
                            <View style={styles.rankingItem}>
                                    <Text  style={styles.rankingNumber}>{currentFilm.imdb_rating}</Text>
                                    <Text style={styles.rankingText}>IMDb</Text>
                            </View>
                            <View style={styles.rankingItem}>
                                    <Text style={styles.rankingNumber}>{currentFilm.kinopoisk_rating}</Text>
                                    <Text style={styles.rankingText}>КиноПоиск</Text>
                            </View>
                    </View>  
                    <JanrCarusel janr={currentFilm.genres}/>
                    <Text style={styles.caruselTitle}>Похожие фильмы</Text>
                    <CardCarusel navigation={navigation}/>
                    <Text style={styles.caruselTitle}>Фильмы которые идут по телеканалам в данный момент</Text>
                    <CardCarusel navigation={navigation}/>
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
    paddingTop:isTV?80:20,
    marginTop:isTV?150:100,
    zIndex:3
   },
   secondImage:{
        height: 200,
        width:150,
        borderRadius:7,
        overflow:'hidden',
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
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7,
        overflow:'hidden',
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