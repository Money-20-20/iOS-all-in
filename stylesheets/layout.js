var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
    header: {
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'green',
    marginTop: 0,
    padding: 50
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'red'
  },
  imageBackground: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  }
});

module.exports = styles;