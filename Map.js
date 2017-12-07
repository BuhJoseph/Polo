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
  Dimensions,
  Alert
} from "react-native";
import MapView from "react-native-maps";
import Modal from "react-native-modal";
import { StackNavigator } from "react-navigation";
import emoji from "node-emoji";
import Hosting from "./Hosting.js";
import renderIf from "./renderIf";
import moment from "moment";
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {expEmail} from './signUpScreen.js'
import {logInEmail} from './logInScreen.js'
import Icon from "react-native-vector-icons/Feather";
import activityActions from './db_actions/activities_actions';
import Directions from "./Directions.js";
import Share, { ShareSheet } from "react-native-share";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
var email;

var activityDetails = require('./db_actions/activities_actions');


const {width, height} = Dimensions.get('window');
circleSize = Math.round(width/7)

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

var emojiArr = [
  "basketball",
  "books",
  "hamburger",
  "snow_capped_mountain",
  "shopping_bags",
  "snowflake",
  "video_game",
  "tada",
  "weight_lifter",
]

const LATITUDE = 32.8804;
const LONGITUDE = -117.2375;
const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.006;

console.disableYellowBox = true;

var MOCKED_EVENT_DATA = [
  {
    title: "Soccer",
    emoji: "🐶",
    startTime: "12:00",
    description:
      "The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Get ready... Start!"
  }
];
var reportFlag = false;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      isActivityModalVisible: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

      activities: []

    }; // end of this.state
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    email = expEmail + logInEmail;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: 32.8803,//position.coords.latitude,
            longitude: -117.241,//position.coords.longitude,
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

  // called before screen is loaded
  componentWillMount() {
    activityActions.getActivities().then(data => {
      this.setState({activities: data});
      console.log(this.state.activities);
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({
      region
    });
  }

  get() {
    activityActions.getActivities((acts) => {
      console.log(acts);
    })
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

  _renderMap = () => (
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
    >
      {/* Information for each marker is used to create them (Child of MapView) */}
      {this.state.activities.map((marker) => (
        <MapView.Marker
          key={marker.hostEmail}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
          onPress={() => this.setState({isActivityModalVisible: !this.state.isActivityModalVisible})}
        >
          {/* This is a custom view to show an emoji and its BG (Child of MapView.Marker) */}
          <View style={styles.markerBG}>
            <Text style={styles.markerEmoji}>
              {emoji.get(emojiArr[marker.category - 1])}
            </Text>
          </View>
        </MapView.Marker>
      ))}
    </MapView>
  );


  _showModal = () => this.setState({ isActivityModalVisible: true });
  _hideModal = () => this.setState({ isActivityModalVisible: false });
  render() {
    //{ this.get() }
    var event = MOCKED_EVENT_DATA[0];
    let shareOptions = {
      title: "Lil Pump-Gucci Gang",
      message: "Look at what I'm doing on Polo!",
      url: "https://www.youtube.com/watch?v=4LfJnj66HVQ",
      subject: "Share Link"
    };
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={() => this.activityCreation()}
          >
            <Text style = {{fontWeight: "bold", fontSize: 24}}> + </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRight}
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

        {renderIf(this.state.status)(<Hosting />)}


        <View style={styles.modalContainer}>
        <Modal
          isVisible={this.state.isActivityModalVisible}
          backdropOpacity={0}
          style={styles.bottomModal}
        >

          <View style={styles.modalContentContainer}>
            <View style={styles.row}>
              <Text style={styles.titleText}> {event.emoji} </Text>
              <View style={styles.column}>
                <Text style={styles.titleText}>{event.title}</Text>
                <Text style={styles.miniText}>Start time:{event.startTime}</Text>
              </View>
              <Text> </Text>
              <Image
                source={{
                  uri:
                    "https://cdn1.thr.com/sites/default/files/imagecache/scale_crop_768_433/2017/08/110129_0773b2_-_h_2017.jpg"
                }}
                style={styles.attendeePhotos}
              />
              <Image
                source={{
                  uri:
                    "http://cdn.skim.gs/image/upload/c_fill,dpr_1.0,f_auto,fl_lossy,q_auto,w_940/c_scale,w_640/v1463693334/Cydney-Gillon-cast-survivor-kaoh-rong-season-32-cbs_hn1y3n.jpg"
                }}
                style={styles.attendeePhotos}
              />
              <Image
                source={{
                  uri:
                    "http://wwwimage1.cbsstatic.com/base/files/cast/surv33_cast_hannahshapiro.jpg"
                }}
                style={styles.attendeePhotos}
              />
              <Image
                source={{
                  uri:
                    "http://wwwimage2.cbsstatic.com/base/files/cast/surv28_cast_sarah.jpg"
                }}
                style={styles.attendeePhotos}
              />
            </View>
            <View style={styles.row}>
              <Directions />
              <TouchableOpacity
                style={styles.roundButton}
              >
                  <Text style={styles.joinText}>Join Activity</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.descriptionText}>{event.description}</Text>
            </View>
            <View style={styles.row}>
              <Icon
                name="upload"
                size={25}
                color="#058EFA"
                onPress={() => {
                  Share.open(shareOptions);
                }}
              />
              <Text style={{ flex: 1 }}> </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={this._hideModal}
              >
                <Text style={styles.closeText}>X</Text>
              </TouchableOpacity>
              <Text style={{ flex: 1 }}> </Text>
              <Icon
                name="flag"
                size={25}
                color="#058EFA"
                onPress={() => {
                  if (!reportFlag) {
                    Alert.alert(
                      "Report Event",
                      "Are you sure you would like to report this event?",
                      [
                        {
                          text: "Flag this Activity",
                          onPress: () => {
                            reportFlag = true;
                            Alert.alert(
                              "Event Reported",
                              "Your report has been submitted.",
                              [{ text: "OK" }],
                              { cancelable: false }
                            );
                          }
                        },
                      { text: "Cancel" }
                      ],
                    { cancelable: false }
                    );
                  } else {
                    Alert.alert(
                      "Event Reported",
                      "Your report has been submitted.",
                      [{ text: "OK" }],
                      { cancelable: false }
                    );
                  }
                  }
                }
              />
            </View>
          </View>
        </Modal>
      </View>

        <View style={styles.listContainer}>
          <FlatList
            data={this.state.activities}
            renderItem={({ item }) => (
              <View style={styles.activityListElement}>
                <Text style={styles.activityEmoji}> {emoji.get(emojiArr[item.category - 1])} </Text>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}> {item.title} </Text>
                  <Text> {moment(item.startTime).fromNow()} </Text>
                </View>
              </View>
            )}
          />
        </View>

        {this._renderMap()}
        
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
    //position: "absolute",
    //top: 0,
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,

    ...ifIphoneX({
      paddingTop: 40
    }, {
      paddingTop: 20,
    })
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },

  listContainer: {
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: deviceWidth,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    ...ifIphoneX({
      paddingBottom: 30
    }, {
      paddingBottom: 10,
    })
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

  buttonLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",

    width: circleSize,
    height: circleSize,
    borderRadius: circleSize,
    borderColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  buttonRight: {
      position: "absolute",
      top: 0,
      right: 0,
      borderWidth: 1,
      margin: 10,
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

  modalContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    padding: 10,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    width: 40
  },
  titleText: {
    fontSize: 24,
    padding: 0,
    margin: 0
  },
  descriptionText: {
    fontSize: 14,
    padding: 6,
    margin: 0
  },
  miniText: {
    fontSize: 12,
    padding: 0,
    margin: 0
  },
  bottomModal: {
    justifyContent: "flex-end",
    padding: 0,
    margin: 0
  },
  modalContentContainer: {
    alignSelf: "center",
    alignItems: "center",
    height: 200,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    margin: 0
  },
  roundButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 35,
    width: 165,
    alignItems: 'center',
    borderColor: '#058EFA',
    borderWidth: 0.5,
  },
  joinText: {
    color: '#058EFA',
    paddingTop: 7.5,
  },
  closeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    borderColor: '#058EFA',
  },
  closeText: {
    color: '#058EFA',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export {email};

