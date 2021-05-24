import React from 'react';
import { View ,StyleSheet,Text,TouchableWithoutFeedback} from 'react-native';
export default function Home(props) {

    return(
        <TouchableWithoutFeedback style={{color:'blue',marginTop:20}}  onPress={() => props.navigation.navigate('Watched')} > 
            <Text style={{color:'blue'}}>Home page (click to Watched page)</Text>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
   

  });