import { StyleSheet,} from 'react-native';

const headerBlock = StyleSheet.create({
   header: {
       backgroundColor: '#1C1C1C',
       height:100
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
        marginTop:-15
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
        marginTop:-15
    },
    searchbarBlock:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
    }
})
export default headerBlock