import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'

const Home = () => {
  return (
    <View
    style={styles.container}
    >
      <ScrollView>
        <View
        style={{
          justifyContent:'center',
          alignItems:'center',
          paddingTop:40
        }}>
        <Text
        style={{
          fontSize:40,
          color:'#02F08C',
          fontWeight:'bold',
        }}>MONET</Text>
        </View>
        <View
        style={styles.cashContainer}>
          <Text
          style={{
            fontWeight:"bold",
            fontSize:24,
            marginLeft:10,
            color:'white'
          }}>CASH:                             {"80.00$"}</Text>
          <Text
          style={{
            marginTop:30,
            marginLeft:10,
            fontWeight:"bold",
            color:"white"
          }}
          >My cash on hand</Text>
        </View>

          <View
          style={styles.analysContainer}
          >
            <Text
            style={{
              textAlign:'center',
              fontWeight:'bold',
              color:'white',
              fontSize:30
            }}
            >Revenue And Expenditure</Text>

          </View>

          <View
          style={styles.spendContainer}
          >
             <Text
            style={{
              textAlign:'center',
              fontWeight:'bold',
              color:'white',
              fontSize:30
            }}
            >Spending Analysis</Text>
          </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgb(32,53,70)',
    alignContent:'center',
    justifyContent:'center'
  },
  cashContainer:{
    backgroundColor:'#02F08C',
    height:100,
    marginHorizontal:15,
    borderRadius:10
    },
  analysContainer:{
    backgroundColor:'#F59A32',
    height:500,
    marginHorizontal:15,
    marginTop:10,
    borderRadius:10
  },
  spendContainer:{
    backgroundColor:'#D9001B',
    height:500,
    marginHorizontal:15,
    marginTop:10,
    borderRadius:10
  }
})
export default Home;