import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View, Dimensions } from 'react-native';
import { MapView, Svg } from 'expo'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import InfoModal from './InfoModal';
import { connect } from 'react-redux';
import MediaQuery from "react-native-web-responsive";

import { getScooters } from './reducer';


const { width, height } = Dimensions.get('window');
const iamhere = { coordinate: { latitude: 1.28380909, longitude: 103.85032855 } };

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentMarker: {},
      modalVisible: false
    }

    this.markerPress.bind(this);
  }

  componentWillMount() {
    this.props.getScooters();
  }

  getBatteryIconName(bat) {
    switch(true) {
      case (bat >= 0 && bat < 10):
        return 'battery-outline';
      case (bat >= 10 && bat < 20):
        return 'battery-10';
      case (bat >= 20 && bat < 30):
        return 'battery-20';
      case (bat >= 30 && bat < 40):
        return 'battery-30';
      case (bat >= 40 && bat < 50):
        return 'battery-40';
      case (bat >= 50 && bat < 60):
        return 'battery-50';
      case (bat >= 60 && bat < 70):
        return 'battery-60';
      case (bat >= 70 && bat < 80):
        return 'battery-70';
      case (bat >= 80 && bat < 90):
        return 'battery-80';
      case (bat >= 90 && bat < 100):
        return 'battery-90';
      default:
        return 'battery';
    }
  }

  markerPress(marker){
    this.setState({modalVisible:true, currentMarker: marker});
  }

  herePress(marker){
    this.props.navigation.navigate('Trips');
  }

  padLeft() {
    if (width === 375) return 40;
    return 30;
  }

  padTop() {
    if (width === 375) return 30;
    return 0;
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 1.28409504,
          longitude: 103.85166405,
          latitudeDelta: 0.007,
          longitudeDelta: 0.003,
        }}>
        <InfoModal visible={this.state.modalVisible} iamhere={iamhere} marker={this.state.currentMarker}/>
        <MapView.Marker {...iamhere} 
          image={require('./assets/you-are-here.png')} 
          onPress={this.herePress.bind(this)}/>
        {/* {this.state.markers.map((marker, i) => { */}
        {this.props.scooters.map((marker, i) => {
          return (
            <MapView.Marker key={i} {...marker} image={require('./assets/escooter.png')}
              onPress={()=>this.markerPress(marker)}>
                <View style={{paddingLeft:this.padLeft(), paddingTop:this.padTop()}}>
                  <Text style={{color:'green'}}>{marker.battery}%</Text>
                  <MaterialCommunityIcons 
                    name={this.getBatteryIconName(marker.battery)} 
                    size={24} 
                    color='green' 
                    />
                    {/* style={{ transform: [{ rotate: '-0deg' }] }}/> */}
                </View>
            </MapView.Marker>
          )
        })}
       </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

const mapStateToProps = state => {
    return {
      scooters: state.scooters
    };
  };
  
const mapDispatchToProps = {
  getScooters
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);

