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

const { width: screenWidth,height:screenHeight } = Dimensions.get('window')


class Post extends PureComponent {
    constructor(props){
       super(props);
       this.item = props.item;
       this.setID = props.setID
       this.setShift = props.setShift
    }

    render() { return( 
        <DrawerItem onPress={()=>{this.setID(this.item.id);setShift(false)}} pressColor='#fff' style={styles.focusItem}  icon={()=><View style={styles.item}>
        <View style={styles.block1}><Image style={styles.logo} source={{uri:  this.item.icon}}/></View>
        <View style={styles.block2}>
            <Text style={styles.programName}>{this.item.program_name.length>40?`${this.item.program_name.slice(0,40)}...`:this.item.program_name}</Text>
        </View>
    </View>} label=''/>
    ) }
  }



const PlayerMenu = ({channelList,setID,setShift}) => {

  const [menu,setMenus] = React.useState(1)

  return (
    <>
     <View style={{...styles.container,width:menu*screenWidth/1.8/2}}>
        <FlatList
        style={styles.block}
        data={channelList}
        renderItem={({item})=>(<Post setShift={setShift} setID={setID} item = {item}/>)}
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
      flex:1,
      width:screenWidth/1.8/2
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
}
});
