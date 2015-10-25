var React = require('react-native');
var styles = require('../stylesheets/layout');

var Header = require('./header');

var {
  View,
  ListView,
  Text,
  Image,
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
      <View style={styles.container}>
      <Text>{scenario.question}</Text>
      </View>
    )
  },

  render() {
    return (
      <Image style={styles.imageBackground} source={{uri: 'http://i.imgur.com/C4jhne6.jpg'}}>
      <Header/>
      <View>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderScenarios} />
      </View>
      </Image>
    );
  }
});

module.exports = EventDetail;