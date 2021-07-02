import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ScrollView,ActivityIndicator} from 'react-native';
import BigCardCarusel from '../components/BigCardCarusel'
import CardCarusel from '../components/CardCarusel'
import { Datas } from '../context/context';
const { width: screenWidth,height: screenHeight } = Dimensions.get('window')

export default function Home(props) {
    const {serials} = React.useContext(Datas)

    return (
        <ScrollView style={styles.home}>
            <View style={{justifyContent:'center',alignItems:"center"}}>
                {serials.length?<><BigCardCarusel/>
                <Text style={styles.titleBlock}>Лучшие подборки </Text>
                <CardCarusel navigation ={props.navigation}/>
                <View style={styles.newsBlock} >
                    <Text style={styles.newsText}>Новинки</Text>
                    <DrawerItem pressColor='#fff' style={{marginTop:-10,marginBottom:-20,}} label='' icon={()=>(<Text style={styles.newsLink}>{'Ещё >'}</Text>)}/>
                </View>
                <CardCarusel navigation ={props.navigation} />
                <Text style={styles.titleBlock}>Фильмы по жанрам</Text>
                <CardCarusel navigation ={props.navigation}/>
                <Text style={styles.titleBlock}>Амедиатека</Text>
                <CardCarusel navigation ={props.navigation}/>
                <Text style={styles.titleBlock}>Мегого </Text>
                <CardCarusel navigation ={props.navigation}/>
                <Text style={styles.titleBlock}>Tvcom Play</Text>
                <CardCarusel navigation ={props.navigation}/>
                <Text style={styles.titleBlock}>Лидеры</Text>
                <CardCarusel navigation ={props.navigation}/>
             </>:<View style={{width:screenWidth,height:screenHeight-150,alignItems:'center',justifyContent:'center'}}><ActivityIndicator  size="large" color='#fff' /></View>}
             </View>
        </ScrollView>
  
    );
  };
const styles = StyleSheet.create({
    home:{
        flex:1,
        backgroundColor:'#1C1C1C',
    },
    titleBlock:{
        fontSize:18,
        color:'#fff',
        paddingLeft:20,
        marginBottom:10
    },
    newsBlock:{
        width:screenWidth,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20
    },
    newsText:{
        fontSize:18,
        color:'#fff',
    },
    newsLink:{
        fontSize:18,
        color:'#E41A4B',
        marginRight:-70
    }
    
  });