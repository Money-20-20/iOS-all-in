var React = require('react-native');
var Collapsible = require('react-native-collapsible');
var Accordion = require('react-native-collapsible/Accordion')
var styles = require('../stylesheets/layout');
var Header = require('./header');
var Swiper = require('react-native-swiper');

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
          <Text style={styles.bodyText}>{scenario.question}</Text>
          </View>
        <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  },

  postWager: function(scenario) {
    var scenarioId = scenario.id;
    var eventId = this.props.bet_event.id;

    var scenarioURL = 'http:/localhost:3000/wagers';

    fetch(scenarioURL, { method: "POST", body: JSON.stringify({ "amount": 1000, "scenario_id": scenarioId }) });

  },

  renderDropdown: function(scenario) {

    return (
      <Swiper onMomentumScrollEnd={() => console.log(this.postWager(scenario))}>
        <View>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Bet 5000 Satoshi!</Text>
        </View>
        <View>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Thanks for betting. Good luck!</Text>
        </View>
      </Swiper>
    )
  },

  renderHeader: function(scenario) {
    var yv = scenario.yes_votes,
     nv = scenario.no_votes,
     wd = scenario.wager_difference;
    return (
      <View>
      <View style={styles.container}>
        <Text style={styles.bodyText}>{scenario.question}</Text>
          <Text style={{color: 'green', fontWeight: 'bold', fontSize: 20}}>Yes: {yv}</Text>
          <Text style={{color: 'red', fontWeight: 'bold', fontSize: 20}}>No: {nv} </Text>
          <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 18}}>Wager Diff: {wd}</Text>
          <Text>___________________________________________________</Text>
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