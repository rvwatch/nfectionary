import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button } from 'react-native';
import { getDisease } from '../../api/getDisease';
export default class DiseaseDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseInfo: {}
    }
  }

  async componentDidMount() {
    const id = this.props.navigation.getParam('disease_id')
    const disease = await getDisease(id);
    this.setDiseaseInfo(disease);
  }

  setDiseaseInfo(diseaseInfo) {
    this.setState({ diseaseInfo });
  }

  render() {
    const {name, 
      treatment, 
      preventative_measures, 
      signs_symptoms, 
      images, 
      testing_procedures, 
      transmission,
      summary 
    } = this.state.diseaseInfo;

    return (
      <View>
      <Text>{name}</Text>
      <Image style ={{ width: 30, height: 30}} source={{url: `${images}`}}></Image>
      <Text>{summary}</Text>
      <Text>Treatment: {treatment}</Text>
      <Text>Preventative Measures: {preventative_measures}</Text>
      <Text>Transmission: {transmission}</Text>
      <Text>Testing Procedures: {testing_procedures}</Text>
      <Text>Signs/ Symptoms: {signs_symptoms}</Text>
      </View>
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