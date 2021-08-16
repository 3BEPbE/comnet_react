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
       this.currentID = props.currentID
       this.data = props.data
       this.setPaused = props.setPaused
       const filtered = this.data.filter((item)=>item.has_subscription)
       this.index =  filtered.findIndex((item)=>item.id===this.item.id)
    }

    press(){

      if(this.index == -1){
        return
      }else{
        this.setID(this.item.id);
        this.setOpenMenu(false)
        this.setPaused({paused:false,work:true})
      }
    }

    render() { return( 
        <DrawerItem  onPress={()=>{this.press()}} pressColor='red' style={{...styles.focusItem,width:this.currentID===this.item.id?screenWidth/1.8/2:screenWidth/1.8/2}}  icon={()=>
        <View style={{...styles.item,backgroundColor:this.currentID===this.item.id?'#e41a4b':this.index == -1?'rgba(171, 171, 171, 0.4)':'#27272794'}}>
          <View style={styles.item2}>
            <View style={styles.block1}><Image style={styles.logo} source={{uri:  this.item.icon}}/></View>
            <View style={styles.block2}>
                <Text style={styles.programName}>{this.item.program_name.length>40?`${this.item.program_name.slice(0,40)}...`:this.item.program_name}</Text>
                <Text style={styles.programName}>{`${converter(this.item.program_begin_time)}:${converter(this.item.program_end_time)}`}</Text>
            </View>
          </View>
          {this.index == -1?<Image style={styles.lock} source={require('../images/lock.png')}/>:<></>}
      </View>} label=''/>
    ) }
  }



const PlayerMenu = ({channelList,setID,setShift,setTimeData,setOpenMenu,currentID,data,setPaused,type,setType}) => {

  const [categories,setCategories] = React.useState({original:channelList,filtered:channelList,category:false})

  const {getChannelCat} = React.useContext(Datas)

  React.useEffect(()=>{
    const fetch = async()=>{
      const categories = await getChannelCat()
      setCategories((old)=>{
        categories.unshift({name:'Все телеканалы',id:false})

        return{original:old.original,filtered:old.filtered,category:categories}
      })
    }
    fetch()
  },[])

  const categoryList = (
    ({ item }) => (
      <DrawerItem onPress={()=>setType(item.id)} pressColor='red' style={{...styles.focusItem2,width:type===item.id?screenWidth/1.8/2.3-60:screenWidth/1.8/2.3-60}} icon={()=>(
        <View style={{...styles.itemCat,backgroundColor:type===item.id?'#e41a4b':'#27272794',width:type===item.id?screenWidth/1.8/2.3-60:screenWidth/1.8/2.3-70}}>
            <Text style={styles.categorieText}>{item.name}</Text>
        </View>
      )} label=''/>
    ));


  React.useEffect(()=>{
    if(categories){
      if(type){
        setCategories((old)=>{
          if(old.original){
          let filtered = old.original.filter((item)=>item.category_id===type);
          let check = filtered.filter(item=>item.category_id===type&&item.id===currentID)
          if(check.length){
            filtered = filtered.filter(item=>item.id !== currentID)
            let current = old.original.filter(item=>item.id === currentID)[0]
            filtered.unshift(current)
          }

          return {original:old.original,filtered:filtered,category:old.category}}
          return old
      })
      }else{
        setCategories((old)=>{
          if(old.original){
            let filtered = old.original.filter(item=>item.id !== currentID);
            let current = old.original.filter(item=>item.id === currentID)[0]
            filtered.unshift(current)
            return {original:old.original,filtered:filtered,category:old.category}
          }
          return old
        })
      }
    }

  },[type,currentID])

  return (
    <>
     <View style={{...styles.container,width:screenWidth/1.8}}>
       {categories.category?
        <FlatList
          style={styles.blockCat}
          data={categories.category}
          renderItem={categoryList}
          keyExtractor={item => item.id.toString()}
          />:<></>
       }
        {categories.category?
          <FlatList
          style={styles.block}
          data={categories.filtered}
          
          renderItem={({item})=>(<Post setPaused={setPaused} data={data} currentID={currentID} setShift={setShift} setTimeData={setTimeData} setOpenMenu={setOpenMenu}  setID={setID} item = {item}/>)}
          keyExtractor={item => item.id.toString()}
          />
        :<></>
       }
    
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
      width:screenWidth/1.8/2,
  },
  blockCat:{
    width:screenWidth/1.8/3.1,
    marginTop:20
  },
 
item:{
    height:60,
    width:screenWidth/1.8/2-15,
    borderRadius:7,
    overflow:'hidden',
    flexDirection:'row',
    borderColor:'#e41a4bcc',
},
item2:{
  height:60,
  width:screenWidth/1.8/2-60,
  borderRadius:7,
  overflow:'hidden',
  flexDirection:'row',
  borderColor:'#e41a4bcc',
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
  width:screenWidth/1.8/2.3-40,
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
  width:screenWidth/1.8/2.3-50,
  marginLeft:20,
},
lock:{
  width:32,
  height:32,
  resizeMode:'contain',
  marginTop:10
}
});
