import React, {Component} from 'react'
import {View, AsyncStorage,Text,FlatList,TouchableWithoutFeedback, TouchableOpacity, Image, TextInput} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import assets from './assets';
import styles from './styles';

class AddPointScreen extends Component {
    static navigationOptions = {
        header:null
    }
    state = {
        position:{
            latitude:37.78825,
            longitude:-122.4324,
        },
        pointName:'',
        description:'',
        price:0
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

    handleSave = async() => {
      
        const id = this.props.navigation.state.params.id
        const pointsAS = await AsyncStorage.getItem('trip-'+id)
        let points = []

        if(pointsAS){
            points = JSON.parse(pointsAS)
        }
        points.push(this.state)
        AsyncStorage.setItem('trip-'+id, JSON.stringify(points))

        let total = 0
        points.forEach(p => {
            total += p.price
        })

        const tripsAS = await AsyncStorage.getItem('trips')
        let trips = []

        if(tripsAS){
            trips = JSON.parse(tripsAS)
        }

        trips.forEach( trip => {
            if(trip.id === id){
                trip.price = total
                trip.latitude = points[0].position.latitude
                trip.longitude = points[0].position.longitude
            }
        })

        await AsyncStorage.setItem('trips',JSON.stringify(trips))
        this.props.navigation.state.params.refresh()
        this.props.navigation.goBack()

    }
    render(){
        
        return(
            <View style={styles.wrapper}>
              <View style={styles.header}>
                    <MapView style={{flex:1}} 
                         initialRegion={{
                            latitude:37.78825,
                            longitude:-122.4324,
                            latitudeDelta:0.0922,
                            longitudeDelta:0.0421
                         }}   
                    >
                         <Marker
                            coordinate={{
                            latitude:37.78825,
                            longitude:-122.4324,
                          }}
                            draggable
                            onDragEnd={
                                (evt) => this.setState({position:evt.nativeEvent.coordinate})
                            }
                         />
                     </MapView>
                    <TouchableWithoutFeedback onPress = {() => this.props.navigation.goBack()}>
                        <Image style={styles.backButton}
                        source={assets.arrowleft}/>
                    </TouchableWithoutFeedback>

              </View>
               <TextInput style={styles.input} placeholder='Nome do Ponto' onChangeText={txt => this.setState({pointName:txt})}/>
               <TextInput style={styles.input} placeholder='Descrição' onChangeText={txt => this.setState({description:txt})}/>
               <TextInput style={styles.input} placeholder='Preço' onChangeText={txt => this.setState({price:parseFloat(txt)})}/>
               <TouchableOpacity style={styles.btn} onPress={this.handleSave}>
                  <Text style={styles.btnText}>SALVAR PONTO</Text>
               </TouchableOpacity>
            </View>            
        )
    }        
}
export default AddPointScreen