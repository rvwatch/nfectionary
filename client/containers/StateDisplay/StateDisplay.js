import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { getDiseaseNames } from '../../api/getDiseaseNames';
import { getDiseaseCount } from '../../api/getDiseaseCount';
import { buttonCleaner } from '../../api/cleaners/buttonCleaner';
import { diseaseSort } from '../../api/cleaners/sortDiseaseData';
import PropTypes from 'prop-types';
export default class StateDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonData: [],
      state: '',
      statesList: [],
      diseaseList: []
    };
  }

  async componentDidMount() {
    const id = this.props.navigation.getParam('id');
    await this.fetchAllData(id);
  }

  async fetchAllData(id) {
    const diseaseId = Number(id) + 1;
    const diseaseList = await getDiseaseNames();

    diseaseList.sort(diseaseSort);
    const count = await getDiseaseCount(diseaseId);
    const buttonData = buttonCleaner(diseaseList, count);
    
    this.setButtonData(buttonData, id, diseaseList);
  }

  setButtonData(buttonData, id, diseaseList) {
    const statesList = this.props.navigation.getParam('statesList');
    const state = statesList[id];
    
    this.setState({ buttonData, state, statesList, diseaseList });
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
    }
  };
  
  render() {
    const { buttonData, state, statesList, diseaseList } = this.state;

    const renderButton = buttonData.map((button, index) => (
      <TouchableOpacity
        style={styles.button}
        key={button.count + index}
        onPress={() => this.props.navigation.navigate('DiseaseDisplay', 
          {disease_id: button.disease_id, diseaseList })}>
        <Text style={styles.buttonName}> {button.name} </Text>
        <Text style={styles.buttonCount}> {button.count} </Text>
      </TouchableOpacity>
    ));
    
    return (
      <View style={styles.container}>
        <View style = {styles.dropDownWrap}>
          <ModalDropdown 
            defaultValue={state}
            style={styles.dropDown}
            options={statesList} 
            textStyle={{ color: '#3E79CA', fontSize: 20, textAlign: 'left', width: 160 }}
            dropdownTextStyle={ {color: '#3E79CA', fontSize: 16} }
            onSelect={(event) => this.fetchAllData(event)} 
          />
          <View style={styles.arrWrap}><Text style={styles.arrColor}>▼</Text></View>
        </View>
      
        <View style={styles.buttonWrap}>
          {renderButton}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E79CA',
    alignItems: 'center',
    justifyContent: 'center'
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
  buttonWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(255,255,255,.3)',
    margin: 10,
    width: 160,
    height: 75,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffffff',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .5
  },
  buttonName: {
    fontSize: 20,
    color: '#ffffff'
  },
  buttonCount: {
    fontSize: 18,
    color: '#225293',
    alignItems: 'center',
  }
});

StateDisplay.propTypes = {
  navigation: PropTypes.object
};