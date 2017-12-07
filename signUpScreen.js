import React from 'react';
import {KeyboardAvoidingView, Dimensions, Button, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import renderIf from './renderIf.js';
import useraction from './db_actions/users_actions';

//-1 represents empty values

//for sizing
const {width, height} = Dimensions.get('window');

var expEmail = -1;

export default class SignUp extends React.Component {
  
  constructor(){
    super();
    this.state ={
      status:false,
      name: "Name",
      email: "Email",
      phone: "Phone",
      password: "Password"
    }
  }
  /*
	checkEmail: checkEmail,
	checkPhone: checkPhone,
	addUser: addUser,
	getUser: getUser
  */
  checkInfo(){
    //check if email or phone# exist in the db
    var emailCheck;
    var phoneCheck;
    useraction.checkEmail(this.state.email).then(exist=>{
      if(!exist){
        useraction.checkPhone(this.state.phone).then(val=>{
          if(!val){
            console.log("ENTERING SIGN UP");
            useraction.addUser(this.state.name, this.state.email, this.state.phone, this.state.password).then(suc=>{});
            this.props.navigation.navigate("SignUpCompleteScreen");
          }else{
            phoneCheck = false;
          }
        });
      }else{
        emailCheck = false;
      }
      this.setState({status:emailCheck || phoneCheck});
    });
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {{height: Math.round(height*.025)}}></Text>	
	<Image 
	   style = {{width: 165, height: 108}} 
	   source = {require('./resources/polo_logo.png')}
	/>
	
	
	<View style = {{flex: 1}}>
          {renderIf(this.state.status)(<Text style = {{height: 20, color: 'red', fontSize: 15}}>Email or Phone # already in use.</Text>)}
	</View>
	
	<KeyboardAvoidingView style = {{flex: 5, width: Math.round(width*.6)}} behavior = "height">	
	  <TextInput style = {styles.input}
	     placeholder = "Name"
	     onChangeText = {event => this.setState({name: event})}
	  />

	  <TextInput style = {styles.input}
	     placeholder = "Email"
	     onChangeText = {event => {
        this.setState({email: event});
        expEmail = event;
      }
     }
	  />

	  <TextInput style = {styles.input}
	     placeholder = "Phone #"
	     onChangeText = {event => this.setState({phone: event})}	 
    />

	  <TextInput style = {styles.input}
	     placeholder = "Password"
         secureTextEntry = {true}
	     onChangeText = {event => this.setState({password: event})}
	  />
	  <Text style = {{flex: 1}}></Text>
	</KeyboardAvoidingView>

	<View style = {styles.buttons}>
	  <Button
  	    onPress={() => this.checkInfo()}
  	    title="Continue Sign Up"
  	    color="#000"
	  />
	</View>

	<Text style = {{flex: 2}}> </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    flex: 1,
    fontSize: 25
  },
});

export {expEmail};
