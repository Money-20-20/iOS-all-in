var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
    header: {
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'Baskerville',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#954BDB',
    marginTop: 0,
    padding: 15,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    opacity: .75,
    padding: 15,
  },
  bodyText: {
    color: '#7F00FF',
    fontWeight: 'bold',
    fontFamily: 'Palatino',
    fontSize: 20
  },
  bodyText2: {
    color: '#551A8B',
    fontFamily: 'Palatino',
    fontSize: 15,
    fontWeight: 'bold'
  },
  imageBackground: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  },
  scenarioHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
  }
});

module.exports = styles;