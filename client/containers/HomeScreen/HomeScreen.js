import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button, Modal, TouchableHighlight } from 'react-native';
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
      modalVisible: false,
      error: null,
      fontLoaded: false
    };
  }

  async componentDidMount() {
    const states = await getStates();
    this.setStatesData(states); 
  }

  setStatesData(states) {
    this.setState({states});
  }

  currentLocation = async () => {
    const { states } = this.state;
    const location = await navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {latitude, longitude} = position.coords;
        const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + apiKey);
        const location = await response.json();
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

  static navigationOptions = {
    title: 'NFECTIONARY',
    headerStyle: {
      backgroundColor: '#3E79CA',
      borderBottomColor: '#3E79CA'
    },
    headerTitleStyle: {
      marginTop:10,
      color: '#ffffff',
      fontSize: 30,
      fontWeight: "400",
      textDecorationLine: 'underline'
    }
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { states } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View style={styles.modalWindow}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.closeModal}>Close</Text>
              </TouchableHighlight>
              <Text style={styles.modalText}>
                  Find out about diseases
                  in your state, their 
                  reported case counts
                  as well as information
                  about each particular
                  disease and ways to 
                  prevent infection.
              </Text>
            </View>
          </View>
        </Modal>
        <View>
          <TouchableOpacity 
            onPress={this.currentLocation}
            title="Current Location"
            style={styles.button}
            accessibilityLabel="Use your current location">
            <Text style={styles.blueFont}> Get Started </Text>
          </TouchableOpacity>
          <ModalDropdown
            defaultValue={'select a state'} 
            options={states} 
            style={styles.dropDown}
            textStyle={{ color: '#3E79CA', fontSize: 20, textAlign: 'center' }}
            dropdownTextStyle={ {color: '#3E79CA', fontSize: 16} }
            onSelect={(event) => navigation.navigate('StateDisplay', {state: states[event], id: event, statesList: states})} 
          />
        </View>
        <TouchableOpacity 
          onPress={() => { this.setModalVisible(true); }}
          accessibilityLabel="What is it?">
          <Text style={styles.info}> What is it?</Text>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    borderRadius: 25,
    marginTop: 200,
    marginBottom: 40
  },
  blueFont: {
    color: '#3E79CA',
    fontSize: 25
  },
  dropDown: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 3
  },
  info: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 20
  },
  modalWindow: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    padding: 20
  },
  modalText: {
    color: '#3E79CA',
    fontSize: 18
  },
  closeModal: {
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 20
  }
});
