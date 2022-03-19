import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


const Analysis = () => {
  function renderNavBar() {
    return(
      <View
        style={{
          flexDirection:"row",
          height:80,
          justifyContent:"space-around",
          alignItems:"flex-end",
          paddingHorizontal:8,
          borderBottomWidth:3
        }}
      >
        <TouchableOpacity>
        <Ionicons name="person-circle" size={50} color="black" />        
        </TouchableOpacity>
        <View
        style={{
          flexDirection:'column'
        }}>
        <Text
        style={{
          fontSize:24,
          fontWeight:'400'
        }}
        >Wellcome: {"Quy Tran Van"}</Text>
        <Text
         style={{
          fontSize:18,
          marginBottom:5,
          fontWeight:'400'
         }}
        >{"Email: quytvgcd17298@fpt.edu.vn"}</Text>
        </View>
      </View>
    )
  } 
  return (
    <View style={{ flex: 1, backgroundColor:'lightGray'}}>
      <ScrollView>
      {renderNavBar()}
      <View
      style={{
        flexDirection:'row'
      }}>
        <TouchableOpacity
        style={{
          backgroundColor:"#D7D7D7",
          height:185,
          width:185,
          marginVertical:10,
          marginHorizontal:10,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10,
          borderWidth:2
        }}
        >
        <FontAwesome5 name="history" size={30} color="black" /> 
        <Text>HISTORY</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{
          backgroundColor:"#D7D7D7",
          height:185,
          width:185,
          marginVertical:10,
          marginHorizontal:10,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10,
          borderWidth:2
        }}>
        <AntDesign name="piechart" size={30} color="orange" /> 
        <Text>REVENUE AND EXPENDITURE</Text> 
        </TouchableOpacity>
      </View>
      <View
      style={{
        flexDirection:'row'
      }}>
        <TouchableOpacity
        style={{
          backgroundColor:"#D7D7D7",
          height:185,
          width:185,
          marginVertical:10,
          marginHorizontal:10,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10,
          borderWidth:2
        }}
        >
        <Ionicons name="ios-bar-chart-sharp" size={30} color="red" /> 
        <Text>SPENDING ANALYSIS</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{
          backgroundColor:"#D7D7D7",
          height:185,
          width:185,
          marginVertical:10,
          marginHorizontal:10,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10,
          borderWidth:2
        }}>
        <Ionicons name="ios-bar-chart-sharp" size={30} color="green" />
        <Text>REVENUE ANALYSIS</Text> 
        </TouchableOpacity>
      </View>
      <View
      style={{
        flexDirection:'row'
      }}>
        <TouchableOpacity
        style={{
          backgroundColor:"#D7D7D7",
          height:185,
          width:185,
          marginVertical:10,
          marginHorizontal:10,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10,
          borderWidth:2
        }}
        >
        <Ionicons name="person" size={30} color="black" /> 
        <Text>PERSONAL INFORMATION</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{
          backgroundColor:"#D7D7D7",
          height:185,
          width:185,
          marginVertical:10,
          marginHorizontal:10,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10,
          borderWidth:2
        }}>
        <FontAwesome name="sticky-note" size={30} color="lightblue" /> 
        <Text>NOTE</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  )
}
export default Analysis;