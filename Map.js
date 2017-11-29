import React, { Component } from 'react';
import { Image, TouchableOpacity, TouchableHighlight, Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import emoji from 'node-emoji';
import markersData from './markers.js';



const {width, height} = Dimensions.get('window');
circleSize = Math.round(width/7)
var markers2 = JSON.parse(markersData.test);

//console.log(markers2);

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 32.8804,
        longitude: -117.2375,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      },
      
      markers:[
        {
          latlng: {latitude: 32.8804, longitude: -117.2375},
          title: "Geisel Library", description: "Come study!", image: "books"
        },
        {
          latlng: {latitude: 32.884, longitude: -117.2381},
          title: "RIMAC", description: "Playing basketball", image: "basketball"
        },
        {
          latlng: {latitude: 32.8801, longitude: -117.2340},
          title: "Warren Dorms", description: "Playing video games", image: "video_game"
        }, 
        {
          latlng: {latitude: 32.8803, longitude: -117.241},
          title: "Marshall College", description: "Walking my dog!", image: "dog"
        }, 
      ] // end of markers
    }; // end of this.state
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  activityCreation(){
  //start flow for creating an activity

  }

  render() {
    return (
      <View style={styles.container}>
        {/* Setting attributes for the MapView */}
	<MapView style={styles.map}
          mapType="standard"
          showsUserLocation={true}
          showsCompass={true}
          showsPointsOfInterest={true}
          showsMyLocationButton={true}
          toolbarEnabled={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
		
	{/* Information for each marker is used to create them 
            (Child of MapView) */}
        {this.state.markers.map((marker, i) => (
          <MapView.Marker
            key={i}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}>

            {/* This is a custom view to show an emoji and its BG 
                (Child of MapView.Marker) */}
            <View style={styles.markerBG}>
              <Text style={styles.markerEmoji}>{emoji.get(marker.image)}</Text>
            </View>

          </MapView.Marker>
        ))}

        </MapView>
	
        {/* <View style={styles.container}>
          <Text style={styles.header}>
            Latitude: {this.state.region.latitude}{'\n'}
            Longitude: {this.state.region.longitude}{'\n'}
            LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
            LongitudeDelta: {this.state.region.longitudeDelta}
          </Text>
        </View> */}
	  <View style = {{flex: 1, position: 'absolute'}}></View>

	  <View style = {{flexDirection: 'row', position: 'absolute'}}>
	    <TouchableOpacity style = {styles.circle} onPress={() => this.activityCreation()}>
	      <Text>+</Text>
	    </TouchableOpacity>
	    
	    <Text style = {{width: Math.floor(width*.71)}}> </Text>

	    <TouchableOpacity style = {styles.circle}
      	      onPress={() => this.props.navigation.navigate('UserPreferenceScreen')}>

	      <Image 
	        style = {styles.circleImage} 
	        source = {require('./resources/polo_logo.png')}
	      />
	    </TouchableOpacity>

	  </View>

	  <View style = {{flex: 5}}></View>
  	</View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  header: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  markerBG: {
    backgroundColor: 'rgba(52, 52, 52, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    height: 60,
    width: 60, 
    padding: 5,
    borderRadius: 30,
  },
  markerEmoji: {
    fontSize: 30,
    color: 'black'
  },
  circle:{
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    width:circleSize,
    height:circleSize,
    borderRadius:circleSize,
    borderColor: 'white',
    backgroundColor: '#fff' 
  },
  circleImage:{
    borderWidth:1,
    width:circleSize,
    height:circleSize,
    borderRadius:circleSize,
  },
});
