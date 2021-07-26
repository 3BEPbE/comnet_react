import React, { PureComponent } from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DrawerItem} from '@react-navigation/drawer'
import {Datas} from '../context/context'


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
        <DrawerItem pressColor='#fff'  label='' icon={()=>{
            return(<ImageBackground resizeMode='stretch' source={{uri:`https://serv.comnet.uz/storage/${this.item.photo}`}} style={styles.imgBlocl}>
              <ImageBackground source={require('../images/corusulGradient.png')} style={styles.textBlock}>
                    <View style={styles.block}>
                        <Text style={styles.title}>{this.item.title}</Text>
                        <Text style={styles.description}>{this.item.description.length>110?`${this.item.description.slice(0,110)}...`:this.item.description}</Text>
                    </View>
              </ImageBackground>    
          </ImageBackground>)
          }}/>
    ) }
  }


export default function AksiyaCarusel({navigation}) {
    const {isLogin,getAksiya} = React.useContext(Datas)

    const [data,setData] = React.useState([])
 
    React.useEffect(()=>{
        const fetch = async() =>{
            const data = await getAksiya()
            setData(data)
        }
        fetch()
    },[])

    
    const renderItem = React.useCallback(({ item, index }) => {
      return(
           <Post navigation={navigation} item={item} index={index}/>    
    )}, []);
  
    return (
        <View style={{ marginTop:20}}>
          <Carousel
            layout="default"
            data={data}
            sliderWidth={screenWidth}
            itemWidth={isTV?screenWidth:screenWidth}
            sliderHeight={isTV?700:310}
            renderItem={renderItem}
            activeSlideAlignment={'center'}
            inactiveSlideScale={0.93}
            initialNumToRender={7}
          />
        </View>
  
    );
  };
const styles = StyleSheet.create({
    
    imgBlocl:{
        borderRadius: 8,
        overflow:'hidden',
        height: (isTV?280*1.77:310),
        display:'flex',
        justifyContent:'flex-end', 
        width:screenWidth-40,
        resizeMode:'center'
    },
    textBlock:{
        height: (isTV?280*1.77-40:350),
        alignItems:'center',
        padding:15,
        position:'relative'
    },
    title:{
        fontSize:18,
        color:'#fff',
        marginTop:10
       
    },
    block:{
        display:'flex',
        width:300,
        height:(isTV?50:100),
        marginTop: (isTV?280*1.77-40:230),
       
    },
    description:{
        color:'#fff',
        fontSize:14,
        marginTop:10
    }
  
  });