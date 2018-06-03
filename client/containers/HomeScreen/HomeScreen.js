import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import StateDisplay from '../StateDisplay/StateDisplay';
import DiseaseDisplay from '../DiseaseDisplay/DiseaseDisplay';
import { apiKey } from '../../api/apiKey';
import { getStates } from '../../api/getStates';


export default class HomeScreen extends Component {
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

  async componentDidMount() {
    const states = await getStates();
    this.setStatesData(states); 
  }

  setStatesData(states) {
    this.setState({states});
  }

  currentLocation = async () => {
    const { states } = this.state
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
              this.props.navigation.navigate('StateDisplay', { state, id, statesList: states });
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
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle}>NFECTIONARY</Text>
        <TouchableOpacity 
          onPress={this.currentLocation}
          title="Current Location"
          style={styles.button}
          accessibilityLabel="Use your current location">
          <Text style={styles.blueFont}> Get Started </Text>
        </TouchableOpacity>
        <ModalDropdown
          defaultValue={'Select a state'} 
          options={states} 
          style={styles.dropDown}
          textStyle={{ color: '#3E79CA' }}
          onSelect={(event) => navigation.navigate('StateDisplay', {state: states[event], id: event, statesList: states})} 
        />
        <TouchableOpacity 
          style={styles.button}
          accessibilityLabel="What is it?">
          <Text style={styles.blueFont}> What is it? </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E79CA',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  mainTitle:{
    color: '#ffffff',
    fontSize: 30,
    textDecorationLine: 'underline',
    fontFamily: "AmericanTypewriter"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 20,
  },
  blueFont: {
    color: '#3E79CA'
  },
  dropDown: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
  }
});
