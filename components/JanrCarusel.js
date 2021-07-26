import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ImageBackground,TouchableOpacity,Platform} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerItem } from '@react-navigation/drawer'
import { Datas } from '../context/context';

const { width: screenWidth } = Dimensions.get('window')

export default function Janr({janrName,navigation}) {
    
    const carouselItems = janrName.split(',')
    const ref = React.useRef(null);
    const [janrID,setJanrID] = React.useState();

    const {getJanr} = React.useContext(Datas)

    React.useEffect(()=>{
        const fetch = async()=>{
            let janr = await getJanr()
            setJanrID(janr.filter((item)=>carouselItems.some((i)=>i.replace(/\s/g, '')===item.name)))
        }
        fetch()
    },[carouselItems])


    const renderItem = React.useCallback(({ item, index }) => (
    <DrawerItem onPress={()=>navigation.navigate('MovieList',{favorited:null,viewed:null,season:null,gid:item.id},)} pressColor='#fff' style={{marginRight:-13}} label='' icon={()=>(     
    <View style={{...styles.seasonButton}}>
        <Text style={styles.seasonButtonText}>{item.name}</Text>
    </View>  )}/>
        
    ), []);
    return (
        <View style={styles.seasonButtonBlock}>
               { janrID? <Carousel
                    layout="default"
                    ref={ref}
                    data={janrID}
                    sliderWidth={screenWidth}
                    itemWidth={120}
                    sliderHeight={35}
                    renderItem={renderItem}
                    activeSlideAlignment="start"
                    onSnapToItem={(index) => {console}}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                />:<></>}
        </View>
  
    );
  };
const styles = StyleSheet.create({
    seasonButtonBlock:{
        display:'flex',
        flexDirection:'row',
        marginBottom:20
    },
    seasonButton:{
        width:110,
        height:35,
        marginLeft:5,
        backgroundColor:'#373737',
        alignItems:'center',
        justifyContent:'center',
        marginRight:20,
        borderRadius:50,
        overflow:'hidden',

    },
    seasonButtonText:{
        fontSize:15,
        color:'#fff'
    }
    
  });