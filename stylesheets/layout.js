var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'black'
  },
    header: {
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'green',
    marginTop: 20,
    padding: 15,
  },
  container: {
    // flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    opacity: 0.5,
    padding: 15,
  },
  imageBackground: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  }
});

module.exports = styles;