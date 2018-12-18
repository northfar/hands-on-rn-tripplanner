import React, {Component} from 'react'
import {View, Text,TouchableOpacity, ImageBackground, TextInput, AsyncStorage} from 'react-native'
import assets from './assets';
import styles from './styles';

class AddTripScreen extends Component {
    static navigationOptions = {
        header:null
    }
    state = {
        trip:''
    }
    handleSave = async() => {
        const trip = {
            id: new Date().getTime(),
            trip:this.state.trip,
            price:0,
            latitude:0,
            longitude:0
        }

        const tripsAS = await AsyncStorage.getItem('trips')
        let trips = []
        if(tripsAS){
            trips = JSON.parse(tripsAS)
        }

        trips.push(trip)
        await AsyncStorage.setItem('trips',JSON.stringify(trips))
        this.props.navigation.state.params.refresh()
        this.props.navigation.goBack()
    }
    renderItem = item => {
        return(
            <View style={styles.item}>
                <View style={styles.wrapperInfo}>
                    <Text style={styles.itemName}>
                        {item.item.name}
                    </Text>
                    <Text>{item.item.description}</Text>
                </View>
                <View style={styles.wrapperItemPrice}>
                    <Text style={styles.itemPrice}>
                        {item.item.price}
                    </Text>
                </View>
            </View>
            )
    }
    render(){
        return(
            <ImageBackground 
                source={assets.background} 
                imageStyle={{resizeMode:'stretch'}} 
                style={{flex:1}}
            >
            <View style={{paddingTop:140}}>
                <Text style={styles.newTrip}>Nova Viagem</Text>
            </View>
            <View style={styles.wrapper}>
               <TextInput style={styles.input} placeholder='Nome da Viagem' onChangeText={txt => this.setState({trip:txt})}/>
               <TouchableOpacity style={styles.btn} onPress={this.handleSave}>
                  <Text style={styles.btnText}>SALVAR VIAGEM</Text>
               </TouchableOpacity>
            </View>
            </ImageBackground>            
        )
    }        
}
export default AddTripScreen