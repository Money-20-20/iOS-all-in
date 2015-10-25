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

AppRegistry.registerComponent('AllIn', () => AllIn);
