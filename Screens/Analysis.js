import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { db, auth } from '../data/FirebaseConfig';
import { collection, getDocs, where } from "firebase/firestore";
import Icons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";


const Analysis = ({navigation}) => {

  const [info, setInfo] = useState([]);
  const isFocused = useIsFocused();

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "UserInformation"));
    let data = [];
    querySnapshot.forEach((doc) => {
      if (doc.data()?.uid === auth.currentUser.uid) {
        data.push({ id: doc.id, ...doc.data() });
      }
    });
    setInfo(data);
  }, [isFocused]);
  function renderNavBar() {
    return(
      <View
        style={{
          flexDirection:"row",
          height:80,
          justifyContent:"space-around",
          alignItems:"flex-end",
          marginVertical:20,
          marginHorizontal:20,
          borderBottomWidth:3
        }}
      >
        <Image
          style={{ width: 65, height: 65, borderRadius: 90 }}
          resizeMode="contain"
          source={{
            uri: auth?.currentUser?.photoURL
              ? `${auth.currentUser.photoURL}?type=large`
              : "https://freesvg.org/img/myAvatar.png",
          }}
        />
        <View
          style={{
            paddingLeft: 30,
            paddingTop: 10,
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {info[0]?.username}
          </Text>
          <View style={{ height: 5 }} />
          <Text>Email: {info[0]?.email}</Text>
          <View style={{ height: 5 }} />
          <Text>Phone Number: {info[0]?.phone}</Text>
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
        onPress={()=>{navigation.navigate("HistoryItem")}}
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
        }}
        onPress={() =>
          {navigation.navigate("EditProfileScreen",{
            profile: info[0],
          })}
        }>
        <Ionicons name="person" size={30} color="black" /> 
        <Text>EDIT PERSONAL INFORMATION</Text>
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
        onPress={()=>{navigation.navigate("Spending")}}
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
        }}
        onPress={()=>{navigation.navigate("Revenue")}}>
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
        <AntDesign name="piechart" size={30} color="orange" /> 
        <Text>REVENUE AND EXPENDITURE</Text> 
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