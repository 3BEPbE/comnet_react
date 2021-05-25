import React from 'react';
import { View ,StyleSheet,Text,Dimensions,ScrollView} from 'react-native';
import BigCardCarusel from '../components/BigCardCarusel'
import CardCarusel from '../components/CardCarusel'

export default function Home(props) {
 
  
    return (
        <ScrollView style={styles.home}>
            <View >
                <BigCardCarusel/>
                <CardCarusel/>
            </View>
        </ScrollView>
  
    );
  };
const styles = StyleSheet.create({
    home:{
        flex:1,
        backgroundColor:'#1C1C1C'
    }
  });