import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import styles from './styles'

const Trip = props => {
    return ( 
        <TouchableOpacity onPress={props.onPress} style={styles.wrapperTrip}>
            <View style={styles.image}>
            <Text>Imagem</Text></View>
            <Text>{props.title}</Text>
            <Text style={styles.price}>R$ {parseFloat(props.price).toFixed(2)}</Text>
        </TouchableOpacity>
    )
}

export default Trip
