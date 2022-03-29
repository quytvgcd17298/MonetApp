import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { db } from '../data/FirebaseConfig';
import { collection, getDocs, deleteDoc, query, orderBy, doc } from "firebase/firestore"

export  const HistoryItem = ( {navigation} ) => {
  const [monetData, setMonetData] = useState([]);
  const dataCollectionRef = collection(db, "Information");

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "Information", id);
    await deleteDoc(itemDoc);
    navigation.navigate("Monet");
  };

  useEffect(()=>{
    const getMonetData = async () => {
      const data = await getDocs(dataCollectionRef);
      setMonetData(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getMonetData();
  }, []);


/*   const detailPress= () =>{
    navigation.navigate("ItemInputDetail");
  };
 */
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
          <TouchableOpacity
          onPress={()=>{navigation.navigate("Monet")}}>
          <Ionicons  name="arrow-back-outline" size={30} color= "black"/>
          </TouchableOpacity>
          <Text
          style={{
            fontSize:30,
            marginBottom:5,
            fontWeight:'bold',
            textTransform:'uppercase',
            paddingRight:85
          }}
          >HISTORY ITEM</Text>
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
        }}></Text>
      </TouchableOpacity>
      </View>
    </View>
    )
  }
  
    return (
    <View
    style={{
      flex:1,
      backgroundColor:'#B3D3C2',
    }}
    >
      {renderNavBar()}
      <ScrollView>
       {monetData.map(( item ) => {
          return ( 
            <View>
              <View style={{flexDirection:'row', justifyContent:"space-between"}}>
              <Text style={{fontSize:20, padding:5, fontWeight:'bold', paddingLeft:25}}>{item.Amount}$</Text>
              <Text style={{fontSize:16, padding:5, paddingRight:25}}>{item.Date}</Text>
              </View>
              <View
              style={{
                height:500,
                width: "80%",
                borderWidth:0,
                marginHorizontal:40,
                marginVertical:30,
                borderTopWidth:1,
                borderLeftWidth:1,
              }}>
                <View style = {{flexDirection:'row', justifyContent:"space-between"}}>
                <TouchableOpacity>
                <Text style={{padding:10, fontSize:20, fontWeight:'bold'}}>Item: {item.Item}</Text>
                <Text style={{padding:10, fontSize:16,}}>Description: {item.Description}</Text>
                <Text style={{padding:10, fontSize:16,}}>Event: {item.Event}</Text>
                <Text style={{padding:10, fontSize:16,}}>Location: {item.Location}</Text>
                <Text style={{padding:10, fontSize:16,}}>With: {item.WithWho}</Text>
                </TouchableOpacity>
                <Text style={{padding:10, fontSize:20}}>{item.Amount}$</Text>
                </View>
                <View
              style={{flexDirection:"row",
              height:80,
              justifyContent:"space-between",
              alignItems:'flex-end',
              paddingHorizontal:20,}}>
              <TouchableOpacity style = {styles.button}>
                <Text
                style={{
                  color:'green',
                  fontWeight:'bold'
                }}
                onPress={()=> {navigation.navigate("EditPage")}}
                >EDIT</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress={()=>{deleteItem(item.id)}}>
                <Text
                style={{
                  color:'red',
                  fontWeight:'bold'
                }}>DELETE</Text>
              </TouchableOpacity>
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
