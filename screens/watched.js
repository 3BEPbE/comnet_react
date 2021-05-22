import React from 'react';
import { View ,StyleSheet,Text,TouchableWithoutFeedback} from 'react-native';
export default function Watched(props) {

    return(
        <TouchableWithoutFeedback  onPress={() => props.navigation.navigate('first')} > 
            <Text style={{color:'blue'}}>watched  (click to home page)</Text>
        </TouchableWithoutFeedback>
        
    )
}
const styles = StyleSheet.create({
   

  });