import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'

const Description = ({currentFilm}) =>{
    const [description,setDiscription] = React.useState(false)
    
    return(
        <>
        {currentFilm.description ? <View> 
            {description? <Text style={styles.aboutText}>{currentFilm.description}</Text>:
               <Text style={styles.aboutText}>{currentFilm.description.slice(0,100)}...</Text>}
                <DrawerItem pressColor='#fff' label='' onPress={()=>setDiscription((item)=>!item)} icon={()=>(
                <View style={{height:20}}>                      
                {description? <Text style={styles.aboutButton}>Скрыть</Text>:
                <Text style={styles.aboutButton}>Подробнее</Text>}
                </View>)}/></View>:<></>}
        </>
    )
}

export default Description

const styles = StyleSheet.create({
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
})