import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from '../data/FirebaseConfig';
import { collection, getDocs, where } from "firebase/firestore";
import Icons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";

const More = ({navigation}) => {
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

  return (
    <ScrollView style={[styles.container, { paddingTop:50 }]}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ width: 90, height: 90, borderRadius: 90 }}
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
        <TouchableOpacity
          onPress={() =>
            {navigation.navigate("EditProfileScreen",{
              profile: info[0],
            })}
          }
        >
          <Icons name="create-outline" size={24} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
      onPress={() => {
        navigation.navigate("Login");
      }}
      style={{
      height:40, 
      width:'100%',
      marginVertical:30,
      backgroundColor:'#D7D7D7',
      borderWidth:1,
      borderRadius:5,
      alignItems:'center',
      justifyContent:'center'
    }}
      >
        <Text>Log Out</Text>
      </TouchableOpacity> 
    </ScrollView>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
});