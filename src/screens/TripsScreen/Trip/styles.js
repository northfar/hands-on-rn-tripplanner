import {StyleSheet, Dimensions} from 'react-native'

const dim = Dimensions.get('window')
const styles = StyleSheet.create({
    wrapperTrip: {
        backgroundColor:'white',
        padding:16
    },
    image: {
        backgroundColor:'green',
        width:dim.width-32,
        height:144
    },
    price:{
        position:'absolute',
        top:128,
        right:32,
        textAlign:'right',
        backgroundColor:'#111B75',
        padding:4,
        color:'white'
    }
})

export default styles