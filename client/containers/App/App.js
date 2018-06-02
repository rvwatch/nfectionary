import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../HomeScreen/HomeScreen';
import StateDisplay from '../StateDisplay/StateDisplay';
import DiseaseDisplay from '../DiseaseDisplay/DiseaseDisplay';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    StateDisplay: StateDisplay,
    DiseaseDisplay: DiseaseDisplay
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}