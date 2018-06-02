import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button, ScrollView } from 'react-native';
import { getDisease } from '../../api/getDisease';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryLine } from "victory-native";
import { getGraphCounts } from '../../api/getGraphCounts';
import { getStates } from '../../api/getStates';


  const data = [
  {state : 'AL', cases: 20},
  {state : 'AK', cases: 300},
  {state : 'AZ', cases: 111},
  {state : 'AR', cases: 32},
  {state : 'CA', cases: 40},
  {state : 'CO', cases: 0},
  {state : 'CT', cases: 10},
  {state : 'DE', cases: 50},
  {state : 'FL', cases: 78},
  {state : 'GA', cases: 422},
  {state : 'HI', cases: 104},
  {state : 'ID', cases: 102},
  {state : 'IL', cases: 1},
  {state : 'IN', cases: 13},
  {state : 'IA', cases: 10},
  {state : 'KS', cases: 200},
  {state : 'KY', cases: 230},
  {state : 'LA', cases: 40},
  {state : 'ME', cases: 67},
  {state : 'MD', cases: 57},
  {state : 'MA', cases: 99},
  {state : 'MI', cases: 23},
  {state : 'MN', cases: 100},
  {state : 'MS', cases: 100},
  {state : 'MO', cases: 100},
  {state : 'MT', cases: 100},
  {state : 'NE', cases: 100},
  {state : 'NV', cases: 100},
  {state : 'NH', cases: 100},
  {state : 'NJ', cases: 100},
  {state : 'NM', cases: 100},
  {state : 'NY', cases: 100},
  {state : 'NC', cases: 100},
  {state : 'ND', cases: 100},
  {state : 'OH', cases: 100},
  {state : 'OK', cases: 100},
  {state : 'OR', cases: 100},
  {state : 'PA', cases: 100},
  {state : 'RI', cases: 100},
  {state : 'SC', cases: 100},
  {state : 'SD', cases: 100},
  {state : 'TN', cases: 100},
  {state : 'TX', cases: 100},
  {state : 'UT', cases: 100},
  {state : 'VT', cases: 100},
  {state : 'VA', cases: 100},
  {state : 'WA', cases: 100},
  {state : 'WV', cases: 100},
  {state : 'WI', cases: 100},
  {state : 'WY', cases: 100}
];

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
    const graphData = await getGraphCounts(id)
    
    console.log(statesList);
    
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
          data={data} 
          x="state" 
          y="cases" />
        </VictoryChart>
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