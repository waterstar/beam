import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

export default class InfoModal extends Component {

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

  render() {
    return (
      <View style={[styles.modalContent, {display:this.props.visible}]}>
        <View style={{flex:30}}>
        <TouchableOpacity
          style={{
            borderWidth:2,
            borderColor:'rgba(0,0,0)',
            alignItems:'center',
            justifyContent:'center',
            width:80,
            height:80,
            backgroundColor:'#32CD32',
            borderRadius:100,
          }}
        >
        <Text style={{ fontSize:24, fontWeight:'bold'}}>RIDE</Text>
        </TouchableOpacity>
        </View>
        <View style={{justifyContent:'center', flex:70}}>
          <Text>distance to scooter: {parseFloat(this.calculateDistance()).toFixed(2)}km</Text>
          <Text>scooter s/n: {this.props.marker.serial}</Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center'
  }
});