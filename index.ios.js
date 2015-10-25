/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} = React;

var EventList = require('./event-list');

var AllIn = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{component: EventList}}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} {...route.passProps} />;
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AllIn', () => AllIn);
