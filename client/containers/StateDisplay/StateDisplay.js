import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { getDiseaseNames } from '../../api/getDiseaseNames';
import { getDiseaseCount } from '../../api/getDiseaseCount';
import { buttonCleaner } from '../../api/cleaners/buttonCleaner';

export default class StateDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonData: []
    }
  }

  async componentDidMount() {
    const id = Number(this.props.navigation.getParam('id')) + 1;
    const names = await getDiseaseNames();
    const count = await getDiseaseCount(id);
    const buttonData = buttonCleaner(names, count);
    this.setButtonData(buttonData);
  }

  setButtonData(buttonData) {
    this.setState({ buttonData });
  }
  
  render() {
    const { buttonData } = this.state;
    const state = this.props.navigation.getParam('state');
    
    const renderButton = buttonData.map(button => 
      <TouchableOpacity 
        style={styles.button} 
        key={button.count}>
        <Text> {button.name} </Text>
        <Text> {button.count} </Text>
      </TouchableOpacity>
    );
    

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{state}</Text>
        {renderButton}
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
    width: 100,
    height: 50,
    padding: 10
  }
});