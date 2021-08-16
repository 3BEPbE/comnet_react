import React, { PureComponent } from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DrawerItem} from '@react-navigation/drawer'
import {Datas} from '../context'


const { width: screenWidth } = Dimensions.get('window')
let isTV = screenWidth>950

class Post extends PureComponent {
    constructor(props){
       super(props);
       this.item = props.item
       this.index = props.index
       this.navigation = props.navigation
    }

    render() { return( 
        <DrawerItem style={{marginHorizontal:0,marginVertical:0,width:screenWidth}} pressColor='#fff' onPress={()=>{this.navigation.navigate('Movie',this.item)}} label='' icon={()=>{
            return(<ImageBackground resizeMode='stretch' source={require('../images/bigExample2.png')} style={styles.imgBlocl}>
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
          </ImageBackground>)
          }}/>
    ) }
  }


export default function BigCardCarusel({gid,navigation}) {
    const {getFilms,isLogin} = React.useContext(Datas)

    const [data,setData] = React.useState([])
 
    React.useEffect(()=>{
        const fetch =async()=>{
          let data = await getFilms(1,{gid})
          setData(data)
        }
        fetch()
      },[isLogin])
   

    
    const renderItem = React.useCallback(({ item, index }) => {
      return(
           <Post navigation={navigation} item={item} index={index}/>
    )}, []);
  
    return (
        <View>
          <Carousel
            layout="default"
            data={data}
            sliderWidth={screenWidth}
            itemWidth={isTV?screenWidth:screenWidth}
            sliderHeight={isTV?screenWidth/3.1:310}
            renderItem={renderItem}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            initialNumToRender={7}
          />
        </View>
  
    );
  };
const styles = StyleSheet.create({
    
    imgBlocl:{
        borderRadius: 8,
        overflow:'hidden',
        height: (isTV?((screenWidth-250)/3.1):310),
        display:'flex',
        justifyContent:'flex-end', 
        width:screenWidth-220,
        resizeMode:'center',
        marginLeft:100, 
    },
    textBlock:{
        height: (isTV?(screenWidth-250)/3.1-40:350),
        display:'flex',
        justifyContent:'flex-end',
        padding:15
    },
    about:{
        width:(isTV?280:screenWidth-80),
        fontSize:12,
        color:'#fff'
    },
    name:{
        width:(isTV?280:screenWidth-80),
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