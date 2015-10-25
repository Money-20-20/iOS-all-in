var React = require('react-native');

var {
  View,
  ListView,
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
    var event_id = this.props.event.id;
    var Event_URL = 'http:/localhost:3000/events/' + event_id.toString() + '/scenarios';
    fetch(Event_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        scenarios: responseData,
        dataSource: this.state.dataSource.cloneWithRows(responseData.scenarios),
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
      <View>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderScenarios} />
      </View>
    );
  }
});

module.exports = EventDetail;