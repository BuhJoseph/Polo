import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal'; //Need to npm install react-native-modal --save

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false
    }
  }

  _showModal = () => this.setState({ isModalVisible: true})
  _hideModal = () => this.setState({ isModalVisible: false})

  render() {
    return (
      <View style={styles.container}>
        <Button
            onPress={this._showModal}
            title="Activity Details"
            color = "black"
        />
        <Modal isVisible={this.state.isModalVisible} backdropOpacity={0} style={styles.bottomModal}>
          <View style={styles.modalContentContainer}>
            <View style={styles.row}>
              <Text style={styles.titleText}>Emoji</Text>
              <Text>     </Text>
              <Text style={styles.titleText}>Activity Title</Text>
            </View>
            <View style={styles.row}>
              <Button
                title="Get Directions"
                color="blue"
              />
              <Button
                title="Join Activity"
                color="black"
               />
            </View>
            <Text>Activity Details</Text>
            <Button
              title="Close"
              color="black"
              onPress={this._hideModal}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 50,
  },
  titleText:{
    fontSize: 24,
  },
  bottomModal:{
    justifyContent: 'flex-end',
  },
  modalContentContainer: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    height: 200,
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'white',
  },

});
 
