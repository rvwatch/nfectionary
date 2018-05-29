import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import StateDisplay from './StateDisplay';
import { apiKey } from './apiKey';


class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: '',
      latitude: null,
      longitude: null,
      states: [],
      error: null
    }
  }

  componentDidMount() {
    this.callApi()
      .then(states => this.setState({ states }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    try{
    const response = await fetch('http://localhost:5000/api/v1/states');
    const states = await response.json();
    return states.map(state => state.name).sort();
    }catch(err){
      this.setState({error: err.message})
    }
  };

  currentLocation = async () => {
   const location = await navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {latitude, longitude} = position.coords;
        const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + apiKey)
        const location = await response.json()
        const { results } = location;
        
        if (results[1]) {
					for (var i = 0; i < results.length; i++) {
						if (results[i].types[0] === "political" || results[i].types[0] === "locality") {
              const state = results[i].address_components[2].long_name;
              const id = this.state.states.indexOf(state);
              this.props.navigation.navigate('StateDisplay', { state, id });
              return;
						}
					}
				}
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const { states } = this.state;
    return (
      <View style={styles.container}>
        <Text>Welcome to NFectinoary</Text>
        <Text>Select a state or use your location</Text>
        <TouchableOpacity 
          onPress={this.currentLocation}
          title="Current Location"
          style={styles.button}
          accessibilityLabel="Use your current location"
          ><Text> Find Location </Text>
          </TouchableOpacity>
          <ModalDropdown options={ states } onSelect={(event) => this.props.navigation.navigate('StateDisplay', {state: states[event], id: event})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    StateDisplay: StateDisplay,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}