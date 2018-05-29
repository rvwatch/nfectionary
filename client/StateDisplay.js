import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class StateDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttonData: []
    }
  }

  async componentDidMount() {
   
    const names = await this.getDiseaseNames();
    const count = await this.getDiseaseCount();
    const buttonData = this.getData(names, count)
  }

  getData = (names, count) => {
    
    const buttonData = names.reduce((accu, name) => {
      const newButton = count.filter( num => {
        let newObject = {};
        if(num.id === name.id){
          newObject['disease'] = name.name;
          newObject['count'] = num.count;
        }
        if(newObject.disease){
          return accu.push(newObject)
        }
      })

      return accu;
    }, []);
    this.setState({buttonData})
    
  }


  getDiseaseNames = async () => {
    try{
    const response = await fetch('http://localhost:5000/api/v1/diseases');
    const diseases = await response.json();
    const diseaseNames = diseases.map(disease => ({ 
      name: disease.name, 
      id: disease.id 
    }));
    return diseaseNames
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
    return diseaseCount
    }catch(err){
      this.setState({error: err.message})
    }
  };

  render() {
    const state = this.props.navigation.getParam('state')
    
    const renderButton = this.state.buttonData.map(button => 
      <TouchableOpacity 
        style={styles.button} 
        key={button.count}
      >
        <Text> {button.disease} </Text>
        <Text> {button.count} </Text>
      </TouchableOpacity>
    )
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