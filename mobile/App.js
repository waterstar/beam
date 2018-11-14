import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createStackNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './reducer';
import Home from './HomeScreen';
import Trips from './TripsScreen';

const client = axios.create({
  baseURL: Expo.Constants.manifest.extra.api_server,
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const Stack = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: () => ({
        header:null
      }),
    },
    Trips: {
      screen: Trips
    },
  },
  // { 
  //   headerMode: 'none' 
  // }
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Stack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
