import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button } from 'react-native';

export default class DiseaseDisplay extends Component {
  constructor(props) {
    super(props);
    
  }

  async componentDidMount() {
    const disease = await getDisease();
  }

  render() {
    return (
      <Text>{this.props.navigation.getParam('disease_id')}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});