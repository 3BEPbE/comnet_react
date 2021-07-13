import React from 'react';
import { View ,StyleSheet,Text, ScrollView,ImageBackground,Dimensions,Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import JanrCarusel from '../components/JanrCarusel';
import CardCarusel from '../components/CardCarusel'
import ChannelCarusel from '../components/ChannelCarusel'
import { DrawerItem } from '@react-navigation/drawer'
import { Datas } from '../context/context';
import ListProgram from '../components/ListProgram';

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')
const isTV = screenWidth>900
export default function Channel({route,navigation}) {
    const currentFilm = route.params
    const { checkToken,getChannelSrc} =React.useContext(Datas)
    const [src,setSrc] = React.useState('')

    React.useEffect(()=>{
        const fetch = async () =>{
            let src = await getChannelSrc(currentFilm.id)
            setSrc(src.uri)
        }
        fetch()
        checkToken()
    },[])
    const converter = (sec)=>{
        var d = new Date(sec*1000+5*60*1000*60);
        var time = d; 
        let hour = `${time.getUTCHours()}`.length===1?`0${time.getUTCHours()}`:time.getUTCHours()
        let minute =  `${time.getUTCMinutes()}`.length===1?`0${time.getUTCMinutes()}`:time.getUTCMinutes()
        return [`${hour}:${minute}`,]
    }
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.channelName}>{currentFilm.name} смотреть онлайн</Text>
            {/* <Text style={styles.channelType} >Новости, Кино, Эфирные</Text> */}
            <ImageBackground resizeMode='contain' source={{uri:currentFilm.icon}} style={styles.image}>
                <View style={styles.ImageBlock}  >
                    <View>
                        {/* <Text style={styles.imageText}>Просмотр доступен бесплатно после авторизации</Text> */}
                        <DrawerItem onPress={()=>{isTV?navigation.navigate('WatchingTV',{vid:{uri:src,overrideFileExtensionAndroid:'m3u8'},isChannel:true}):navigation.navigate('Watching',{vid:{uri:src,overrideFileExtensionAndroid:'m3u8'},isChannel:true})}} pressColor='#fff'  style={{marginLeft:20,marginRight:180,height:70}} label='' icon={()=>(
                          <View style={styles.imageButton}>
                              <Text style={styles.imageButtonText}>Смотреть бесплатно</Text>
                          </View>
                        )}/>
                      
                    </View>
                </View>
            </ImageBackground>
            <Text style={styles.mainData}>{converter(currentFilm.program_begin_time)} - {converter(currentFilm.program_end_time)}</Text>
            <Text style={styles.mainData}>{currentFilm.program_name}</Text>
            <View style={styles.senzura}>
                <Text style={styles.senzuraText}>
                   {currentFilm.program_rating}+
                </Text>
            </View>
            <Text style={styles.info}>
            {currentFilm.program_description}
            </Text>
            {/* <JanrCarusel/> */}

            <View style={styles.timeTable}>
                <ListProgram navigation={navigation} currentFilm={currentFilm}/>
            </View>
            <ImageBackground style={styles.advertise} source={require('../images/channelExample.png')}>
                    <Text style={styles.advertiseText}>Смотри в приложении</Text>
                    <View style={styles.adButtons}>
                        <Image style={styles.apple} source={require('../images/apple.png')}/>
                        <Image style={styles.android} source={require('../images/android.png')}/>
                    </View>
            </ImageBackground>
            <Text style={styles.channelName}>Лучшее на ТВ сейчас</Text>
            <ChannelCarusel/>
            <DrawerItem pressColor='#fff' label='' style={{marginRight:200,height:40}} icon={()=>(
                 <View style={styles.titleMovieBlock}>
                    <Text style={styles.titleMovie}>Новинки кино</Text>
                 <Image style={styles.strelka} source={require('../images/strelka.png')}/>
             </View>
            )}/>
           
            <CardCarusel/>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
   
    container:{
        flex:1,
        backgroundColor:'#1C1C1C'
    },
    channelName:{
        fontSize:20,
        color:'#fff',
        marginLeft:20,
        marginTop:20,
        fontWeight:'700'
    },
    channelType:{
        color: '#474747',
        fontSize:16,
        marginLeft:20,
        marginTop:15,
    },
    image:{
        width:'100%',
        height:isTV?screenHeight/3.5:220,
        marginTop:35,
        marginBottom:10,
        resizeMode:'stretch'
    },
    ImageBlock:{   
        bottom:0,
        height:220,
        justifyContent:'flex-end',
    },
    imageText:{
        paddingLeft:20,
        paddingRight:20,
        color:'#fff',
        fontSize:18,
        lineHeight:22,
        marginBottom:20
    },
    imageButton:{
        height:45,
        marginLeft:-5,
        width:190,
        backgroundColor:'#E41A4B',
        borderRadius:7,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:25
    },
    imageButtonText:{
        color:'#fff',
        fontSize:15
    },
    mainData:{
        color:'#fff',
        fontSize:20,
        paddingLeft:20,
        paddingRight:20,
        marginTop:10
    },
    senzura:{
        paddingLeft:2,
        paddingRight:2,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#373737',
        width:28,
        height:20,
        marginLeft:20,
        marginTop:10,
        borderRadius:3
    },
    senzuraText:{
        fontSize:12,
        color:'#fff'
    },
    info:{
        fontSize:13,
        color:'#fff',
        paddingRight:20,
        paddingLeft:20,
        marginTop:10,
        marginBottom:10
    },
    timeTableItem:{
        position:'relative',
        width:'100%',
        height:55,
        backgroundColor:'#373737',
        marginTop:10,
        justifyContent:'center'
    },
    progress:{
       position:'absolute' ,
       height:55,
       width:'100%',
       backgroundColor:'#E41A4B',
       borderRadius:7,
    },
    timeTableInfo:{
        zIndex:2,
        padding:10
    },
    timeTableTextblock:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    timetext1:{
        color:'#fff',
        fontSize:14
    },
    timetext2:{
        color: 'rgba(254, 254, 254, 0.5)',
        fontSize:14
    },
    timetext3:{
        color:'#fff',
        fontSize:14
    },
    advertise:{
        width: screenWidth-40,
        height: 110,
        marginLeft:20,
        marginTop:20,
        marginBottom:20,
        borderRadius:7,
        overflow:'hidden',
        padding:25
    },
    advertiseText:{
        fontSize:18,
        color:'#fff',
        width:'55%',
        fontWeight:'100'
    },
    adButtons:{
        flexDirection:'row',
        width:'50%',
        marginTop:10,

    },
    android:{
        height:22,
        width:65, 
    },
    apple:{
        height:22,
        width:65,
        marginRight:10
    },
    strelka:{
        width:20,
        height:18
    },
    titleMovieBlock:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20
    },
    titleMovie:{
        color:'#fff',
        fontSize:20,
        marginTop:-5,
        marginRight:5
    }
  });