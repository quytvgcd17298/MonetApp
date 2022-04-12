import React, { useState } from 'react'
import {
   Image, 
   SafeAreaView,
   View, 
   Text, 
   StyleSheet, 
   TextInput,
   ScrollView, 
   TouchableWithoutFeedback,
   KeyboardAvoidingView, 
   Keyboard, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../data/FirebaseConfig';
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Validation/loginValidation";

import TextAuthForm from '../components/TextAuthForm';

import Icon from 'react-native-vector-icons/AntDesign'

const Login = ({navigation}) => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
/*   const[email, setEmail] = useState("");
  const[password, setPassword] = useState(""); */

  /* const loginHandlle =() => {
    if ( email === "") {
      alert("Please enter your email")
    }
    else if ( password === "") {
      alert("Please enter your password")
    } else {
      signInWithEmailAndPassword(auth, email, password)
      .then((re) =>{
        setIsSignedIn(true);
        navigation.navigate("Monet");
      })
      .catch((re)=>{
        console.log(re)
        alert("Invalid email or password")
      })
    }
  } */

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = handleSubmit(({ email, password }) => {
    Keyboard.dismiss();
    setIsLoadingLogin(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoadingLogin(false);
        setTimeout(() => {
          navigation.navigate("Monet");
        }, 500);
      })
      .catch((error) => {
        setIsLoadingLogin(false);

        console.log(error);
      });
  });

  const registerNavigation = () => {
    navigation.navigate("Register")
  };

  return (
    <SafeAreaView style = {styles.container}>
      <ScrollView>
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
      <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextAuthForm
                style={{
                  textColor:'white',
                  marginVertical: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderColor: "#A5A5A5",
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                keyboardType="email-address"
                placeholder="Email"
                returnKeyType="next"
                placeholderTextColor={"rgba(255,255,255,0.2)"}
                onChangeText={onChange}
                value={value}
                errorMessage={errors?.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextAuthForm
                style={{
                  marginVertical: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderColor: "#A5A5A5",
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                issecure
                placeholder="Password"
                returnKeyType="done"
                placeholderTextColor={"rgba(255,255,255,0.2)"}
                errorMessage={errors?.password?.message}
                value={value}
                onSubmitEditing={onSubmit}
                onChangeText={onChange}
              />
            )}
          />
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
        onPress={onSubmit}
        isLoading={isLoadingLogin}
        disabled={isLoadingLogin}
        >
          <Text
          style = {styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32,53,70)',
    flexDirection:'column',
    alignContent:'center',
    justifyContent:'center',

  },
  keyContainer: {
    flex: 1,
    backgroundColor: 'rgb(32,53,70)',
    flexDirection:'column',

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