import React, { useState } from 'react'
import {
   Image, 
   SafeAreaView,
   View, 
   Text, 
   StyleSheet, 
   TextInput, 
   TouchableWithoutFeedback,
   KeyboardAvoidingView, 
   Keyboard,
   TouchableOpacity
  } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../data/FirebaseConfig';

const Register = ({navigation}) => {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const registerUser =() => {
    if ( email === "") {
      alert("Please enter your email")
    }
    else if ( password === "") {
      alert("Please enter your password")
    } else {
      createUserWithEmailAndPassword(authentication, email, password)
      .then((re) =>{
        console.log(re);
      })
      .catch((re)=>{
        console.log(re)
        alert("Invalid email or password")
      })
    }
  }
 
  const loginNavigation = () => {
    navigation.navigate("Login")
  };

  return (
    <SafeAreaView style = {styles.container}>
      <KeyboardAvoidingView
      behavior='padding'
      style = {styles.keyContainer}
      >
      <TouchableWithoutFeedback
      style = {styles.container}
      onPress = {Keyboard.dismiss}>
      <View style = {styles.logoContainer}>
      <View
      style = {styles.logoContainer}>
        <Image
        style = {styles.logo}
        source = {require('../images/2.png')}></Image>
      </View>
      <Text
      style = {styles.title}>Sign Up</Text>
      <View>

        <TextInput
        style = {styles.input}
        placeholder = {"Enter your email"}
        value = {email}
        onChangeText={(value) => setEmail(value)}
        >
        </TextInput>
        <TextInput
        style = {styles.input}
        placeholder = {"Enter your password"}
        value = {password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry = {true}>
        </TextInput>
        <TouchableOpacity
        style = {styles.buttonContainer}
        onPress = {registerUser}
        >
          <Text
          style = {styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style = {{  
          backgroundColor:'white',
          margin:50,
        }}
        onPress = {loginNavigation}
        >
          <Text
          style = {{
            justifyContent:"center",
            textAlign:"center",
            fontSize:15,
            color:"black",
          }}>Have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection:'column',
    alignContent:'center',
    justifyContent:'center'
  },
  keyContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection:'column'
  },
  input:{
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "black",
    width: 350,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:5,
},
title:{
  color: "black",
  fontSize: 30,
  textTransform: "uppercase",
  fontWeight:"bold",
},
logoContainer:{
  paddingTop:20,
  alignItems: 'center',
  justifyContent: 'center',
},
logo:{
  width:128,
  height:128,
},
buttonContainer:{
  backgroundColor:'#f7c744',
  paddingVertical: 15,
  borderRadius:5
},
buttonText:{
  textAlign:"center",
  fontWeight:"bold",
  fontSize:20,
  color:"black"
}

});
export default Register;