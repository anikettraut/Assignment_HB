/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import RouterComponent from './src/Router';
import { Provider } from 'react-redux'
import configureStore from './src/store/configureStore'
console.disableYellowBox = true; //Disables the warning in production
const store = configureStore()


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

