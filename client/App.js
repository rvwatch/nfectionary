import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      response: '',
      latitude: null,
      longitude: null,
      state: '',
      error: null
    }
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('http://localhost:5000/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  currentLocation = async () => {
   const location = await navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        const myApi = 'AIzaSyCrg4u9bjIN_fZzCQNKmD2HN3iVQLKigXk';
        const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + myApi)
        const location = await response.json()
        const { results } = location;
        if (results[1]) {
					for (var i = 0; i < results.length; i++) {
						if (results[i].types[0] === "locality") {
							var city = results[i].address_components[0].short_name;
							var state = results[i].address_components[2].short_name;
              console.log(city, state);
						}
					}
				}
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
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
          {/* <Dropdown
            label='Favorite Fruit'
            data={data}
          /> */}
          {/* <Picker
            selectedValue={this.state.state}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) => this.setState({state: itemValue})}>
            <Picker.Item label="Colorado" value="Colorado" />
            <Picker.Item label="California" value="California" />
            <Picker.Item label="Alabama" value="Alabama" />
            <Picker.Item label="New Mexico" value="New Mexico" />
          </Picker> */}
      </View>
    );
  }
}

const data = [{
  value: 'Colorado',
}, {
  value: 'California',
}, {
  value: 'Alabama',
},
{
  value: 'New Mexico',
}
];


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
