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
   // navigator.geolocation.getCurrentPosition(success, error)

   var Geolocation = {
    rad: function(x) { return x * Math.PI / 180 },

    // Distance in kilometers between two points using the Haversine algo.
    haversine: function(p1, p2) {
      var R = 6371
      var dLat  = this.rad(p2.latitude - p1.latitude)
      var dLong = this.rad(p2.longitude - p1.longitude)

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.rad(p1.latitude)) * Math.cos(this.rad(p2.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      var d = R * c

      return Math.round(d)
    },

    // Distance between me and the passed position.
    distance_from: function(position) {
      var venetian = {longitude: 36.121702, latitude: -115.167246}

      var distance = Geolocation.haversine(position, venetian)

      // Sugar: If distance is less than 1km, don't bump into me.
      // if ( distance && distance / 1000 < 1000 ) console.log(distance / 1000)
      return distance
    }
  }
  
    pos = {latitude: bet_event.latitude, longitude: bet_event.longitude}
  
    if (Geolocation.distance_from(pos) < 20000) {
    return (
      <TouchableHighlight onPress={this.goToEvent.bind(this, bet_event)}>
        <View>
        <View style={styles.container}>
          <Text style={styles.bodyText}>{bet_event.name}</Text>
          <Text style={styles.bodyText2}>{bet_event.description}</Text>
        </View>
        <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  } else return (<View></View>);
  },

  render() {
    return (
        <Image style={styles.imageBackground} source={{uri: 'http://i.imgur.com/YZWUKAq.jpg'}}>
        <Header/>
        <View style={styles.separator} />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEvent} />
        </Image>
      );
  }
});

module.exports = EventList;