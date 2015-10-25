var React = require('react-native');

var {
  View,
  ListView,
  Text,
  TouchableHighlist
} = React;

var EventDetail = React.createClass({
  getInitialState: function() {
    return {
      scenarios: [],
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
    var event_id = this.props.bet_event.id;
    var Event_URL = 'http:/localhost:3000/events/' + event_id + '/scenarios';
    fetch(Event_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        scenarios: responseData,
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true,
      });
    })
    .done();
  },

  goBack() {
    this.props.navigator.pop();
  },

  renderScenarios: function(scenario) {
    return (
      <View>
      <Text>{scenario.question}</Text>
      </View>
    )
  },

  render() {
    return (
      <Text>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderScenarios} />
      </Text>
    );
  }
});

module.exports = EventDetail;