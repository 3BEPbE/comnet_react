import React from 'react';
import {  Text, View ,StyleSheet} from 'react-native';
export default function Header() {
    return (
        <View  style={styles.header}>
          <Text style={styles.headerText}>Главная</Text>
        </View> 
    );
  }
  const styles = StyleSheet.create({
    header:{
      justifyContent:"space-between",
      padding:22,
      height:65,
      backgroundColor:'#0A0A0A'
    },
    headerText:{
      color:'#fff',
      fontSize:18,
      fontFamily:'Roboto'
    }
  });