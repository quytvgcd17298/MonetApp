import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const MyWallet = () => {


  function renderNavBar() {
    return(
      <View
        style={{
          flexDirection:"row",
          height:60,
          justifyContent:"space-between",
          alignItems:'flex-end',
          paddingHorizontal:15,
          backgroundColor:'#02F08C'
        }}
      >
        <TouchableOpacity>
        <Ionicons  name="arrow-back-outline" size={30} color= "black"/>
        </TouchableOpacity>
        <Text
        style={{
          fontSize:26,
          marginBottom:5,
          textTransform:"uppercase",
          fontWeight:'bold'
        }}
        >My Wallet</Text>
        <TouchableOpacity>
        <MaterialIcons name="date-range" size={30} color="black" />
        </TouchableOpacity>
      </View>
    )
  } 

  return (
    <View>
        {renderNavBar()}
        <View
        style={styles.stl}>
          <Text
          style={{
            fontSize:18
          }}
          >Total money in wallet:</Text>
          <Text>80.00$</Text>
        </View>
        <View
        style={styles.stlA}
        >
          <Entypo name="wallet" size={40} color="black" style={{
            marginVertical:15,
            paddingLeft:30
          }} />
          <Text
          style={{
            fontSize:26,
            fontStyle:'italic',
            fontWeight:'bold',
            marginLeft:20,
            marginTop:20
          }}
          >Cash Wallet</Text>
          <Text
          style={{
            fontSize:30,
            marginTop:70,
            marginLeft:40
          }}
          >80.00$</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  stl:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#D7D7D7",
    height:60
  },
  stlA:{
    flexDirection:'row',
    justifyContent:"flex-start",
    alignItems:'flex-start',
    backgroundColor:'#9AF9D1',
    marginTop:30,
    height:150
  }
})
export default MyWallet;