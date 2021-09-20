import React from "react";
import { View,Dimensions,FlatList,ImageBackground,Text,StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Datas } from "../context";

const {width:screenWidth} = Dimensions.get('window')

class Post extends React.PureComponent {
    constructor(props){
       super(props);
       this.item = props.item
       this.index = props.index
       this.navigation = props.navigation
    }

    render() { return( 
       <ImageBackground resizeMode='stretch' source={require('../images/example.jpg')} style={styles.imgBlocl}>
              <ImageBackground source={require('../images/corusulGradient.png')} style={styles.textBlock}>
                  <View style={styles.ranking}>
                      <View style={styles.rankingItem}>
                              <Text  style={styles.rankingNumber}>{this.item.imdb_rating}</Text>
                              <Text style={styles.rankingText}>IMDb</Text>
                      </View>
                      <View style={styles.rankingItem}>
                              <Text style={styles.rankingNumber}>{this.item.kinopoisk_rating}</Text>
                              <Text style={styles.rankingText}>КиноПоиск</Text>
                      </View>
                  </View>
                  <View style={styles.nameBlock}><Text style={styles.name}>{this.item.name}</Text></View>
                  <Text style={styles.about}>{this.item.description && this.item.description.slice(0,100)}...</Text>
              </ImageBackground>    
        </ImageBackground>
    ) }
  }

export default function BigCarusel({navigation,params}){

    const [data,setData] = React.useState()
    const {getFilms} = React.useContext(Datas)

    React.useEffect(()=>{
        const fetch = async()=>{
            const response = await getFilms(1,{limit:12,...params})
            setData(response)
        }
        fetch()
    },[])

    return(
        <>
        {data?<View style={{ marginTop:20,marginBottom:20}}>
        <Carousel 
            data={data}
            renderItem={({ item, index })=>  <Post navigation={navigation} item={item} index={index}/>}
            sliderWidth={screenWidth}
            sliderHeight={(screenWidth-40)/1.4}
            itemWidth={screenWidth-40}
            windowSize={screenWidth}
          />
      </View>:<></>}
      </>
    )
} 
const styles = StyleSheet.create({
    imgBlocl:{
        borderRadius: 8,
        overflow:'hidden',
        height: (screenWidth-40)/1.4,
        display:'flex',
        justifyContent:'flex-end', 
        width:screenWidth-40,
        resizeMode:'contain',

    },
    textBlock:{
        height: 350,
        display:'flex',
        justifyContent:'flex-end',
        padding:15
    },
    about:{
        width:screenWidth-80,
        fontSize:12,
        color:'#fff'
    },
    name:{
        width:screenWidth-80,
        fontSize:20,
        color:'#fff',
        fontWeight:'bold',
        display:'flex',
    },
    ranking:{
        display:'flex',
        flexDirection:'row',
        width:100,
        justifyContent:'space-between'
    },
    rankingNumber:{
        color:'#fff',
        fontSize:15,
        fontWeight:'bold'
    },
    rankingText:{
        color:'#fff',
        fontSize:9,
    },
    nameBlock:{
        height:70,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    }
  });
  