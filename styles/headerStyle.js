import { StyleSheet,} from 'react-native';

const headerBlock = StyleSheet.create({
   header: {
       backgroundColor: '#0A0A0A',
    },
    headerButton:{
        color:'#fff',
        marginLeft:22
    },
    burger:{
        height:18,
        width:22,
        display:'flex',
        justifyContent:'space-between',
        marginRight:20,
    },
    burgerItem:{
        width:22,
        height:2,
        backgroundColor:'#fff',
        borderRadius:30
    }
})
export default headerBlock