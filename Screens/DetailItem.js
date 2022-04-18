import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Alert, TextInput } from "react-native";
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import RNPickerSelect from "react-native-picker-select";
import CurrencyInput from "react-native-currency-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import {
    collection,
    deleteDoc,
    deleteField,
    doc,
    getDocs,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import moment from "moment";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import { db } from '../data/FirebaseConfig'
  import uuid from "react-native-uuid";
  
  
  const dataEXPENDITURE = [
    {
      label: 'FOOD',
      value: 'FOOD',
  },
  {
      label: 'Breakfast',
      value: 'Breakfast',
  },
  {
      label: 'Lunch',
      value: 'Lunch',
  },
  {
      label: 'Dinner',
      value: 'Dinner',
  },
  {
      label: 'Coffee',
      value: 'Coffee',
  },
  {
      label: 'Restaurant',
      value: 'Restaurant',
  },
  {
      label: 'LIVING SERVICE',
      value: 'LIVING SERVICE',
  },
  {
      label: 'Electric',
      value: 'Electric',
  },
  {
      label: 'Telephone charges',
      value: 'Telephone charges',
  },
  {
      label: 'Gas',
      value: 'Gas',
  },
  {
      label: 'Water',
      value: 'Water',
  },
  {
      label: 'Internet',
      value: 'Internet',
  },
  {
      label: 'PERSONAL SERVICE',
      value: 'PERSONAL SERVICE',
  },
  {
      label: 'Clothes',
      value: 'Clothes',
  },
  {
      label: 'Accessory',
      value: 'Accessory',
  },
  {
      label: 'Girl friend',
      value: 'Girl friend',
  },
  {
      label: 'Party. Wedding, Birthday...',
      value: 'Party. Wedding, Birthday...',
  },
  {
      label: 'ENJOYMENT',
      value: 'ENJOYMENT',
  },
  {
      label: 'Shopping',
      value: 'Shoppuning',
  },
  {
      label: "Entertainment",
      value: "Entertainment",
  },
  {
      label: "Travel",
      value: "Travel",
  },
  {
      label: "Movie",
      value: "Movie",
  },
  {
      label: "Beautify",
      value: "Beautify",
  },
  {
      label: "MOVEMENT",
      value: "MOVEMENT",
  },
  {
      label: "Gasoline",
      value: "Gasoline",
  },
  {
      label: "Taxi",
      value: "Taxi",
  },
  {
      label: "Car repair and maintain",
      value: "Car repair and maintain",
  },
  {
      label: "Other",
      value: "Other",
  },
  {
      label: "HEALTHY",
      value: "HEALTHY",
  },
  {
      label: "Healthcare",
      value: "Healthcare",
  },
  {
      label: "Medicine",
      value: "Medicine",
  },
  {
      label: "Sport",
      value: "Sport",
  },
  ];
  const dataREVENUE  = [
    { label: "Monthly salary", value: "Salary" },
    { label: "Bonus", value: "Bonus" },
    { label: "Interest", value: "Interest" },
  ];
const DetailItem = ({ route , navigation }) => {

    const { history, idHistory } = route.params || {};
    const [category, setCategory] = useState(history?.category);
    const [genre, setGenre] = useState(history?.genre);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [isLoadingSave, setIsLoadingSave] = useState(false);
    const [description, setDescription] = useState(history?.description);
    const [totalMoney, setTotalMoney] = useState(history?.totalMoney);
    const [event, setEvent]= useState(history?.event);
    const [who, setWho]= useState(history?.withwho);
    const [location, setLocation]= useState(history?.location);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(history?.create_date);
    const [data, setData] = useState([]);
    const [image, setImage] = useState(history?.imageUrl);
  
    useEffect(async () => {
        const querySnapshot = await getDocs(collection(db, "Information"));
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setData(data);
        return () => {
          setData([]);
        };
      }, []);
      
      const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setDate(moment(date).format("DD/MM/YYYY"));
        hideDatePicker();
      };
      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(`${result.uri}`);
        }
      };
      async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        if (!image.includes("firebasestorage")) {
          const blob = await new Promise((resolve, reject) => {
            setIsLoadingImage(true);
    
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
          });
    
          const fileRef = ref(getStorage(), uuid.v4());
          const result = await uploadBytes(fileRef, blob);
          blob.close();
          setIsLoadingImage(false);
    
          const imageUrl = await getDownloadURL(fileRef);
    
          if (data && imageUrl) {
            setIsLoadingSave(true);
            const dataArrayHistory = data?.filter((v) => v.id === idHistory)[0]
              ?.arrayHistory;
            const newData = dataArrayHistory.map((v) => {
              if (v.id === history?.id) {
                return {
                  ...v,
                  category,
                  description,
                  genre,
                  totalMoney,
                  event,
                  location,
                  withwho,
                  create_date: date,
                  imageUrl,
                };
              }
              return v;
            });
            const reference = doc(db, "Information", idHistory);
            setDoc(reference, {
              arrayHistory: newData,
              create_date: data?.filter((v) => v.id === idHistory)[0]?.create_date,
            })
              .then(() => {
                setIsLoadingSave(false);
                navigation.navigate("HistoryItem");
              })
              .catch((error) => {
                setIsLoadingSave(false);
                console.error(error);
                Alert.alert("Error", "Error", [
                  {
                    text: "OK",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                ]);
              });
          }
        } else {
          if (data) {
            setIsLoadingSave(true);
            const dataArrayHistory = data?. filter((v) => v.id === idHistory)[0]
              ?.arrayHistory;
            const newData = dataArrayHistory.map((v) => {
              if (v.id === history?.id) {
                return {
                  ...v,
                  category,
                  description,
                  genre,
                  event,
                  location,
                  withwho,
                  totalMoney,
                  create_date: date,
                };
              }
              return v;
            });
            const reference = doc(db, "Information", idHistory);
            setDoc(reference, {
              arrayHistory: newData,
              create_date: data?.filter((v) => v.id === idHistory)[0]?.create_date,
            })
              .then(() => {
                setIsLoadingSave(false);
                navigation.navigate("HistoryItem");
              })
              .catch((error) => {
                setIsLoadingSave(false);
                console.error(error);
                Alert.alert("Error", "Error", [
                  {
                    text: "OK",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                ]);
              });
          }
        }
      }
      const onPressSave = () => {
        if (description && totalMoney !== 0 && image && date) {
          uploadImageAsync(image);
        } else {
        }
      };
      const onPressDelete = () => {
        if (data && data.length > 0) {
          const dataArrayHistory = data?.filter((v) => v.id === idHistory)[0]
            ?.arrayHistory;
          const newData = dataArrayHistory?.filter((v) => v.id !== history?.id);
          const reference = doc(db, "Information", idHistory);
          setDoc(reference, {
            arrayHistory: newData,
            create_date: data?.filter((v) => v.id === idHistory)[0]?.create_date,
          })
            .then(() => {
              setIsLoadingSave(false);
              navigation.navigate("HistoryItem");
            })
            .catch((error) => {
              setIsLoadingSave(false);
              console.error(error);
              Alert.alert("Error", "Error", [
                {
                  text: "OK",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ]);
            });
          return;
        }
    
        if (data && data.length === 0) {
          const reference = collection(db, "Information", idHistory);
          deleteDoc(reference)
            // Handling Promises
            .then(async () => {
              navigation.navigate("HistoryItem");
    
              // MARK: Success
            })
            .catch((error) => {
              // MARK: Failure
              console.log(error.message);
            });
        }
      };
      console.log({idHistory});
    
      function renderNavBar() {
        return(
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
            onPress={()=>{navigation.navigate("HistoryItem")}}
            >
            <Ionicons  name="arrow-back-outline" size={30} color= "black"/>
            </TouchableOpacity>
            <View
            style={{
              height:50,
              width:150,
              marginRight:85
            }}>
            <RNPickerSelect
            style={pickerSelectStyles}
            items={[
              { label: "REVENUE", value: "REVENUE" },
              { label: "EXPENDITURE", value: "EXPENDITURE" },
            ]}
            onValueChange={(value) => {
              setCategory(value)
            }}
            itemKey={`key` + 1}
            value={category}
            key={`key`}
  
            Icon={() => (
              <View
                style={{
                  right: 10,
                  top: 10,
                }}
              >
                <AntDesign name="caretdown" size={24} color="black" />
              </View>
            )}>
            </RNPickerSelect>
            </View>
          </View>
        )
      } 
    
      return (
        <View style={{ flex: 1, backgroundColor:'lightGray'}}>
        {renderNavBar()}
        <ScrollView>
        <View
        style={{
          alignItems:'center',
          justifyContent:'center',
          paddingHorizontal:7,
        }}>
          <Text
          style={{
            fontSize:18,
            marginVertical:5,
            fontWeight:'bold'
          }}>Amount Of Money</Text>
          
          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center',
            paddingHorizontal:15,
            borderBottomWidth:2
          }}
          >
          <FontAwesome5 name="money-bill-alt" size={28} color="black" />
          <CurrencyInput
          style={{
            backgroundColor: "#9AF9D1",
            color: "black",
            width: 350,
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius:5,
          }}
          value={totalMoney}
          onChangeValue={(text) => {setTotalMoney(text)}}
          prefix="$"
          delimiter=','
          separator='.'
          precision={2}
          ></CurrencyInput>
          </View>
        </View>

        <View
        style={{
          justifyContent:'center',
          alignItems:'center'
        }}
        >
          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center'
          }}
          >
          <AntDesign name="questioncircle" size={24} color="black" />
          <View
          style={{
            color: "black",
            width: 350,
            height: 40,
            margin: 12,
            borderBottomWidth: 1,
          }}>
          <RNPickerSelect
          items={category === "REVENUE" ? dataREVENUE : dataEXPENDITURE}
          onValueChange={(value) => {
            setGenre(value);
          }}
          style={pickerSelectStyles}
          value={genre}
          useNativeAndroidPickerStyle={false}
          key={`key` + 2}
        />
          </View>
          </View>
          
          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center',
          }}
          >
          <MaterialIcons name="date-range" size={24} color="black" />
          <View>
          <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={new Date()}
          />
          <TouchableOpacity
          onPress={() => showDatePicker()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            width:350,
            height: 50,
            borderBottomWidth: 1,
            paddingHorizontal: 12,
            margin: 12,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              flex: 1,
              alignItems: "center",
              textAlign: "center",
              fontSize: 15,
            }}
          >
            {date || "Choose Date"}
          </Text>
        </TouchableOpacity>
          </View>
          </View>

          
          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center',
          }}
          >
          <MaterialIcons name="description" size={24} color="black" />
          <TextInput
          style={styles.input}
          placeholder={"Description"}
          value={description}
          onChangeText={(value)=>setDescription(value)}
          ></TextInput>
          </View>

          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center',
          }}
          >
          <FontAwesome name="plane" size={24} color="black" />
          <TextInput
          style={styles.input}
          placeholder={"Event, travel ..."}
          value={event}
          onChangeText={(value)=>setEvent(value)}></TextInput>
          </View>

          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center',
          }}
          >
          <Fontisto name="persons" size={24} color="black" />
          <TextInput
          style={styles.input}
          placeholder={"With who?"}
          value={who}
          onChangeText={(value)=>setWho(value)}
          ></TextInput>
          </View>

          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center',
          }}
          >
          <Ionicons name="locate" size={24} color="black" />
          <TextInput
          style={styles.input}
          placeholder={"Location"}
          value={location}
          onChangeText={(value)=> setLocation(value)}
          ></TextInput>
          </View>
          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center',
          }}
          >
          <FontAwesome name="picture-o" size={24} color="black" />
          <TouchableOpacity
          style={styles.input}>
            <Text
            style={{
              color:"#AFAFAF"
            }}
            onPress={pickImage}
          >Add Image</Text>
          </TouchableOpacity>
          </View>     

          {image ? (
          <Image
            source={{ uri: image }}
            style={{ width:"100%", height:200 }}
          />
        ) : null}

        <View style={{ justifyContent:"space-between", flexDirection:"row"}}>
        <TouchableOpacity
        style = {{
          height:50,
          width:150,
          backgroundColor:'green',
          marginVertical:25,
          borderRadius:5,
          justifyContent:'center',
          alignItems:'center',
        }}
          isLoading={isLoadingImage || isLoadingSave}
          disabled={isLoadingImage || isLoadingSave}
          onPress={() => {onPressSave()}}
        >
          <Text
          style={{
            fontSize:24,
            textTransform:'uppercase',
            color:'white'
          }}
          >EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style = {{
          height:50,
          width:150,
          backgroundColor:'red',
          marginVertical:25,
          borderRadius:5,
          justifyContent:'center',
          alignItems:'center',
        }}
          onPress={() => {onPressDelete()}}
        >
          <Text
          style={{
            fontSize:24,
            textTransform:'uppercase',
            color:'white'
          }}
          >DELETE</Text>
        </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
      color: "black",
      width: 350,
      height: 40,
      margin: 12,
      borderBottomWidth: 1,
      padding: 10,
      borderRadius:5,
  },
  
  dropdown: {
    borderWidth:1,
    backgroundColor:"gray",
    borderRadius: 5,
    marginVertical: 7,
    margin:12,
    borderBottomWidth:5
  },
  
    button:{
      alignItems:'center',
      justifyContent:'center',
      height:40,
      width:180,
      backgroundColor:"#02F08C",
      borderRadius:5,   
    }
  })
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      color: "black",
      paddingRight: 30, 
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: "black",
      paddingRight: 30, 
    },
  });

export default DetailItem