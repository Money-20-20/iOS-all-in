var React = require('react-native');

var EventDetail = require('./components/event-detail');

var {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View,
  ListView,
  TouchableHighlight
} = React;

var API_URL = '';

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
    fetchData(API_URL)
    .then((response)) => response.json())
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
          <Text>{bet_event.title}</Text>
          <Text>{bet_event.description}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  render() {
    return (
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEvent}
          />
        </View>
      );
  }
});

module.exports = EventList;