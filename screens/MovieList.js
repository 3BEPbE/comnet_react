import React,{Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator,Image,Dimensions,ScrollView } from 'react-native';
import { Datas } from '../context/context';
import { DrawerItem } from '@react-navigation/drawer';

const { width: screenWidth } = Dimensions.get('window')
const isTV = screenWidth>950



const MovieList = ({navigation,route}) => {

  const {getFilms,checkToken,isLogin} = React.useContext(Datas)
  const [page,setPage] = React.useState(1)
  const [data,setData] = React.useState({currentPage:0, data:[] })
  const [isLoading,setLoading] = React.useState(false)
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  const onScroll = ({nativeEvent})=>{
    checkToken(navigation)
    if (isCloseToBottom(nativeEvent)) {
      if (isLoading) return;
       setLoading(true)
       setPage((lastpage)=>lastpage+1)
    }
  }
  React.useEffect(()=>{
    if(isLogin){
      checkToken(navigation)
    }
   const fetch = async ()=>{
        let serials = await getFilms(page,route.params)
        await setData({
                  currentPage:page,
                  data:[...data.data,...serials]
              })
        await setLoading(false)
        }
        fetch()
    
  },[page])
  
  React.useEffect(()=>{
      const fetch = async ()=>{
        checkToken(navigation)
        let films = await getFilms(1,route.params)
        await setData({
                  currentPage:1,
                  data:films
              })
        await setLoading(false)
        }
        fetch()
  },[route.params])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        onScroll={(props)=>{onScroll(props)}}scrollEventThrottle={400}>

        <View style={{
        flexWrap:'wrap',
        width:screenWidth,
        flexDirection:'row',
        justifyContent:isTV?'flex-start':'center'
        }}>
        
        {data.data && data.data.map((item,i)=>(
          <DrawerItem pressColor='#fff' key={i}  style={styles.focusItem} onPress={()=>{navigation.navigate( 'Movie',item)}} icon={()=>(
            (<View style={styles.item}>
                    <Image style={styles.image} source={{uri: item.thumbnail_small}}/>
                    <Text style={styles.text}>{item.name.length>35?<>{item.name.slice(0,35)}...</>:item.name}</Text>
              </View>)
        )} label=''/>
        ))}

        </View>
        {isLoading?<ActivityIndicator size="large" color='#fff'/>:<></>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#373737'
  },
  item:{
      width:170,
      height:250,  
  },
  image:{
    width:180,
    height:210,
    resizeMode:'stretch'
  },
  focusItem:{
    top:0,bottom:0,left:0,right:0,
    width:180,
    marginVertical:0,
    marginHorizontal:0,
    marginLeft:0,
    marginRight:0
},
text:{
    color:'#fff',
    fontSize:16,
    marginTop:3
}

});

export default MovieList;