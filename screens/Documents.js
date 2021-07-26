import { DrawerItem } from '@react-navigation/drawer'
import React from 'react'
import { Dimensions, Text, View, StyleSheet, ScrollView } from 'react-native'
import * as Linking from 'expo-linking';
import { Datas } from '../context/context';

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth>900

const arr = [  {
    id: 2,
    type: 'pdf',
    title: `Эксплуатация и оказание услуг сетей распространения телепередач`,
    size: '70KB',
    description:`Лицензия Министерства по развитию информационных технологий и коммуникаций Республики Узбекистан AA № 00061664 от 26 мая 2017 года`,
    link: 'https://serv.comnet.uz/documents/new/d-iptv.pdf',
    business: 'yur',
    doc: 'blank',
  },
  {
    id: 2,
    type: 'pdf',
    title: `Эксплуатация и оказание услуг сетей распространения телепередач`,
    size: '70KB',
    description:`Лицензия Министерства по развитию информационных технологий и коммуникаций Республики Узбекистан AA № 00061664 от 26 мая 2017 года`,
    link: 'https://serv.comnet.uz/documents/new/d-iptv.pdf',
    business: 'yur',
    doc: 'blank',
  },
  {
    id: 2,
    type: 'pdf',
    title: `Эксплуатация и оказание услуг сетей распространения телепередач`,
    size: '70KB',
    description:`Лицензия Министерства по развитию информационных технологий и коммуникаций Республики Узбекистан AA № 00061664 от 26 мая 2017 года`,
    link: 'https://serv.comnet.uz/documents/new/d-iptv.pdf',
    business: 'yur',
    doc: 'blank',
  },
  {
    id: 2,
    type: 'pdf',
    title: `Эксплуатация и оказание услуг сетей распространения телепередач`,
    size: '70KB',
    description:`Лицензия Министерства по развитию информационных технологий и коммуникаций Республики Узбекистан AA № 00061664 от 26 мая 2017 года`,
    link: 'https://serv.comnet.uz/documents/new/d-iptv.pdf',
    business: 'yur',
    doc: 'blank',
  },
  {
    id: 2,
    type: 'pdf',
    title: `Эксплуатация и оказание услуг сетей распространения телепередач`,
    size: '70KB',
    description:`Лицензия Министерства по развитию информационных технологий и коммуникаций Республики Узбекистан AA № 00061664 от 26 мая 2017 года`,
    link: 'https://serv.comnet.uz/documents/new/d-iptv.pdf',
    business: 'yur',
    doc: 'blank',
  },
  {
    id: 2,
    type: 'pdf',
    title: `Эксплуатация и оказание услуг сетей распространения телепередач`,
    description:`Лицензия Министерства по развитию информационных технологий и коммуникаций Республики Узбекистан AA № 00061664 от 26 мая 2017 года`,
    size: '70KB',
    link: 'https://serv.comnet.uz/documents/new/d-iptv.pdf',
    business: 'yur',
    doc: 'blank',
  },]

export default function Documents(){
 
    const {getDocs} = React.useContext(Datas)
    const [data,setData] = React.useState()

    React.useEffect(()=>{
        const fetch =async() =>{
           const data = await getDocs()
           setData(data)
        }
        fetch()
    },[])

    return(
        <ScrollView style={styles.container}>
            <View style={styles.titleBlock}>
                <Text style={styles.title}>Документы</Text>
            </View>
            <View style={styles.cardBlock}>
                {data ? data.map((item,i)=>(
                    <DrawerItem onPress={()=>Linking.openURL(item.url)}  pressColor='#fff' style={styles.focus} key={i} label='' icon={()=>(
                    <View style={styles.card}>
                        <View style={styles.angel}>
                        </View>
                        <Text style={styles.docTitle}>{item.title}</Text>
                        <Text style={styles.docDescription}>{item.desc}</Text>
                    </View>
                    )}/>
                    
                )):<></>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',
    },
    titleBlock:{
        width:screenWidth-40,
        marginLeft:20,
        marginTop:20
    },
    title:{
        color:'#fff',
        fontSize:24
    },
    cardBlock:{
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:isTV?'flex-start':'center'
    },
    card:{
        width:isTV?320:screenWidth-40,
        height:350,
        backgroundColor:'#1C1C1C',
        borderTopEndRadius:50,
        overflow:'hidden',
        padding:30
    },
    angel:{
        position:'absolute',
        width:50,
        height:50,
        backgroundColor:'#474747',
        right:0,
        borderBottomStartRadius:7
    },
    docTitle:{
        color:'#fff',
        marginTop:50,
        fontSize:16
    },
    docDescription:{
        color:'#fff',
        marginTop:40,
        fontSize:20
    },
    focus:{
        marginVertical:0,
        marginHorizontal:0,
        marginTop:20,
        width:isTV?320:screenWidth-25,
    }
})