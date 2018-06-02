import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button, ScrollView } from 'react-native';
import { getDisease } from '../../api/getDisease';
import {graphCleaner, shortNames} from '../../api/cleaners/graphCleaner';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryLine } from "victory-native";
import { getGraphCounts } from '../../api/getGraphCounts';
import { getStates } from '../../api/getStates';

export default class DiseaseDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseInfo: {},
      graphData: []
    }
  }

  async componentDidMount() {
    const id = this.props.navigation.getParam('disease_id')
   
    const disease = await getDisease(id);
    const statesList = await getStates();
    const rawData = await getGraphCounts(id)
    
    const graphData = graphCleaner(rawData, shortNames);
    
    this.setDiseaseInfo(disease, graphData);
  }

  setDiseaseInfo(diseaseInfo, graphData) {
    this.setState({ diseaseInfo, graphData });
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
      <ScrollView contentContainerStyle={styles.container}>
      { this.state.graphData.length > 0 ? 
        <VictoryChart
        resizeMode="contain" 
        style={styles.chart}
        theme={VictoryTheme.material}
        containerComponent={<VictoryZoomContainer zoomDomain={{x: [5, 15]}} allowZoom={false}/>}
      >
          <VictoryBar
          style={{ data: { fill: "#c43a31" } }}
          alignment="start" 
          barRatio={2.5}
          data={this.state.graphData} 
          x="state" 
          y="count" />
        </VictoryChart> : 
        <Text>Loading Chart Data</Text>
      }
      <Text>{name}</Text>
      <Image resizeMode="contain" style={styles.image} source={{url: `${images}`}}></Image>
      <Text>{summary}</Text>
      <Text>Treatment: {treatment}</Text>
      <Text>Preventative Measures: {preventative_measures}</Text>
      <Text>Transmission: {transmission}</Text>
      <Text>Testing Procedures: {testing_procedures}</Text>
      <Text>Signs/ Symptoms: {signs_symptoms}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10
  },
  chart: {
    position: 'relative',
    height: 300,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
},
  image: {
      position: 'relative',
      height: 200,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
  }
});