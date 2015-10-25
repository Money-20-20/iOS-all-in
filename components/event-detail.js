var React = require('react-native');
var Collapsible = require('react-native-collapsible');
var Accordion = require('react-native-collapsible/Accordion')
var styles = require('../stylesheets/layout');
var Header = require('./header');

var {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight
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
      console.log(responseData);
    })
    .done();
  },

  goBack() {
    this.props.navigator.pop();
  },

  goToScenario: function(scenario) {
    this.props.navigator.push({
      component: ScenarioDetail,
      passProps: {
        scenario: scenario,
      }
    });
  },

  renderScenarios: function(scenario) {
    return (
      <TouchableHighlight onPress={this.goToScenario.bind(this, scenario)}>
        <View>
          <View style={styles.container}>
          <Text>{scenario.question}</Text>
          </View>
        <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  },

  renderDropdown: function(scenario) {
    return (
      <View>
        <Text>HFJKALHFJLKHDldhfjkslfdnjknvakjlhfuelahrjkadnksjkdjakflajdkfjsgjkdfnghjksfdk</Text>
      </View>

    )
  },

  renderHeader: function(scenario) {
    return (
      <View>
      <View style={styles.container}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>{scenario.question}</Text>
      </View>
      <View style={styles.separator} />
      </View>
    )
  },

  render() {
    return (
      <Image style={styles.imageBackground} source={{uri: 'http://i.imgur.com/YZWUKAq.jpg'}}>
      <Header/>
      <View style={styles.container}>
      <View style={{color: '#FFFFFF'}}>
        <Accordion
          sections={this.state.scenarios}
          renderHeader={this.renderHeader}
          renderContent={this.renderDropdown}
        />
      </View>
      </View>
      </Image>
    );
  }
});

module.exports = EventDetail;