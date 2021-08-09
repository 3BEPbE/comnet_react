import React,{PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList
} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import {converter} from '../helper/index'
import {Datas} from '../context'

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')


class Post extends PureComponent {
    constructor(props){
       super(props);
       this.item = props.item;
       this.setID = props.setID
       this.setShift = props.setShift
       this.setTimeData = props.setTimeData
       this.setOpenMenu = props.setOpenMenu
    }

    render() { return( 
        <DrawerItem onPress={()=>{this.setID(this.item.id);this.setShift(false);this.setOpenMenu(false);this.setTimeData({begin_time:false})}} pressColor='#fff' style={styles.focusItem}  icon={()=><View style={styles.item}>
        <View style={styles.block1}><Image style={styles.logo} source={{uri:  this.item.icon}}/></View>
        <View style={styles.block2}>
            <Text style={styles.programName}>{this.item.program_name.length>40?`${this.item.program_name.slice(0,40)}...`:this.item.program_name}</Text>
            <Text style={styles.programName}>{`${converter(this.item.program_begin_time)}:${converter(this.item.program_end_time)}`}</Text>
            
        </View>
    </View>} label=''/>
    ) }
  }



const PlayerMenu = ({channelList,setID,setShift,setTimeData,setOpenMenu,secondMenu}) => {

  const [categories,setCategories] = React.useState({original:channelList,filtered:channelList,category:false})

  const {getChannelCat} = React.useContext(Datas)
  const [type,setType] = React.useState(false)

  React.useEffect(()=>{
    const fetch = async()=>{
      const categories = await getChannelCat()
      setCategories((old)=>{
        categories.unshift({name:'all',id:false})
        return{original:old.original,filtered:old.filtered,category:categories}
      })
    }
    if(secondMenu){fetch()}
    else{
      setCategories((old)=>{return{original:old.original,filtered:old.filtered,category:false}})
    }
  },[secondMenu])

  const categoryList = React.useCallback(
    ({ item }) => (
      <DrawerItem onPress={()=>setType(item.id)} pressColor='#fff' style={styles.focusItem2} icon={()=>(
        <View style={styles.itemCat}>
            <Text style={styles.categorieText}>{item.name}</Text>
        </View>
      )} label=''/>
    ),[]);


  React.useEffect(()=>{
    if(categories){
      if(type){
        setCategories((old)=>{
          return {original:old.original,filtered:old.original.filter((item)=>item.category_id===type),category:old.category}
      })
      }else{
        setCategories((old)=>{
            return {original:old.original,filtered:old.original,category:old.category}
        })
      }
    }

  },[type])

  return (
    <>
     <View style={{...styles.container,width:secondMenu?screenWidth/1.8:screenWidth/1.8/2}}>
       {categories.category?
        <FlatList
        style={styles.blockCat}
        data={categories.category}
        renderItem={categoryList}
        keyExtractor={item => item.id.toString()}
        />:<></>
       }
        <FlatList
        style={styles.block}
        data={categories.filtered}
        renderItem={({item})=>(<Post setShift={setShift} setTimeData={setTimeData} setOpenMenu={setOpenMenu}  setID={setID} item = {item}/>)}
        keyExtractor={item => item.id.toString()}
        />
    
     </View>
    </>
  );
};

export default PlayerMenu;

const styles = StyleSheet.create({
    container:{
    height:screenHeight,
    position:'absolute',
    flexDirection:'row',
    zIndex:2,
  },
  block:{
      width:screenWidth/1.8/2
  },
  blockCat:{
    width:screenWidth/1.8/2-15,
    marginTop:20
  },
 
item:{
    height:60,
    width:screenWidth/1.8/2-15,
    backgroundColor:'#27272794'   ,
    borderRadius:7,
    overflow:'hidden',
    flexDirection:'row',
},
focusItem:{
    marginHorizontal:0,
    marginVertical:0,
    marginTop:2,
    width:screenWidth/1.8/2,
},
block1:{
    width:60,
    height:'100%',
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:7,
    overflow:'hidden'
},
block2:{
    height:60,
    alignItems:'center',
    width:screenWidth/1.8/2-15-60,
    justifyContent:'center'
},
logo:{
    width:50,
    height:50,
    resizeMode:'contain'
},
programName:{
    color:'#fff',
    width:screenWidth/1.8/2-15-70,
    marginLeft:5
},
categorieText:{
  color:'#fff',
  fontSize:20,
},
itemCat:{
  height:60,
  width:screenWidth/1.8/2-70,
  backgroundColor:'#27272794'   ,
  borderRadius:7,
  overflow:'hidden',
  alignItems:'center',
  justifyContent:'center',
  margin:-5
},
focusItem2:{
  marginHorizontal:0,
  marginVertical:0,
  marginTop:0,
  width:screenWidth/1.8/2-50,
  marginLeft:20,
}
});
