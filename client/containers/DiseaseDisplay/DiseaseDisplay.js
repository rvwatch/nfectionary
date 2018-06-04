import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Picker,
  Select,
  Button,
  ScrollView
} from 'react-native';
import { getDisease } from '../../api/getDisease';
import { graphCleaner } from '../../api/cleaners/graphCleaner';
import { shortNames } from '../../api/cleaners/shortNames';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryLine,
  VictoryVoronoiContainer,
  createContainer
} from "victory-native";
import { getGraphCounts } from '../../api/getGraphCounts';
import { getStates } from '../../api/getStates';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import ModalDropdown from 'react-native-modal-dropdown';

export default class DiseaseDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseInfo: {},
      graphData: [],
      diseaseList: [],
      activeSection: false,
      collapsed: true
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
    this.setState({
      diseaseInfo,
      graphData,
      diseaseList
    });
  }

  _toggleExpanded = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  _setSection(section) {
    this.setState({
      activeSection: section
    });
  }

  _renderHeader(section, i, isActive) {
    return ( 
      <View style = {[styles.header, isActive ? styles.active : styles.inactive]}>
        <Text style = {styles.headerText}> { section.title }</Text> 
      </View>
    );
  }

  _renderContent(section, i, isActive) {
    return ( 
      <Text style = {[styles.content, isActive ? styles.active : styles.inactive]}> 
        {section.content} 
      </Text>
    );
  }

  static navigationOptions = {
    title: ' ',
    headerStyle: {
      backgroundColor: '#3E79CA',
      borderBottomColor: '#3E79CA'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#ffffff',
      fontSize: 30,
      textDecorationLine: 'underline'
    },
  };

  render() {
    const {
      name,
      treatment,
      preventative_measures,
      signs_symptoms,
      images,
      testing_procedures,
      transmission,
      summary
    } = this.state.diseaseInfo;
    const { diseaseList } = this.state;

    const diseaseContent = [
      { title: 'Description', content: summary },
      { title: 'Treatment:', content: treatment },
      { title: 'Preventative Measures', content: preventative_measures },
      { title: 'Transmission', content: transmission },
      { title: 'Testing Procedures', content: testing_procedures },
      { title: 'Signs/ Symptoms', content: signs_symptoms }
    ];
  
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    return ( 
      <ScrollView contentContainerStyle = {styles.container}>
        <ModalDropdown 
          defaultValue = {name}
          style = {styles.dropDown}
          options = { diseaseList}
          onSelect = {(event) => this.fetchDiseaseData(event)}
      /> 
      <Text> Reported Cases - YTD </Text> {
        this.state.graphData.length > 0 ?
          <VictoryChart
            resizeMode = "contain"
            style = {styles.chart}
            theme = {VictoryTheme.material}
            containerComponent = {
                <VictoryZoomVoronoiContainer 
                  voronoiDimension = "x"
                  labels = {(d) => `cases: ${d.y}`}
                  zoomDomain = {{x: [5, 15]}}
                  allowZoom = {false}
                />
              }
          >
            <VictoryBar
              style = {{data: {fill: "#c43a31"}}}
              alignment = "start"
              barRatio = {2.5}
              data = {this.state.graphData}
              x = "state"
              y = "count" 
            />
            </VictoryChart> : <Text> Loading Chart Data </Text>
          } 
          
        <Image resizeMode = "contain"
          style = { styles.image }
          source = { {url: `${images}`} }>
        </Image> 
        <Accordion
          activeSection = { this.state.activeSection }
          sections = { diseaseContent }
          touchableComponent = { TouchableOpacity }
          renderHeader = { this._renderHeader }
          renderContent = { this._renderContent }
          onChange = { this._setSection.bind(this) }
        /> 
       </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#3E79CA',
      padding: 10
    },
    dropDown: {
      backgroundColor: '#ffffff',
      padding: 10,
      borderRadius: 5,
    },
    chart: {
      position: 'relative',
      color: '#ffffff',
      width: 300,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    image: {
      position: 'relative',
      height: 300,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    textBlock: {
      color: '#ffffff',
      marginTop: 10,
      marginBottom: 10
    },
    title: {
      textAlign: 'left',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20
    },
    header: {
      backgroundColor: '#F5FCFF',
      padding: 10
    },
    headerText: {
      textAlign: 'left',
      fontSize: 16,
      fontWeight: '500'
    },
    content: {
      padding: 20,
      backgroundColor: 'rgba(255,255,255,1)'
    },
    active: {
      backgroundColor: 'rgba(255,255,255,1)'
    },
    inactive: {
      backgroundColor: 'rgba(245,252,255,1)'
    }
  });