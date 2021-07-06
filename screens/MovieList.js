import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator,Image,Dimensions } from 'react-native';
import { Datas } from '../context/context';
import { DrawerItem } from '@react-navigation/drawer';

const { width: screenWidth } = Dimensions.get('window')

 const isTV = screenWidth>950


const MovieList = ({navigation,route}) => {

  const {getFilms} = React.useContext(Datas)
  const [page,setPage] = React.useState(1)
  const [data,setData] = React.useState({currentPage:0, data:[] })
  const [isLoading,setLoading] = React.useState(false)
  const navigate = (item)=>{
      navigation.navigate('Movie',item)
  }
  
  React.useEffect(()=>{
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
        let films = await getFilms(1,route.params)

        console.log(films[0])

        await setData({
                  currentPage:1,
                  data:films
              })
        await setLoading(false)
        }
        fetch()
  },[route.params])


  const renderItem = (item) => {
    return(
        <DrawerItem pressColor='#fff'  style={styles.focusItem} onPress={()=>{navigate(item.item,)}} icon={()=>{
            return (<View style={styles.item}>
                     <Image style={styles.image} source={{uri:item.item.thumbnail_small}}/>
                     <Text style={styles.text}>{item.item.name.length>35?<>{item.item.name.slice(0,35)}...</>:item.item.name}</Text>
                   </View>)
         }} label=''/>
  )};
  return (
    <SafeAreaView style={styles.container}>

      {isTV?
      <FlatList
      removeClippedSubviews={true}
      style={{flexDirection:'column',marginTop:10}}
      contentContainerStyle= {{alignItems:'center'}}
      numColumns={6}
      data={data.data}
      renderItem={renderItem}
      keyExtractor={(item,i) => i}
      onEndReachedThreshold={0.5}
      onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd < 0&&!isLoading) return;
          setLoading(true)
          setPage((lastpage)=>lastpage+1)
      }}
    />:
      <FlatList
        removeClippedSubviews={true}
        style={{flexDirection:'column',marginTop:10}}
        contentContainerStyle= {{alignItems:'center'}}
        numColumns={2}
        data={data.data}
        renderItem={renderItem}
        keyExtractor={(item,i) => i}
        onEndReachedThreshold={0.5}
        onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd < 0&&!isLoading) return;
            setLoading(true)
            setPage((lastpage)=>lastpage+1)
        }}
      />}
      {isLoading?<ActivityIndicator size="large" color='#fff'/>:<></>}
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
      height:240,  
  },
  image:{
    width:180,
    height:200,
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