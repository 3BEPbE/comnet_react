import { StyleSheet,} from 'react-native';

const headerBlock = StyleSheet.create({
   header: {
       backgroundColor: '#1c1c1c',
    },
    headerLink:{
        color:'#fff',
        marginLeft:20,
        marginTop:-15
    },
    burger:{
        height:18,
        width:22,
        display:'flex',
        justifyContent:'space-between',
        marginTop:0
    },
    burgerItem:{
        width:22,
        height:2,
        backgroundColor:'#fff',
        borderRadius:30
    },

    searchBarIcon:{
        height:18,
        width:22,
    },
   
})
export default headerBlock