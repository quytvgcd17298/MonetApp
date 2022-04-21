
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Home from "./Screens/Home"; 

import MyWallet from './Screens/MyWallet'
import CreateNew from "./Screens/CreateNew"; 
import Analysis from "./Screens/Analysis"; 
import More from "./Screens/More";
import EditPage from "./Screens/EditPage"

import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

import  EditProfileScreen from "./Screens/EditProfileScreen"
import { HistoryItem } from "./Screens/HistoryItem";
import  DetailItem  from "./Screens/DetailItem";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator
      initialRouteName="Login"
      /* screenOptions={{
      headerStyle: {
        backgroundColor:"white"
      },
      headerTransparent:false,
      headerTintColor: "black",
      headerBackTitle: "Back",
    }} */>
     <Stack.Screen name = "Login" component = {Login}/>
     <Stack.Screen name = "Register" component = {Register}/>
     <Stack.Screen name = "Monet" component = {TabNavigator}
     options = {{
        headerShown:false }}
     />
      <Stack.Screen name = "HistoryItem" component={HistoryItem}
      options = {{
      headerShown:false }}>
      </Stack.Screen>
      <Stack.Screen name = "EditPage" component={EditPage}
      options = {{
      headerShown:false }}>
      </Stack.Screen>
      <Stack.Screen name = "DetailItem" component={DetailItem}
      options = {{
      headerShown:false }}>
      </Stack.Screen>
      <Stack.Screen name = "EditProfileScreen" component={EditProfileScreen}
      options = {{
      headerShown:false }}>
      </Stack.Screen>
     </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions = {{
        headerShown: false,
        tabBarStyle: {
          position:"relative",
          left:30,
          bottom:5,
          width:350,
          elevation:0,
          backgroundColor:"#ffffff",
          borderRadius:20,
          height:60,
          ...styles.shadow
        },
    }}>
    <Tab.Screen name="Home" component={Home} options = {{
      tabBarIcon:({focused}) => {
        {
          return (
           <Entypo name="home" size={24} color= {focused? "green" : "black"} />
          );
        }}
    }}/>
    <Tab.Screen name="Wallet" component={MyWallet} options = {{
      tabBarIcon:({focused}) => {
        {
          return (
            <FontAwesome5 name="wallet" size={24} color={focused? "green" : "black"} />
            );
        }}
      }}/>
    <Tab.Screen name="Create New" component={CreateNew} options = {{
      tabBarIcon:({focused}) => {
        {
          return (
           <AntDesign name="pluscircle" size={40} color= {focused? "green" : "black"} />
          );
        }}
       }}/>
    <Tab.Screen name="Analysis" component={Analysis} options = {{
      tabBarIcon:({focused}) => {
        {
          return (
            <Entypo name="bar-graph" size={24} color={focused? "green" : "black"} />
            );
        }}
      }}/>
    <Tab.Screen name="More" component={More} options = {{
      tabBarIcon:({focused}) => {
        {
          return (
            <Feather name="more-horizontal" size={24} color={focused? "green" : "black"} />
            );
        }}
      }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor:'#7F5DF0',
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  }
})
