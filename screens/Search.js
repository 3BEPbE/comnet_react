import React from 'react';
import { View ,StyleSheet,Text,TextInput, ScrollView, Image,Dimensions} from 'react-native';
import CardCarusel from '../components/CardCarusel'
import { Datas } from '../context/context';
import SearchCarusel from '../components/SearchCarusel';
import { DrawerItem } from '@react-navigation/drawer'

const { width: screenWidth } = Dimensions.get('window')

export default function Search({navigation}) {
    const [text,setText] = React.useState('')
    const [data,setData] = React.useState('')
    const {searchFilm,checkToken} = React.useContext(Datas)
    const textInputs = []
    React.useEffect(()=>{
        checkToken(navigation)
    },[])
    const changeHandler = async(text) => {
        setText(text)
        if(text.length>=2){
          setData(await searchFilm(text))
        }
       
    }

    return(
        <ScrollView style={styles.container}>
            <DrawerItem pressColor='#fff' onPress={()=>textInputs[0].focus()} style={styles.focusItem} label='' icon={()=>(
                    <View style={styles.searchArea}>
                         <Image style={styles.icon} source={require('../images/searchIcon.png')}/>
                         <TextInput ref={(input)=>{textInputs[0]=input}} placeholderTextColor={'#4F4F4F'} style={styles.input} autoCompleteType={'off'} placeholder={'Фильмы, передачи, персоны'} autoCorrect={false} onChangeText={(e)=>{changeHandler(e)}} value={text}/>
                    </View>
            )}/>
            <View style={styles.slider}>
                {data?<SearchCarusel navigation={navigation} text={text} data={data}/>:<CardCarusel navigation={navigation} />}
            </View>
            <View style={styles.slider}>
                <Text style={styles.titleCarusel}>Сейчас смотрят</Text>
                <CardCarusel  navigation={navigation} />
            </View>
            <View style={styles.slider}>
                <Text style={styles.titleCarusel1}>Популярные жанры </Text>
                <CardCarusel  navigation={navigation} />
            </View>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#0A0A0A',
        paddingTop:20
    },
    focusItem:{
        width:screenWidth,
        marginLeft:0,
        padding:0,
    },
    searchArea:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#373737',
        paddingBottom:7,
        paddingLeft:15,
        paddingRight:15,
        alignItems:'center',
        
    },
    input:{
        width:screenWidth-40,
        fontSize:18,
        color:'#fff',
        paddingBottom:3,
        marginLeft:5,
        paddingLeft:5

    },
    slider:{
        marginTop:20
    },
    titleCarusel:{
        fontSize:18,
        color:'#fff',
        marginBottom:5,
        paddingLeft:20
    },
    titleCarusel1:{
        fontSize:18,
        color:'#E41A4B',
        marginBottom:5,
        paddingLeft:20
    }
  });