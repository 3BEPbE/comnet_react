import React from 'react';
import { View ,StyleSheet,Text,Dimensions,Image,ScrollView,ActivityIndicator} from 'react-native';
import SeriaCarusel from '../components/SeriaCarusel'
import JanrCarusel from '../components/JanrCarusel'
import CardCarusel from '../components/CardCarusel'
import WatchBtn from '../components/WatchBtn' 
import TrailerAndroid from '../components/TrailerAndroid'
import Trailer from '../components/TrailerTV';
import { Datas } from '../context/context';
import Description from '../components/Description';
import Ranking from '../components/Ranking';

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

const isTV = 900<screenWidth

export default function Movie({route,navigation}) {
    const {isLogin,getCurrentMovie,getSrc,checkToken} = React.useContext(Datas) 
    const currentFilm = route.params;
    const [src,setSrc] = React.useState('')
    const [currentSeason,setCurrentSeason] = React.useState()
    const [currentSeria,setCurrentSeria] = React.useState()
    React.useEffect(()=>{      
        if(isLogin){
            checkToken(navigation)
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
        }else{
            const fetch = async()=>{           
                const actions = await getCurrentMovie(currentFilm.id)
                const src =  await getSrc({fileId:actions[0].fileId,id:actions[0].video_id})   
                setSrc(src)
                }
            fetch()
        }}
    },[currentSeason,currentSeria])
    return(
        <ScrollView style={styles.Page}>
        {  src ?  <>
            {isTV?
            <View style={{alignItems:'center'}}><Trailer src={currentFilm.thumbnail_big} /></View>:
            <View style={{alignItems:'center'}}><TrailerAndroid src={currentFilm.thumbnail_big} navigation={navigation}/></View>
            }
                <View style={styles.mainInfo}>
                    <Image style={styles.secondImage} source={{uri:currentFilm.thumbnail_small}}></Image>
                    <View style={styles.mainInfoText}> 
                        <Text style={styles.mainInfoTextItem1}>{currentFilm.name}</Text>
                        <Text style={styles.mainInfoTextItem3}>{currentFilm.countries}. {currentFilm.year} </Text>
                        <View style={styles.row}>
                            <View style={styles.mainInfoTextItem4Block}><Text style={styles.mainInfoTextItem4}>{currentFilm.rating}+</Text></View>
                            <View style={{display:(isTV?'flex':'none')}}></View><Ranking  currentFilm={currentFilm}/> 
                        </View>
                        
                    </View>
                </View>
            <View stylle={styles.content}>
                    <WatchBtn isLogin={isLogin} navigation={navigation} src={src}/>
                    {isLogin&&currentFilm.is_season? <SeriaCarusel currentSeria={currentSeria} setCurrentSeria={setCurrentSeria} currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} currentFilm={currentFilm}/>:<></>}
                    <Description currentFilm={currentFilm}/>
                    <View style={{display:(isTV?'none':'flex')}}></View><Ranking  currentFilm={currentFilm}/> 
                    <JanrCarusel navigation={navigation} janrName={currentFilm.genres}/>
                    <Text style={styles.caruselTitle}>Похожие фильмы</Text>
                    <CardCarusel navigation={navigation}/>
                    <Text style={styles.caruselTitle}>Фильмы которые идут по телеканалам в данный момент</Text>
                    <CardCarusel navigation={navigation}/>
            </View>
            </>:<View style={{width:screenWidth,height:screenHeight-150,alignItems:'center',justifyContent:'center'}}><ActivityIndicator  size="large" color='#fff' /></View>}
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
    
   
    caruselTitle:{
        paddingLeft:22,
        fontSize:18,
        color:'#fff',
        marginBottom:10,
        width:screenWidth-20,
    },
    row:{
        flexDirection:'row'
    }
  }); 