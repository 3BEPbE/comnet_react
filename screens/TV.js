import React from 'react';
import { View ,StyleSheet,Text, Dimensions, ScrollView,Image} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer'
const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth>950

export default function Watched(props) {

    return(
        <ScrollView style={styles.Container}>
               <View  style={styles.listBlock}>
                { [1,2,3,4,5,6,7,8,9,10,11].map((e)=>(
                        <DrawerItem key={e} style={styles.listFocus}  label='' icon={()=>(
                            <View style={styles.listItem}>
                                <Image source={require('../images/exampleTV.png')}/>
                                <Text style={styles.tvInfo}>14:55 Тайны следствия (Отец: Часть 1-я)</Text>
                                <Text style={styles.tvData}>до 17:00</Text>
                            </View>)}/>
                    ))}
                </View>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
     Container:{
        flex:1,
        backgroundColor:'#1C1C1C',
    },
    listBlock:{
        marginTop:20
    },
    listItem:{
        height:62,
        marginTop:-6,
        marginBottom:-6,
        marginRight:0,
        backgroundColor:'#373737',
        width:isTV?screenWidth-90:screenWidth-40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    icon:{
        height:'100%',
      
    },
    listFocus:{
        marginTop:0,
        marginBottom:0,
        marginRight:0,
    },

    tvInfo:{
        color:'#BCBCBC',
        width:isTV?'auto':180
    },
    tvData:{
        color:'#BCBCBC',
        marginLeft:30,
        marginRight:20
    }

  });