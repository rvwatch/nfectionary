import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      response: ''
    };
  }
  

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    console.log('in the call api');
    
    const response = await fetch('http://localhost:5000/api/hello');
    console.log(response);
    
    const body = await response.json();
    console.log(body);
    
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  render() {
    //console.log(this.state);
    
    return (
      <View style={styles.container}>
        <Text>TEST on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>{this.state.response}</Text>
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
});
