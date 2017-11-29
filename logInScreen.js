import React from 'react';
import { Dimensions, Button, StyleSheet, Text, View, TextInput, Image} from 'react-native';
import renderIf from './renderIf';

//-1 represents empty values
name = -1;
phoneNum = -1;
email = -1;
password = -1;

//for testing
dbphoneNum = 123;
dbpassword = 123;

//for sizing
const {width, height} = Dimensions.get('window');

export default class LogIn extends React.Component {
  constructor(){
    super();
    this.state ={
      status:false
    }
  }

  checkInfo(){
    //check if phoneNum, password pair exists in db
    x = (phoneNum==dbphoneNum && password==dbpassword);

    //prompt incorrect email or password accordingly
    this.setState({status: !x});

    //log in successful, open the map
    if(x){
      this.props.navigation.navigate('HomeScreen')
    }
  }

  render() {
    return (   
      <View style = {styles.container}>
        <Text style = {{flex: 1}}></Text>
	
	<Image 
	   style = {{width: 165, height: 108}} 
	   source = {require('./resources/polo_logo.png')}
	/>
	
	<View style = {{flex: 1}}>
	  <Text style = {{flex: 1}}></Text>
          {renderIf(this.state.status)(<Text style = {{height: 20, color: 'red', fontSize: 15}}>Incorrect Phone # or Password</Text>)}
	  <Text style = {{flex: 1}}></Text>
   	</View>
          
	<View style = {{flex: 2, width: Math.round(width*.66)}}>	
	  <TextInput style = {{flex:1, fontSize: 25}}
	     placeholder = "Phone #"
	     onEndEditing ={(event) => phoneNum = event.nativeEvent.text}
	  />

	  <TextInput style = {{flex: 1, fontSize: 25}}
	     placeholder = "Password"
	     onEndEditing ={(event) => password = event.nativeEvent.text}
	  />
	  <Text style = {{flex: 1, height: Math.round(height*.05)}}></Text>
	</View>

	<View style = {styles.buttons}>
	  <Button
  	    onPress={()=>this.checkInfo()}
  	    title="Log In"
  	    color="#000"
	  />

	  <Text style = {{width: Math.floor(width*.2)}}> </Text>

	  <Button
      	    onPress={() => this.props.navigation.navigate('SignUpScreen')}
  	    title="Sign Up"
  	    color="#000"
	  />
	</View>

	<View style = {{flex: 3}}>
	  <Text style = {{height: Math.round(height*.085)}}></Text>
	  
	  <View style = {{flexDirection: 'row'}}>
	    <Image
	       style = {{width: 40, height: 40}}
	       source = {require('./resources/fb.png')}
	    />
	    <Button
	      style = {{height: 40}}
  	      onPress={contFb}
  	      title="Continue with Facebook"
  	      color="#3b5998"
	    />
	  </View>
	</View>

      </View>
      
 )}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});

contFb = () =>{
  //look for fb acc
  //check for matching fb acc in database
  //if there's a matching account log in the user
  //else make an acc for the user then log in the user
}

