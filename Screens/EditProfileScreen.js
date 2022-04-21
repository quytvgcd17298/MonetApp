import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert,
    TextInput
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { db, auth } from '../data/FirebaseConfig';
  import { collection, doc, getDocs, setDoc } from "firebase/firestore";
  import Icons from "@expo/vector-icons/Ionicons";
  
  const { width } = Dimensions.get("window");
  
  const EditProfileScreen = ({ route, navigation }) => {
    const { profile } = route.params || {};
    const [info, setInfo] = useState([]);
    const [username, setUserName] = useState(profile?.username);
    const [address, setAddress] = useState(profile?.address);
    const [phone, setPhone] = useState(profile?.phone);
    useEffect(async () => {
      const querySnapshot = await getDocs(collection(db, "UserInformation"));
      let data = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data()?.uid === auth.currentUser.uid) {
          data.push({ id: doc.id, ...doc.data() });
        }
      });
      setInfo(data);
    }, []);
  
    // console.log("info", info);
    return (
      <View style={[styles.stl, { paddingTop: 30 }]}>
        <View
        style={[styles.container, { backgroundColor: "orange"}]}
        >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={24} color={"#fff"} />
        </TouchableOpacity>
        <Text style={styles.title}>EDIT PROFILE</Text>
      </View>
        <ScrollView>
          <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
            <TextInput
              placeholder={"Username"}
              style={{
                borderWidth: 1,
                borderColor: "#9DA3AF",
                borderRadius: 4,
                paddingHorizontal: 12,
              }}
              value={username}
              label="Username"
              onChangeText={(text) => setUserName(text)}
            />
            <View style={{ height: 10 }} />
            <TextInput
              placeholder={"Address"}
              style={{
                borderWidth: 1,
                borderColor: "#9DA3AF",
                borderRadius: 4,
                paddingHorizontal: 12,
              }}
              value={address}
              label="Address"
              onChangeText={(text) => setAddress(text)}
            />
            <View style={{ height: 10 }} />
            <TextInput
              placeholder={"Phone"}
              style={{
                borderWidth: 1,
                borderColor: "#9DA3AF",
                borderRadius: 4,
                paddingHorizontal: 12,
              }}
              value={phone}
              label="Phone"
              onChangeText={(text) => setPhone(text)}
            />
            <TouchableOpacity
              style={{
                  marginVertical:40,
                  height:50,
                  width:"100%",
                  borderWidth:1,
                  backgroundColor:'gray',
                  alignItems:'center',
                  justifyContent:'center',
                  borderRadius:5

              }}
              onPress={() => {
                const reference = doc(db, "UserInformation", profile.id);
                setDoc(reference, {
                  address: address,
                  phone,
                  uid: auth.currentUser.uid,
                  username,
                  email: auth.currentUser.email,
                })
                  .then(() => {
                    Alert.alert(
                      "Success",
                      "Congratulations on your successful save",
                      [
                        {
                          text: "OK",
                          onPress: () =>
                            navigation.navigate("More"),
                        },
                      ]
                    );
                  })
                  .catch((error) => {
                    console.log({ error: error });
                  });
              }}
            ><Text style ={{textAlign:'center', fontWeight:'bold'}}>SAVE</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default EditProfileScreen;
  
  const styles = StyleSheet.create({
    stl: {
        flex:1
    },
    container: {
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
      },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
  });