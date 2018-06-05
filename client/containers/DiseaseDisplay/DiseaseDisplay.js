import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { getDisease } from '../../api/getDisease';
import { graphCleaner } from '../../api/cleaners/graphCleaner';
import { shortNames } from '../../api/cleaners/shortNames';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  createContainer
} from "victory-native";
import { getGraphCounts } from '../../api/getGraphCounts';
import Accordion from 'react-native-collapsible/Accordion';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';

export default class DiseaseDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseInfo: {},
      graphData: [],
      diseaseList: [],
      activeSection: false,
      collapsed: true
    };
  }

  async componentDidMount() {
    const id = this.props.navigation.getParam('disease_id');

    await this.fetchDiseaseData(Number(id) - 1);
  }

  async fetchDiseaseData(id) {
    const diseaseId = Number(id) + 1;
    const disease = await getDisease(diseaseId);
    const rawData = await getGraphCounts(diseaseId);
    const graphData = graphCleaner(rawData, shortNames);
    const diseaseList = this.props.navigation.getParam('diseaseList')
      .map(disease => disease.name);

    this.setDiseaseInfo(disease, graphData, diseaseList);
  }

  setDiseaseInfo(diseaseInfo, graphData, diseaseList) {
    
    this.setState({
      diseaseInfo,
      graphData,
      diseaseList
    });
  }

  _toggleExpanded() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  _setSection(section) {
    this.setState({
      activeSection: section
    });
  }

  _renderHeader(section, i, isActive) {
    return ( 
      <Animatable.View
        duration={500}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style = {styles.headerText}> { section.title }</Text> 
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return ( 
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
      <Animatable.Text style={{color: '#ffffff'}} animation={isActive ? 'slideInDown' : undefined}>
        {section.content} 
        </Animatable.Text>
      </Animatable.View>
    );
  }

  // eslint-disable-next-line
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
    }
  };
 tickStyle = {
    axis: { stroke: "white" },
    axisLabel: { fontSize: 20, fill: "white" },
    ticks: { stroke: "white", size: 1, },
    tickLabels: { fontSize: 15, padding: 10, fill: "white" }
  }
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
    const { diseaseList, state } = this.state;

    const diseaseContent = [
      { title: 'Description:', content: summary },
      { title: 'Treatment:', content: treatment },
      { title: 'Preventative Measures:', content: preventative_measures },
      { title: 'Transmission:', content: transmission },
      { title: 'Testing Procedures:', content: testing_procedures },
      { title: 'Signs/ Symptoms:', content: signs_symptoms }
    ];
  
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    return ( 
      <View style={{flex: 1}}>
      <ScrollView contentContainerStyle = {styles.container}>
        <View style = {styles.dropDownWrap}>
          <ModalDropdown 
            defaultValue={name}
            style={styles.dropDown}
            options={diseaseList} 
            textStyle={{ color: '#3E79CA', fontSize: 20, textAlign: 'left', width: 160 }}
            dropdownTextStyle={ {color: '#3E79CA', fontSize: 16} }
            onSelect = {(event) => this.fetchDiseaseData(event)}
          />
          <View style={styles.arrWrap}><Text style={styles.arrColor}>▼</Text></View>
        </View>
      <Text style={styles.chartTitle}> Reported Cases - YTD </Text> 
      { this.state.graphData.length > 0 ?
          <VictoryChart
            height={350}
            style = {styles.chart}
            containerComponent = {
                <VictoryZoomVoronoiContainer 
                  voronoiDimension = "x"
                  labels = {(d) => `cases: ${d.y}`}
                  zoomDomain = {{x: [5, 15]}}
                  allowZoom = {false}
                />
              }
          >
          
          <VictoryAxis standalone={false} style={this.tickStyle} />
          <VictoryAxis dependentAxis style={this.tickStyle} />
            <VictoryBar
              style = {{data: {fill: "#c43a31", stroke: "black", strokeWidth: 1 }}}
              alignment = "start"
              barRatio = {2.5}
              data = {this.state.graphData}
              x = "state"
              y = "count" 
            />
            
            </VictoryChart> : <Text> Loading Chart Data </Text>
          } 
        <Image
          style = { styles.image }
          source = { {url: `${images}`} }>
        </Image> 

        <Accordion
          activeSection = { this.state.activeSection }
          duration={800}
          sections = { diseaseContent }
          touchableComponent = { TouchableOpacity }
          renderHeader = { this._renderHeader }
          renderContent = { this._renderContent }
          onChange = { this._setSection.bind(this) }
        /> 
       </ScrollView>
       </View>
      );
    }
  }

  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#3E79CA',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 20
    },
    dropDownWrap: {
      alignItems:'center', 
      flexDirection:'row'
    },
    dropDown: {
      backgroundColor: '#ffffff',
      marginBottom: 20,
      padding: 10,
      width: 190,
      borderRadius: 3,
      shadowOffset:{  width: 1,  height: 1,  },
      shadowColor: 'black',
      shadowOpacity: .5
    },
    arrWrap: {
      position: "absolute", 
      right: 15, 
      top: 15
    },
    arrColor: {
      color: '#3E79CA'
    },
    chart: {
      color: '#ffffff',
      height: 300,
      width: 320,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    chartTitle: {
      color: '#ffffff',
      fontSize: 20,
      marginBottom: -40,
      textAlign: 'center'
    },
    image: {
      position: 'relative',
      width: 300,
      height: 200,
      marginBottom: 30
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
      backgroundColor: 'rgba(255,255,255,.3)',
      padding: 10,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderWidth: 1,
      borderColor: '#ffffff'
    },
    headerText: {
      textAlign: 'left',
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff'
    },
    content: {
      padding: 20
    },
    active: {
      backgroundColor: '#678ABD'
    },
    inactive: {
      backgroundColor: '#678ABD'
    }
  });


 