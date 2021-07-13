import React from 'react'
import {Text, View, StyleSheet, Dimensions} from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

const Ranking = ({currentFilm}) =>{
    
    return(
        <>
       <View style={styles.ranking}>
                <View style={styles.rankingItem}>
                        <Text  style={styles.rankingNumber}>{currentFilm.imdb_rating}</Text>
                        <Text style={styles.rankingText}>IMDb</Text>
                </View>
                <View style={styles.rankingItem}>
                        <Text style={styles.rankingNumber}>{currentFilm.kinopoisk_rating}</Text>
                        <Text style={styles.rankingText}>КиноПоиск</Text>
                </View>
        </View>
        </>
    )
}

export default Ranking

const styles = StyleSheet.create({
    ranking:{
        display:'flex',
        flexDirection:'row',
        width:100,
        justifyContent:'space-between',
        marginLeft:20,
        marginBottom:20
    },
    rankingNumber:{
        color:'#fff',
        fontSize:17,
        fontWeight:'bold'
    },
    rankingText:{
        color:'#fff',
        fontSize:10,
    },
})