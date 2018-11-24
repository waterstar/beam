import React from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet, Text, View, Dimensions } from 'react-native';
import { MapView, Svg, Location, Permissions } from 'expo'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import InfoModal from './InfoModal';
import { connect } from 'react-redux';
import MediaQuery from "react-native-web-responsive";

import { getScooters } from './reducer';


const { width, height } = Dimensions.get('window');

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
      modalVisible: 'none',
      iamhere: { coordinate: { latitude: 1.28370000, longitude: 103.85032850 } },
      mapRegion: null
    }
    this.timer = null;
    this.markerPress.bind(this);
  }

  componentWillMount() {
    this.getLocationAsync().then(()=>{
      this.props.getScooters();

      this.timer = setInterval(()=>{
        Location.getCurrentPositionAsync({}).then((location)=>{
          const { longitude, latitude } = location.coords;
          this.setState({ iamhere: { coordinate: { latitude, longitude } } });
        });
      }, 1000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Permission to access location was denied. Default location is shown');
    } 
    let location = await Location.getCurrentPositionAsync({});
    const { longitude, latitude } = location.coords;
    this.setState({ iamhere: { coordinate: { latitude, longitude } }, 
                    mapRegion: { latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  };

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

  getImgName(bat) {
    switch(true) {
      case (bat >= 0 && bat < 10):
        return require('./assets/marker-0.png');
      case (bat >= 10 && bat < 20):
        return require('./assets/marker-10.png');
      case (bat >= 20 && bat < 30):
        return require('./assets/marker-20.png');
      case (bat >= 30 && bat < 40):
        return require('./assets/marker-30.png');
      case (bat >= 40 && bat < 50):
        return require('./assets/marker-40.png');
      case (bat >= 50 && bat < 60):
        return require('./assets/marker-50.png');
      case (bat >= 60 && bat < 70):
        return require('./assets/marker-60.png');
      case (bat >= 70 && bat < 80):
        return require('./assets/marker-70.png');
      case (bat >= 80 && bat < 90):
        return require('./assets/marker-80.png');
      case (bat >= 90 && bat < 100):
        return require('./assets/marker-90.png');
      default:
        return require('./assets/marker-100.png');
    }
  }

  mapPress(){
    this.setState({modalVisible:'none'});
  }

  markerPress(marker){
    this.setState({modalVisible:'flex', currentMarker: marker});
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
      <TouchableWithoutFeedback onPress={this.mapPress.bind(this)}>
        <View style={{flex:1}}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={this.state.mapRegion}>
            {/* {this.state.markers.map((marker, i) => { */}
            {this.props.scooters.map((marker, i) => {
              return (
                <MapView.Marker key={i} {...marker}
                  onPress={()=>this.markerPress(marker)}>
                  <Image source={this.getImgName(marker.battery)} style={{width: 60, height: 60}}>
                  </Image>
                </MapView.Marker>
              )
            })}
            <MapView.Marker {...this.state.iamhere} style={{ zIndex:999 }}
              image={require('./assets/you-are-here.png')} 
              onPress={this.herePress.bind(this)}/>
          </MapView>
          <InfoModal visible={this.state.modalVisible} 
                    iamhere={this.state.iamhere} 
                    marker={this.state.currentMarker}/>
        </View>
       </TouchableWithoutFeedback>
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

