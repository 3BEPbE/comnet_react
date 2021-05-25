import React from 'react';
import { View ,StyleSheet,Text,Dimensions} from 'react-native';
import Corusel from '../components/Corusel'
export default function Home(props) {
 
  
    return (
        <View style={styles.home}>
            <Corusel/>
        </View>
  
    );
  };
const styles = StyleSheet.create({
    home:{
        flex:1,
        backgroundColor:'#1C1C1C'
    }
  });