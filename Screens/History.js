/* import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import CurrencyInput from 'react-native-currency-input';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

import { db } from '../data/FirebaseConfig';
import { collection, getDocs } from "firebase/firestore"

export const History = () => {
  const [monetData, setMonetData] = useState([]);
  const dataCollectionRef = collection(db, "Information");

  useEffect(()=>{
    const getMonetData = async () => {
      const data = await getDocs (dataCollectionRef);
      setMonetData(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getMonetData();
  }, []);

  function renderNavBar() {
    return(
      <View>
      <View
          style={{
            flexDirection:"row",
            height:60,
            justifyContent:"space-between",
            alignItems:'flex-end',
            paddingHorizontal:15,
            backgroundColor:'#02F08C',
          }}
        >
          <TouchableOpacity>
          <Ionicons  name="arrow-back-outline" size={30} color= "black"/>
          </TouchableOpacity>
          <Text
          style={{
            fontSize:30,
            marginBottom:5,
            fontWeight:'bold',
            textTransform:'uppercase'
          }}
          >HISTORY</Text>
          <TouchableOpacity
          >
          <FontAwesome name="history" size={30} color="black" />          
          </TouchableOpacity>
        </View>
      <View
      style={{flexDirection:"row",
      height:80,
      justifyContent:"space-between",
      alignItems:'flex-end',
      paddingHorizontal:20,
      backgroundColor:'#02F08C'}}>
      <TouchableOpacity style = {styles.button}>
        <Text
        style={{
          color:'green',
          fontWeight:'bold'
        }}
        >{"REVENUE (green)"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.button}>
        <Text
        style={{
          color:'red',
          fontWeight:'bold'
        }}>{"EXPENDITURE (red)"}</Text>
      </TouchableOpacity>
      </View>
    </View>
    )
  }
  
    return (
    <View
    style={{
      flex:1,
      backgroundColor:'#02F08C',
    }}
    >
      {renderNavBar()}
      <ScrollView>
       {monetData.map((item) => {
          return ( 
            <View
            style={{
              backgroundColor:'#B3D3C2',
              height:200,
              width:'100%',
              marginTop:10
            }}>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
              <Text style={{fontSize:16, padding:5}}>20/10/2020</Text>
              <Text style={{fontSize:16, padding:5, paddingRight:25}}>{item.Amount}</Text>
              </View>
              <View
              style={{
                height:"60%",
                width: "80%",
                borderWidth:0,
                marginHorizontal:40,
                marginVertical:30,
                borderTopWidth:1,
                borderLeftWidth:1,
              }}>
                <View style = {{flexDirection:'row', justifyContent:"space-between"}}>
                <Text style={{padding:10, fontSize:20, fontWeight:'bold'}}>{item.Item}</Text>
                <Text style={{padding:10, fontSize:20, fontWeight:'bold'}}>{item.Amount}</Text>
                </View>              
              </View>
            </View>
           )
        })} 
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#02F08C',
    alignContent:'center',
    justifyContent:'center',
  },
  button:{
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    width:150,
    height:50,
    backgroundColor:'white',
    borderWidth:1,
    borderRadius:5,
    marginBottom:10
  },
  childContainer:{
    backgroundColor: '#B3D3C2',
  }
})
 */