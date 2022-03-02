import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';




const Stack = createStackNavigator();

export default function App() {
  return (
<NavigationContainer>
     <Stack.Navigator>
     <Stack.Screen name = "Login" component = {Login}/>
     <Stack.Screen name = "Register" component = {Register}/>
     <Stack.Screen name = "Home" component = {Home}/>
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
