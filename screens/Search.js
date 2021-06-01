import React from 'react';
import { View ,StyleSheet,Text,TextInput, ScrollView, Image,Dimensions} from 'react-native';
import CardCarusel from '../components/CardCarusel'

const { width: screenWidth } = Dimensions.get('window')

export default function Watched(props) {
    const [data,setData] = React.useState('')
    const changeHandler = (text) => {
        setData(text)
    }
    return(
        <ScrollView style={styles.container}>
            <View style={styles.searchArea}>
                <Image style={styles.icon} source={require('../images/searchIcon.png')}/>
                <TextInput placeholderTextColor={'#4F4F4F'} style={styles.input} autoCompleteType={'off'} placeholder={'Фильмы, передачи, персоны'} autoCorrect={false} onChangeText={(e)=>{changeHandler(e)}} value={data}/>
            </View>
            <View style={styles.slider}>
                <CardCarusel />
            </View>
            <View style={styles.slider}>
                <Text style={styles.titleCarusel}>Сейчас смотрят</Text>
                <CardCarusel />
            </View>
            <View style={styles.slider}>
                <Text style={styles.titleCarusel1}>Популярные жанры </Text>
                <CardCarusel />
            </View>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1C1C1C',
        paddingTop:20
    },
    searchArea:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#373737',
        paddingBottom:7,
        paddingLeft:20,
        paddingRight:20
    },
    input:{
        width:screenWidth - 60,
        color:'#fff',
        paddingLeft:15

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
        color:'#F08019',
        marginBottom:5,
        paddingLeft:20
    }
  });