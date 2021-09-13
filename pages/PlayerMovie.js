import {Text, View,Image,StyleSheet,Dimensions,  } from 'react-native'
import React from 'react'
import Video from 'react-native-video'
import { Datas } from '../context'

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')

export const PlayerMovie = ({navigation,route}) => {

    const movie = route.params

    const {getSrc,getCurrentMovie} = React.useContext(Datas)

    React.useEffect(()=>{
        const fetch = async () =>{
           
            const video = await getCurrentMovie(movie.id)
            const uri = await getSrc(video)
            console.log(uri)
        }
         fetch()
    },[])
    return(
        <View style={styles.container}>
           {false?<Video
                source={{uri: uri}}
                style={{ width:screenWidth , height: screenHeight }}
                paused={/*isPaused.paused*/false}
                // onBuffer={(buffer)=>setBuffer(buffer)}
                controls={false}
                resizeMode='stretch' />:<></>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex:1
    },
   });