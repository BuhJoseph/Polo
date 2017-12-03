import React, { Component } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import MapView from "react-native-maps";
import Modal from "react-native-modal";
import { StackNavigator } from "react-navigation";
import emoji from "node-emoji";
import markersData from "./markers.js";
import Hosting from "./Hosting.js";
import renderIf from "./renderIf";
import moment from "moment";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

const activityList = [
  {
    activityId: 19230123,
    startTime: "2017-12-03 09:30",
    categoryId: 2,
    emoji: "⛵",
    title: "Sailing"
  },
  {
    activityId: 19230124,
    startTime: "2017-12-03 10:30",
    categoryId: 3,
    emoji: "🥐",
    title: "Breakfast"
  },
  {
    activityId: 19230125,
    startTime: "2017-12-03 12:30",
    categoryId: 2,
    emoji: "🏓",
    title: "Ping Pong"
  }
];

const { width, height } = Dimensions.get("window");
circleSize = Math.round(width / 7);
var markers2 = JSON.parse(markersData.test);

const LATITUDE = 32.8804;
const LONGITUDE = -117.2375;
const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.006;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
   
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

      markers: [
        {
          latlng: {
            latitude: 32.8804,
            longitude: -117.2375
          },
          title: "Geisel Library",
          description: "Come study!",
          image: "books"
        },
        {
          latlng: {
            latitude: 32.884,
            longitude: -117.2381
          },
          title: "RIMAC",
          description: "Playing basketball",
          image: "basketball"
        },
        {
          latlng: {
            latitude: 32.8801,
            longitude: -117.234
          },
          title: "Warren Dorms",
          description: "Playing video games",
          image: "video_game"
        },
        {
          latlng: {
            latitude: 32.8803,
            longitude: -117.241
          },
          title: "Marshall College",
          description: "Walking my dog!",
          image: "dog"
        }
      ] // end of markers
    }; // end of this.state
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({
      region
    });
  }

  activityCreation() {
    /* after first activity creation, will need to tap twice
         * to create more activities, b/c when activityModule closes itself
         * the map doesn't if that happens or not
         */
    //start flow for creating an activity
    this.setState({
      status: !this.state.status
    });
  }
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text> {text} </Text>
      </View>
    </TouchableOpacity>
  );

  _renderImage = (image, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Image source={image} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text> Insert Activity Creation </Text>
      {this._renderButton("Close", () =>
        this.setState({
          visibleModal: null
        })
      )}
    </View>
  );

  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({position: {longitude: position.longitude, latitude: position.latitude}});
    }, (error) => {
      alert(JSON.stringify(error))
    }, {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {renderIf(this.state.status)(<Hosting />)}
        {/* Setting attributes for the MapView */}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.activityCreation()}
          >
            <Text> + </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate("UserPreferenceScreen")
            }
          >
            <Image
              style={styles.buttonImage}
              source={require("./pictures/realprofile.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={activityList}
            renderItem={({ item }) => (
              <View style={styles.activityListElement}>
                <Text style={styles.activityEmoji}> {item.emoji} </Text>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}> {item.title} </Text>
                  <Text> {moment(item.startTime).fromNow()} </Text>
                </View>
              </View>
            )}
          />
        </View>

        <MapView
          style={styles.map}
          mapType="standard"
          showsUserLocation={true}
          showsCompass={true}
          showsPointsOfInterest={true}
          showsMyLocationButton={true}
          toolbarEnabled={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          followsUserLocation={true}
        >
          {/* Information for each marker is used to create them (Child of MapView) */}
          {this.state.markers.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            >
              {/* This is a custom view to show an emoji and its BG (Child of MapView.Marker) */}
              <View style={styles.markerBG}>
                <Text style={styles.markerEmoji}>
                  {emoji.get(marker.image)}
                </Text>
              </View>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "space-between",
    flexDirection: "column",
  },

  buttonContainer: {
    flexDirection: "row",

    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    //position: "absolute",
    //height: deviceHeight,
    //width: deviceWidth,
    zIndex: -1,
  },

  listContainer: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },

  activityListElement: {
    margin: 5,
    paddingTop: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  },

  activityEmoji: {
    fontSize: 20
  },

  activityInfo: {
    marginLeft: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    width: deviceWidth - 100,
    paddingBottom: 5
  },

  activityTitle: {
    fontWeight: "bold",
  },

  activityTime: {
    fontSize: 9,
    fontWeight: "100"
  },

  markerBG: {
    backgroundColor: "rgba(52, 52, 52, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    height: 60,
    width: 60,
    padding: 5,
    borderRadius: 30,
  },

  markerEmoji: {
    fontSize: 30,
    color: "black",
  },

  button: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize,
    borderColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },

  buttonImage: {
    borderWidth: 1,
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize,
  },

  image: {
    height: 50,
    width: 50,
  },

  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },

  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  }

});

