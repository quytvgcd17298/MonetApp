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
   Keyboard, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../data/FirebaseConfig';

import Icon from 'react-native-vector-icons/AntDesign'

const Login = ({navigation}) => {
  const[isSignedIn, setIsSignedIn] = useState(false);
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const loginHandlle =() => {
    if ( email === "") {
      alert("Please enter your email")
    }
    else if ( password === "") {
      alert("Please enter your password")
    } else {
      signInWithEmailAndPassword(authentication, email, password)
      .then((re) =>{
        setIsSignedIn(true);
        navigation.navigate("Monet");
      })
      .catch((re)=>{
        console.log(re)
        alert("Invalid email or password")
      })
    }
  }

  const registerNavigation = () => {
    navigation.navigate("Register")
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
        source = {require('../images/1.png')}></Image>
      </View>
      <Text
      style = {styles.title}>Sign In</Text>
      <View>
        <TextInput
        style = {styles.input}
        placeholder = {"Enter your email"}
        placeholderTextColor = {"rgba(255,255,255,0.2)"}
        value = {email}
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
        returnKeyType='next'
        autoCorrect={true}
        >
        </TextInput>
        <TextInput
        style = {styles.input}
        placeholder = {"Enter your password"}
        placeholderTextColor = {"rgba(255,255,255,0.2)"}
        value = {password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry = {true}>
        </TextInput>
        <TouchableOpacity
        style = {{  
          backgroundColor:'rgb(32,53,70)',
          marginBottom:20,
          
        }}
        onPress = {registerNavigation}
        >
          <Text
          style = {{
            textAlign:"center",
            fontSize:15,
            color:"white",
          }}>Dont have an account? Sign Up</Text>
        
        </TouchableOpacity>
        <Text
        style = {{
          textAlign:"center",
          fontWeight:"bold",
          fontSize:20,
          color: "white",
        }}>---OR---</Text>
        <Text
        style = {{
          textAlign:"center",
          fontWeight:"bold",
          fontSize:20,
          color: "white",
        }}>Sign In With</Text>
        <View
        style = {{
          flexDirection:"row",
          alignItems:"center",
          justifyContent:"center",
          paddingVertical:20
        }}>
        <TouchableOpacity>
        <Icon name="facebook-square" color="#eee" size={40} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Icon name="google" color="#eee" size={40} />
        </TouchableOpacity>
        </View>
        <TouchableOpacity
        style = {styles.buttonContainer}
        onPress = {loginHandlle}
        >
          <Text
          style = {styles.buttonText}>Login</Text>
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
    backgroundColor: 'rgb(32,53,70)',
    flexDirection:'column',
    alignContent:'center',
    justifyContent:'center'
  },
  keyContainer: {
    flex: 1,
    backgroundColor: 'rgb(32,53,70)',
    flexDirection:'column'
  },
  input:{
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "white",
    width: 350,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:5,
},
title:{
  color: "white",
  fontSize: 30,
  textTransform: "uppercase",
  fontWeight:"bold",
},
logoContainer:{
  paddingTop:40,
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
  borderRadius:5,
},
buttonText:{
  textAlign:"center",
  fontWeight:"bold",
  fontSize:20,
}

});
export default Login;