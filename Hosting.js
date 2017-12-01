import React from 'react';
import {Keyboard, TouchableHighlight,ScrollView, Button, Picker, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal'; //Need to npm install react-native-modal --save
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ModalSelector from 'react-native-modal-selector'


const {width, height} = Dimensions.get('window');

export default class Hosting extends React.Component {
    constructor(props){
        super(props);
        this.state =
        {
            isACVisible: true,
            isInputVisible: false,
            textInputValue: "",
            emoji: "",
            eventName: "",
            category: "",
            description:"",
            time:""

        };
    }
    _showModal = () => this.setState({ isACVisible: true});
    _hideModal = () => this.setState({ isModalVisible: false});

    render() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Categories' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries' },
            { key: index++, label: 'Pink Grapefruit' },
        ];

        return (
            <View style={styles.container}>

	    {/*don't need anymore<Button
                    style={{height: 50}}
                    onPress={this._showModal}
                    title="Host"
                    color = "black"
                />*/}
                <Modal isVisible={this.state.isACVisible} backdropOpacity={0} style={styles.bottomModal}
                       animationIn ="slideInUp" animationOut = "slideOutLeft" avoidKeyboard={true}>
                    <View style={styles.modalContentContainer}>

                        <GooglePlacesAutocomplete
                            placeholder='Where?'
                            minLength={2} // minimum length of text to search
                            autoFocus={false}
                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                            listViewDisplayed='auto'    // true/false/undefined
                            fetchDetails={true}
                            renderDescription={row => row.description} // custom description render
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                                this.setState({isInputVisible: true});
                                //Keyboard.dismiss();

                            }}

                            getDefaultValue={() => ''}

                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: 'AIzaSyAvWx1p36lAqWnIBsOMHJeW1MKF_98uYE8',
                                language: 'en', // language of the results
                                types: 'establishment' // default: 'geocode'
                            }}

                            styles={{
                                textInputContainer: {
                                    flexDirection: "row",
                                    width: '100%',
                                    alignItems:"center",
                                    backgroundColor: "#f9f7f7"
                                },
                                container:{

                                    backgroundColor: "#f9f7f7"

                                },
                                poweredContainer:{
                                    backgroundColor: "#f9f7f7",
                                    width: 0,
                                    height: 0

                                },
                                description: {
                                    fontWeight: 'bold'
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                }
                            }}

                            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                            currentLocationLabel="Current location"
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            GoogleReverseGeocodingQuery={{
                                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            }}
                            GooglePlacesSearchQuery={{
                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                rankby: 'distance',
                                types: 'food'
                            }}

                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.


                            /*renderLeftButton={()  => <Icon class="fa fa-search" aria-hidden="true"></Icon>}*/
                            renderRightButton={() =>
                                <Button
                                    style={{marginTop: 200}}
                                    onPress={() => this.setState({isACVisible: false, isInputVisible:false})}
                                    title="Cancel"
                                    color = "black"/>

                            }

                        />
                    </View>


                    <Modal isVisible={this.state.isInputVisible} avoidKeyboard={true} backdropOpacity={0} style={styles.bottomModal}
                           animationIn ="slideInRight" animationOut = "slideOutLeft">
                        <View style={styles.modalContentContainer}>
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                <Text style={styles.header}>Create your event</Text>
                                <Button
                                    onPress={() => this.setState({isInputVisible: false, isACVisible: false})}
                                    title="Cancel"
                                    color = "black"
                                />
                            </View>

                            <View style = {styles.firstRow}>
                                <TextInput style={styles.name}
                                           placeholder = "Name of Event"
                                           returnKeyType = 'done'
                                           onEndEditing ={(text) => this.setState({eventName: text})}
                                />
                                <TextInput style= {{flex: 1, backgroundColor: "#9effcb", textAlign: "center"}}
                                           placeholder = "emoji"
                                           returnKeyType = 'done'
                                           onEndEditing = {(text) => this.setState({emoji : text})}
                                />
                            </View>

                            <View style={styles.secondRow}>


                                <ModalSelector
                                    overlayStyle={{flex: 1, padding: '5%', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}
                                    style={styles.categories}
                                    data={data}
                                    initValue="Select something yummy!"
                                    supportedOrientations={['portrait']}
                                    onChange={(option)=>{ this.setState({textInputValue:option.label})}}>

                                    <TextInput
                                        style={{textAlign: "center"}}
                                        editable={false}
                                        placeholder="Select something yummy!"
                                        value={this.state.textInputValue} />

                                </ModalSelector>



                            </View>

                            <View style={styles.thirdRow}>
                                <TextInput style={styles.description}
                                           placeholder = "Event Description"
                                           returnKeyType = 'send'
                                           onChangeText ={(text) => this.setState({description: text})}
                                />
                            </View>

                            <View style={styles.fourthRow}>
                                <Picker
                                    style = {styles.picker}
                                    itemStyle = {styles.item}
                                    selectedValue={this.state.time}
                                    onValueChange={(itemValue, itemIndex) => this.setState({time: itemValue})}
                                    mode = 'dropdown'>
                                    <Picker.Item label="Now" value = "0"/>
                                    <Picker.Item label="In 1 Hour" value="1" />
                                    <Picker.Item label="In 2 Hours" value="2" />
                                    <Picker.Item label="In 3 Hours" value="3" />
                                    <Picker.Item label="In 4 Hours" value="4" />
                                    <Picker.Item label="In 5 Hours" value="5" />
                                </Picker>
                            </View>
                            <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
                                <Button onPress = {()=>{}} title="Create" style={styles.create}/>
                            </View>
                        </View>
                    </Modal>
                </Modal>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
	flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "white",
        alignItems: "center"

    },
    keyboardView:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    header: {
        fontSize: 30,
        color: "black",
        fontWeight: "bold",
        padding: 12
    },

    firstRow:{
        flexDirection: "row",
        backgroundColor: "#99baef"
    },
    secondRow:{
        flexDirection: "row",
        backgroundColor: "#8defea"
    },
    thirdRow:{
        flexDirection: "row",
        backgroundColor: "#9effcb"
    },
    fourthRow:{
        flexDirection: "row",
        backgroundColor: "#d2f4d7"

    },
    create:{
        backgroundColor: "#9effcb",
        padding: 6,
        borderColor: "#9effcb",
    },
    categories:{
        flex:1,
        padding:7,
        margin: 5
    },
    name: {
        flex: 4,
        textAlign: 'center',
        padding: 7,
        margin: 5
    },
    description:{
        textAlign: 'center',
        flex: 1,
        padding: 7,
        margin: 5
    },
    picker: {
        flex: 1,
        width: 100
    },
    item:{
        height: 100,
        fontSize: 19,
        borderColor: "#ffffff"
    },
    bottomModal:{
        justifyContent: 'flex-end',
        padding: 0,
        margin: 0,
        height: Dimensions.get('window').height * .5,
        width: Dimensions.get('window').width
    },

    modalContentContainer: {
        /*
        alignSelf: 'center',
        alignItems: 'center',
        height: height*.65,
        backgroundColor: "white",
        width: width,
        margin: 0,
        */

        height: Dimensions.get('window').height * .50,
        width: Dimensions.get('window').width,
        backgroundColor: 'white'
    }



});


