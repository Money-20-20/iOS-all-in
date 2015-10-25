var React = require('react-native');
var styles = require('./stylesheets/layout');
var EventDetail = require('./components/event-detail');
var Header = require('./components/header');

var {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View,
  ListView,
  TouchableHighlight,
  Image
} = React;

var API_URL = 'http://localhost:3000/events';

var EventList = React.createClass({
  getInitialState: function() {
    return {
      events: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(API_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        events: responseData,
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true,
      });
    })
    .done();
  },

  goToEvent: function(bet_event) {
    this.props.navigator.push({
      component: EventDetail,
      passProps: {
        bet_event: bet_event,
      }
    });
  },

  renderEvent: function(bet_event) {
    return (
      <TouchableHighlight onPress={this.goToEvent.bind(this, bet_event)}>
        <View>
        <View style={styles.container}>
          <Text>{bet_event.name}</Text>
          <Text>{bet_event.description}</Text>
        </View>
        <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  render() {
    return (
        <Image style={styles.imageBackground} source={{uri: 'http://i.imgur.com/C4jhne6.jpg'}}>
        <Header/>
        <View style={styles.separator} />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEvent}/>
        </Image>
      );
  }
});

module.exports = EventList;