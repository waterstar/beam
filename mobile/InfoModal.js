import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';

export default class InfoModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  calculateDistance = () => {
    /** should use google map api to calcuate distance  **/
    const { iamhere, marker } = this.props;
    const lat1 = iamhere.coordinate.latitude;
    const lon1 = iamhere.coordinate.longitude;
    const lat2 = marker.coordinate && marker.coordinate.latitude;
    const lon2 = marker.coordinate && marker.coordinate.longitude;
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      let radlat1 = Math.PI * lat1/180;
      let radlat2 = Math.PI * lat2/180;
      let theta = lon1-lon2;
      let radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344; // in km
      return dist;
    }
  }

  componentWillReceiveProps() {
    this.setState({modalVisible: this.props.visible});
  }

  render() {
    return (
      <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onBackdropPress={() => this.setState({ modalVisible: false })}
            >
            <View style={styles.modalContent}>
              <View style={{justifyContent:'center'}}>
                <Text>distance to scooter: {parseFloat(this.calculateDistance()).toFixed(2)}km</Text>
                <Text>scooter s/n: {this.props.marker.serial}</Text>
              </View>
            </View>
          </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0.8,
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center'
  }
});