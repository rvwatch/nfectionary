import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Picker, Select, Button, ScrollView } from 'react-native';
import { getDisease } from '../../api/getDisease';
import { graphCleaner } from '../../api/cleaners/graphCleaner';
import { shortNames } from '../../api/cleaners/shortNames';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryLine } from "victory-native";
import { getGraphCounts } from '../../api/getGraphCounts';
import { getStates } from '../../api/getStates';
import ModalDropdown from 'react-native-modal-dropdown';

export default class DiseaseDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseInfo: {},
      graphData: [],
      diseaseList: []
    }
  }

  async componentDidMount() {
    const id = this.props.navigation.getParam('disease_id');

    await this.fetchDiseaseData(Number(id) - 1);
  }

  async fetchDiseaseData(id) {
    const diseaseId = Number(id) + 1;
    const disease = await getDisease(diseaseId);
    const statesList = await getStates();
    const rawData = await getGraphCounts(diseaseId);
    const graphData = graphCleaner(rawData, shortNames);
    const diseaseList = this.props.navigation.getParam('diseaseList').map(disease => disease.name);
    
    this.setDiseaseInfo(disease, graphData, diseaseList);
  }

  setDiseaseInfo(diseaseInfo, graphData, diseaseList) {
    this.setState({ diseaseInfo, graphData, diseaseList });
  }

  static navigationOptions = {
    title: 'NFECTIONARY',
    headerStyle: {
      backgroundColor: '#3E79CA',
      borderBottomColor: '#3E79CA'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#ffffff',
      fontSize: 30,
      textDecorationLine: 'underline',
      fontFamily: "AmericanTypewriter"
    },
  };
  

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

    const { diseaseList } = this.state;
    
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
      <ModalDropdown 
          defaultValue={name}
          options={diseaseList} 
          onSelect={(event) => this.fetchDiseaseData(event)} 
          />
      <Text style={styles.textBlock}>{name}</Text>
      <Image resizeMode="contain" style={styles.image} source={{url: `${images}`}}></Image>
      <Text style={styles.textBlock}>{summary}</Text>
      <Text style={styles.textBlock}>Treatment: {treatment}</Text>
      <Text style={styles.textBlock}>Preventative Measures: {preventative_measures}</Text>
      <Text style={styles.textBlock}>Transmission: {transmission}</Text>
      <Text style={styles.textBlock}>Testing Procedures: {testing_procedures}</Text>
      <Text style={styles.textBlock}>Signs/ Symptoms: {signs_symptoms}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3E79CA',
    padding: 10
  },
  chart: {
    position: 'relative',
    color: '#ffffff',
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
  },
  textBlock: {
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 10
  }
});