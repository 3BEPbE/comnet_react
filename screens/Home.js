import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ScrollView,ActivityIndicator} from 'react-native';
import BigCardCarusel from '../components/BigCardCarusel'
import CardCarusel from '../components/CardCarusel'
import { Datas } from '../context/context';
const { width: screenWidth,height: screenHeight } = Dimensions.get('window')
const themes = ['Amediateka','Комедия','Мелодрама','Ужасы']
export default function Home(props) {
    const {getJanr} = React.useContext(Datas)

    const [janr,setJanr] = React.useState()


    React.useEffect(()=>{
        const fetch = async()=>{
            let janr = await getJanr()
            console.log(janr)
          //  setJanr(janr.filter((item)=>themes.some((i)=>i===item.name)))
        }
        fetch()
    },[])

    return (
        <ScrollView style={styles.home}>
            <View>
                <>
                <BigCardCarusel/>
                {janr && janr.map(item=>(
                <View key={item.id}>
                <View style={styles.newsBlock} >
                    <Text style={styles.newsText}>{item.name}</Text>
                    <DrawerItem  pressColor='#fff' style={{marginTop:-10,marginBottom:-20,}} label='' icon={()=>(<Text style={styles.newsLink}>{'Ещё >'}</Text>)}/>
                </View>
                <CardCarusel gid={item.id} navigation ={props.navigation}/>
                </View>
                ))}
             </>
              {/* :<View style={{width:screenWidth,height:screenHeight-150,alignItems:'center',justifyContent:'center'}}><ActivityIndicator  size="large" color='#fff' /></View>} */}
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