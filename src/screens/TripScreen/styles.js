import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({

    wrapper:{
        flex:1
    },
    header:{
        height:240,
        backgroundColor:'gray'
    },
    backButton:{
        position:'absolute',
        top:16,
        left:16
    },
    addButton:{
        position:'absolute',
        top:16,
        left:308,
        right:16,
        padding:10
    },
    tripName:{
        position:'absolute',
        left:16,
        bottom:16,
        color:'white',
        fontSize:18
    },
    tripPrice:{
        position:'absolute',
        bottom:16,
        right:32,
        textAlign:'right',
        backgroundColor:'#111B75',
        padding:4,
        color:'white'
    },
    item:{
        flex:1,
        flexDirection:'row',
        paddingBottom:16
    },
    wrapperInfo:{
        flex:1
    },
    itemName:{
        fontWeight:'bold',
        fontSize:18
    },
    wrapperItemPrice:{
        justifyContent:'center',
        alignItems:'center',
        paddingRight:16
    },
    itemPrice:{
        paddingRight:16,
        textAlign:'right',
        justifyContent:'center',
        color:'#111B75',
        fontWeight:'bold'
    }
})