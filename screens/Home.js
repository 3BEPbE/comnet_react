import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ScrollView,TouchableWithoutFeedback} from 'react-native';
import BigCardCarusel from '../components/BigCardCarusel'
import CardCarusel from '../components/CardCarusel'

const { width: screenWidth } = Dimensions.get('window')

export default function Home(props) {
 
  
    return (
        <ScrollView style={styles.home}>
            <View >
                <BigCardCarusel/>
                <Text style={styles.titleBlock}>Лучшие подборки </Text>
                <CardCarusel navigation ={props.navigation}/>
                <View style={styles.newsBlock} >
                    <Text style={styles.newsText}>Новинки</Text>
                    <DrawerItem style={{marginTop:-10,marginBottom:-20,}} label='' icon={()=>(<Text style={styles.newsLink}>{'Ещё >'}</Text>)}/>
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
            </View>
        </ScrollView>
  
    );
  };
const styles = StyleSheet.create({
    home:{
        flex:1,
        backgroundColor:'#1C1C1C'
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