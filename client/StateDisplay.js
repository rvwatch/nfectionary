import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class StateDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      diseaseNames: [],
      diseaseCount: []
    }
  }

  componentDidMount() {
   this.getDiseaseNames();
   this.getDiseaseCount();
   
  }

  getDiseaseNames = async () => {
    try{
    const response = await fetch('http://localhost:5000/api/v1/diseases');
    const diseases = await response.json();
    const diseaseNames = diseases.map(disease => ({ 
      name: disease.name, 
      id: disease.id 
    }));
    this.setState({ diseaseNames })
    }catch(err){
      this.setState({error: err.message})
    }
  };

  getDiseaseCount = async () => {
    const id = Number(this.props.navigation.getParam('id')) + 1;
    try{
    const response = await fetch(`http://localhost:5000/api/v1/state-diseases/${id}`);
    const diseases = await response.json();
    const diseaseCount = diseases.map(disease => ({ 
      count: disease.case_count, 
      id: disease.diseases_id 
    }));
    this.setState({diseaseCount})
    }catch(err){
      this.setState({error: err.message})
    }
  };

  render() {
    const state = this.props.navigation.getParam('state')
    console.log(this.state);
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{state}</Text>
      </View>
    );
  }
}