import React, {Component} from 'react'
import {View, AsyncStorage,Text,FlatList,TouchableWithoutFeedback,Image} from 'react-native'
import assets from './assets';
import styles from './styles';

class TripScreen extends Component {
    static navigationOptions = {
        header:null
    }
    state = {
        trip:[],
        points:[]
    }
    renderItem = item => {
        return(
            <View style={styles.item}>
                <View style={styles.wrapperInfo}>
                    <Text style={styles.itemName}>
                        {item.item.pointName}
                    </Text>
                    <Text>{item.item.description}</Text>
                </View>
                <View style={styles.wrapperItemPrice}>
                    <Text style={styles.itemPrice}>
                        R$ {parseFloat(item.item.price).toFixed(2)}
                    </Text>
                </View>
            </View>
            )
    }
    componentDidMount(){
        this.loadData()
    }
    loadData = async() => {
        const id = this.props.navigation.state.params.id
        const tripsAS = await AsyncStorage.getItem('trips')
        let trips = []
        if(tripsAS){
            trips = JSON.parse(tripsAS)
        }

        const pointsAS = await AsyncStorage.getItem('trip-'+id)
        let points = []
        if(pointsAS){
            points = JSON.parse(pointsAS)
        }
        
        let trip = {
            trip:'',
            price:0
        }
        
        trips.forEach( t=> {
            if(t.id === id){
                trip = t
            }
        })
        
        this.setState({
            trip:trip,
            points:points
        })
    }
    render(){
        const {points,trip} = this.state
        const id = this.props.navigation.state.params.id
        return(
            <View style={styles.wrapper}>
              <View style={styles.header}>
                    <TouchableWithoutFeedback onPress = {() => {
                        this.props.navigation.state.params.refresh()
                        this.props.navigation.goBack()
                    }}>
                        <Image style={styles.backButton}
                        source={assets.arrowleft}/>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('AddPoint',{id:id, refresh:this.loadData})}>
                        <Image source={require('../../../assets/add.png')}
                        style={styles.addButton}
                        />
                   </TouchableWithoutFeedback>

                    <Text style={styles.tripName}>
                        {trip.trip}
                    </Text>
                
                    <Text style={styles.tripPrice}>
                        R$ {parseFloat(trip.price).toFixed(2)}
                    </Text>
              </View>
              
              <FlatList
                    style = {{flex:1}}
                    contentContainerStyle={{
                        paddingTop:16,
                        paddingLeft:16
                    }}
                    keyExtractor = {(item,index) => index.toString()}
                    data = {points}
                    renderItem={this.renderItem}
                />  

            </View>            
        )
    }        
}
export default TripScreen