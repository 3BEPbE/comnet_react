import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/header'
import Burger from './components/burger'
import SafeArea from './components/safeArea'
export default function App() {
  return (
    <SafeArea>
      <Header/>
      <Burger/>
      <StatusBar style="auto" />
    </SafeArea>
  );
}

