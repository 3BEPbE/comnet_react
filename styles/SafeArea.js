
import { StyleSheet, Platform} from 'react-native';
    
const safeArea = StyleSheet.create({
   Top:{
       paddingTop:Platform.OS === 'android' ? 0 : 0
   }

  });
  export default safeArea