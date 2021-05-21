import React from 'react';
import {  Text, View ,StyleSheet} from 'react-native';
export default function Burger() {

    const menuLinks = [
        {
            text:'Просмотреные'
        },
        {
            text:'Избранные'
        },
        {
            text:'Фильмы'
        },
        {
            text:'Просмотреные'
        },
        {
            text:'Сериалы'
        },
        {
            text:'Амедиатека'
        },
        {
            text:'Мегого'
        },
        {
            text:'Start'
        },
        {
            text:'Детям'
        },

        {
            text:'Узбекские'
        },
        {
            text:'Узбекские'
        },


    ]

    return (
        <View  style={styles.burger}>
          
        </View> 
    );
  }
  const styles = StyleSheet.create({
    burger:{
      height:'100%',
      width:'80%',
      backgroundColor:'#242424',
      position:'absolute',
      top:0,
      transform:[ 
        { translateX: "100%" }
      ]
    },

  });