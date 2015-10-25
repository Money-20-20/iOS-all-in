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
          <Text style={styles.bodyText}>{scenario.question}</Text>
          </View>
        <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  },

  renderDropdown: function(scenario) {
    return (
      <View>
        <Text style={styles.bodyText2}>"A bid of 2 bitcoins will net you 6 bitcoins if you win!"</Text>        
      </View>

    )
  },

  // testBets: function(scenario) {
  //   var ticker = setInterval(testBets, 2000);
  //   console.log(ticker);
  //   console.log("HITTTT");
  //   var array = [yv, nv];
  //   var increment = array[Math.floor(Math.random()*items.length)] + 1;

  //   return (
  //     <View>
  //     <View style={styles.container}>
  //       <Text style={styles.bodyText}>{scenario.question}</Text>
  //         <Text style={{color: 'green', fontWeight: 'bold'}}>Yes: {yv}</Text>
  //         <Text style={{color: 'red', fontWeight: 'bold'}}>No: {nv} </Text>
  //         <Text style={{color: 'blue', fontWeight: 'bold'}}>Wager Difference: {wager_random}</Text>
  //         <Text>___________________________________________________</Text>
  //     </View>
  //     <View style={styles.separator} />
  //     </View>
  //   )
  // },

  renderHeader: function(scenario) {
    var wagers = [-5000, 0,2000,8750, -6500, 3500,0,0,0];
    var wager_random = wagers[Math.floor(Math.random()*wagers.length)];
    var yv = scenario.yes_votes,
     nv = scenario.no_votes;
    var i = Math.floor(Math.random() * 2);
    if (i > 0){
      scenario.yes_votes++;
    } else {
      scenario.no_votes++;
    }
    return (
      <View>
      <View style={styles.container}>
        <Text style={styles.bodyText}>{scenario.question}</Text>
          <Text style={{color: 'green', fontWeight: 'bold'}}>{scenario.yes_votes} yes</Text>
          <Text style={{color: 'red', fontWeight: 'bold'}}>{scenario.no_votes} no</Text>
          <Text style={{color: 'blue', fontWeight: 'bold'}}>Wager Difference: {wager_random}</Text>
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
          renderRow={this.testBets}/>
      </View>
      </View>
      </Image>
    );
  }
});

module.exports = EventDetail;
