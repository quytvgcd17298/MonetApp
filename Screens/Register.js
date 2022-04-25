import React, { useState } from 'react'
import {
   Image, 
   SafeAreaView,
   ScrollView,
   View, 
   Text, 
   StyleSheet, 
   TextInput, 
   TouchableWithoutFeedback,
   KeyboardAvoidingView, 
   Keyboard,
   TouchableOpacity
  } from 'react-native';

import { signupSchema } from '../Validation/signupValidation'
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import TextAuthForm from '../components/TextAuthForm';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc } from "firebase/firestore";
import { auth, db } from '../data/FirebaseConfig'
import ButtonCustom from '../components/ButtonCustom';


const Register = ({navigation}) => {
  const[isLoadingSignUp, setIsLoadingSignUp] = useState(false);

/*   const registerUser =() => {
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
  } */

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = handleSubmit(
    ({ email, password, address, phone, username }) => {
      Keyboard.dismiss();
      setIsLoadingSignUp(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          const reference = collection(db, "UserInformation");

          addDoc(reference, {
            username,
            address,
            phone,
            email,
            uid: auth.currentUser.uid,
          });
          setIsLoadingSignUp(false);
           setTimeout(() => {
          navigation.navigate("Login");
         }, 500);
        })
        .catch((error) => {
          setIsLoadingSignUp(false);

          console.log(error);
        });
    }
  );
 
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
      <ScrollView>
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
      <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextAuthForm
                style={{
                  marginVertical: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderColor: "#A5A5A5",
                }}
                placeholder="User name"
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.username?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextAuthForm
                style={{
                  marginVertical: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderColor: "#A5A5A5",
                }}
                keyboardType="email-address"
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.email?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextAuthForm
                style={{
                  marginVertical: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderColor: "#A5A5A5",
                }}
                placeholder="Phone"
                keyboardType="phone-pad"
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.phone?.message}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextAuthForm
                style={{
                  marginVertical: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderColor: "#A5A5A5",
                }}
                placeholder="Address"
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.address?.message}
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
                }}
                issecure={true}
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.password?.message}
              />
            )}
          />

          <Controller
            name="passwordConfirmation"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextAuthForm
                style={{
                  marginVertical: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderColor: "#A5A5A5",
                }}
                issecure={true}
                placeholder="Password Confirmation"
                value={value}
                onChangeText={onChange}
                onSubmitEditing={onSubmit}
                errorMessage={errors?.passwordConfirmation?.message}
              />
            )}
          />
        <ButtonCustom
            backgroundColor={'#f7c744'}
            title="Sign Up"
            onPress={onSubmit}
            isLoading={isLoadingSignUp}
            disabled={isLoadingSignUp}
        />
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
      </ScrollView>
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
    margin: 5,
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