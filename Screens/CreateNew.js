import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert, Keyboard, Platform, Dimensions, Image } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import CurrencyInput from 'react-native-currency-input';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";

import DateTimePicker from '@react-native-community/datetimepicker'
import  { auth, db } from '../data/FirebaseConfig'
import { ref as DatabaseRef, push, set, onValue } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  getDoc,
  doc,
  collection,
  getDocs,
  documentId,
  setDoc,
  addDoc,
} from "firebase/firestore";

const dataREVENUE = [
  {
    label: 'FOOD',
    value: 'FOOD',
    icon: () => <Ionicons name="fast-food" size={30} color="orange" />
},
{
    label: 'Breakfast',
    value: 'Breakfast',
    icon: () => <MaterialIcons name="breakfast-dining" size={24} color="black" />
},
{
    label: 'Lunch',
    value: 'Lunch',
    icon: () => <MaterialIcons name="lunch-dining" size={24} color="black" />
},
{
    label: 'Dinner',
    value: 'Dinner',
    icon: () => <MaterialIcons name="dinner-dining" size={24} color="black" />
},
{
    label: 'Coffee',
    value: 'Coffee',
    icon: () => <FontAwesome name="coffee" size={24} color="black" />
},
{
    label: 'Restaurant',
    value: 'Restaurant',
    icon: () => <Ionicons name="restaurant" size={24} color="black" />
},
{
    label: 'LIVING SERVICE',
    value: 'LIVING SERVICE',
    icon: () => <FontAwesome5 name="house-user" size={30} color="orange" />
},
{
    label: 'Electric',
    value: 'Electric',
    icon: () => <MaterialCommunityIcons name="lightning-bolt" size={24} color="black" />
},
{
    label: 'Telephone charges',
    value: 'Telephone charges',
    icon: () => <AntDesign name="mobile1" size={24} color="black" />
},
{
    label: 'Gas',
    value: 'Gas',
    icon: () => <FontAwesome name="fire" size={24} color="black" />
},
{
    label: 'Water',
    value: 'Water',
    icon: () => <Ionicons name="water" size={24} color="black" />
},
{
    label: 'Internet',
    value: 'Internet',
    icon: () => <Fontisto name="world" size={24} color="black" />
},
{
    label: 'PERSONAL SERVICE',
    value: 'PERSONAL SERVICE',
    icon: () => <Ionicons name="person" size={30} color="orange" />
},
{
    label: 'Clothes',
    value: 'Clothes',
    icon: () => <MaterialCommunityIcons name="shoe-formal" size={24} color="black" />
},
{
    label: 'Accessory',
    value: 'Accessory',
    icon: () => <Feather name="watch" size={24} color="black" />
},
{
    label: 'Girl friend',
    value: 'Girl friend',
    icon: () => <Ionicons name="woman" size={24} color="black" />
},
{
    label: 'Party. Wedding, Birthday...',
    value: 'Party. Wedding, Birthday...',
    icon: () => <FontAwesome5 name="gifts" size={24} color="black" />
},
{
    label: 'ENJOYMENT',
    value: 'ENJOYMENT',
    icon: () => <FontAwesome5 name="plane-arrival" size={30} color="orange" />
},
{
    label: 'Shopping',
    value: 'Shoppuning',
    icon: () => <FontAwesome name="shopping-cart" size={24} color="black" />
},
{
    label: "Entertainment",
    value: "Entertainment",
    icon: () => <FontAwesome5 name="headphones" size={24} color="black" />
},
{
    label: "Travel",
    value: "Travel",
    icon: () => <FontAwesome name="plane" size={24} color="black" />
},
{
    label: "Movie",
    value: "Movie",
    icon: () => <MaterialIcons name="movie" size={24} color="black" />
},
{
    label: "Beautify",
    value: "Beautify",
    icon: () => <MaterialCommunityIcons name="hair-dryer" size={24} color="black" />
},
{
    label: "MOVEMENT",
    value: "MOVEMENT",
    icon: () => <Entypo name="location" size={30} color="orange" />
},
{
    label: "Gasoline",
    value: "Gasoline",
    icon: () => <FontAwesome5 name="gas-pump" size={24} color="black" />
},
{
    label: "Taxi",
    value: "Taxi",
    icon: () => <FontAwesome name="taxi" size={24} color="black" />
},
{
    label: "Car repair and maintain",
    value: "Car repair and maintain",
    icon: () => <MaterialIcons name="car-repair" size={24} color="black" />
},
{
    label: "Other",
    value: "Other",
    icon: () => <FontAwesome5 name="car-side" size={24} color="black" />
},
{
    label: "HEALTHY",
    value: "HEALTHY",
    icon: () => <FontAwesome5 name="notes-medical" size={30} color="orange" />
},
{
    label: "Healthcare",
    value: "Healthcare",
    icon: () => <FontAwesome5 name="hand-holding-medical" size={24} color="black" />
},
{
    label: "Medicine",
    value: "Medicine",
    icon: () => <FontAwesome5 name="briefcase-medical" size={24} color="black" />
},
{
    label: "Sport",
    value: "Sport",
    icon: () => <MaterialIcons name="sports-soccer" size={24} color="black" />
},
];
const dataEXPENDITURE = [
  { label: "Eating", value: "Eating" },
  { label: "living service", value: "Living" },
  { label: "Sports", value: "Sports" },

  { label: "Education", value: "Education" },
];

const CreateNew = ({navigation}) => {
  const [category, setCategory] = useState("REVENUE");
  const [genre, setGenre] = useState(
    category === "REVENUE" ? dataREVENUE[0].value : dataEXPENDITURE[0].value
  );

  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const [totalMoney, setTotalMoney] = useState(0);

  const [date, setDate] = useState(new Date());
/*   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 */
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState('Time is empty')


  const [description, setDescription] = useState("");
  const [event, setEvent] = useState("");
  const [who, setWho] = useState("");
  const [location, setLocation]=useState("");
  const [data, setData] = useState([]);

  /* const dataCollectionRef = collection(db, 'information')
  
  const saveInput = async () => {
    const newDoc = await addDoc(dataCollectionRef, {
      Amount: moneyValue, 
      Item: itemValue, 
      Date: textDate, 
      Description: description, 
      Event: event, 
      WithWho: who, 
      Location: location
    });
    navigation.navigate("HistoryItem");
    console.log("Done")
  } */

/*   const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDate(moment(date).format("DD/MM/YYYY"));
    hideDatePicker();
  };
 */

  const [image, setImage] = useState(null);
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

  async function uploadImageAsync(uri, checkId, key) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662

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

    // We're done with the blob, close and release it
    blob.close();
    setIsLoadingImage(false);
    const imageUrl = await getDownloadURL(fileRef);
    if (data?.length > 0) {
      if (checkId?.length > 0) {
        const reference = doc(db, "Information", checkId[0]?.id);

        if (imageUrl) {
          setIsLoadingSave(true);
          const list = [
            {
              uid: auth.currentUser.uid,
              id: auth.currentUser.uid + new Date().getTime(),
              totalMoney: totalMoney,
              genre: genre,
              category: category,
              description: description,
              create_date: date,
              event: event,
              with: who,
              location: location,
              imageUrl: imageUrl,
            },
          ];
          const newList = checkId[0]?.arrayHistory?.concat(list);
          setDoc(reference, {
            arrayHistory: newList,
            create_date: date,
          })
            .then(() => {
              clearInput();
              setIsLoadingSave(false);
              Alert.alert(
                "Success",
                "Congratulations on your successful save",
                [
                  {
                    text: "OK",
                    onPress: () =>
                      navigation.navigate("HistoryItem"),
                  },
                ]
              );
            })
            .catch((error) => {
              console.log(error);
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
        const reference = collection(db, "Information");

        if (imageUrl) {
          setIsLoadingSave(true);
          const list = [
            {
              uid: auth.currentUser.uid,
              id: auth.currentUser.uid + new Date().getTime(),
              totalMoney: totalMoney,
              genre: genre,
              category: category,
              description: description,
              create_date: date,
              event: event,
              with: who,
              location: location,
              imageUrl,
            },
          ];
          addDoc(reference, {
            create_date: date,
            // id: auth.currentUser.uid + new Date().getTime(),
            arrayHistory: list,
          })
            // Handling Promises
            .then(() => {
              // MARK: Success
              clearInput();
              setIsLoadingSave(false);
              Alert.alert(
                "Success",
                "Congratulations on your successful save",
                [
                  {
                    text: "OK",
                    onPress: () =>
                      navigation.navigate("HistoryItem"),
                  },
                ]
              );
              console.log("Document Created!");
            })
            .catch((error) => {
              // MARK: Failure
              Alert.alert("Error", "Error", [
                {
                  text: "OK",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ]);
              console.log(error.message);
            });
        }
      }
    } else {
      const reference = collection(db, "Information");

      if (!isLoadingImage) {
        setIsLoadingSave(true);
        const list = {
          uid: auth.currentUser.uid,
          id: auth.currentUser.uid + new Date().getTime(),
          totalMoney: totalMoney,
          genre: genre,
          category: category,
          description: description,
          create_date: date,
          event: event,
          with: who,
          location: location,
          imageUrl,
        };
        addDoc(reference, {
          create_date: date,
          arrayHistory: [list],
        })
          .then(() => {
            clearInput();
            setIsLoadingSave(false);
            Alert.alert("Success", "Congratulations on your successful save", [
              {
                text: "OK",
                onPress: () => navigation.navigate("HistoryItem"),
              },
            ]);
          })
          .catch((error) => {
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

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "Information"));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setData(data);
  }, []);
  const onPressSave = async () => {
    Keyboard.dismiss();

    try {
      if (description && totalMoney !== 0 && image && date) {
        if (data?.length > 0) {
          const checkId = data.filter((v) => v.create_date === date);
          if (checkId.length > 0) {
            console.log(checkId[0]?.id);
            uploadImageAsync(image, checkId, "key");
          } else {
            uploadImageAsync(image, checkId, "key");
          }
        }
      } else {
        // uploadImageAsync(image, checkId, key);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setGenre(
      category === "REVENUE" ? dataREVENUE[0].value : dataEXPENDITURE[0].value
    );
  }, [category]);

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
          onPress={()=>{navigation.navigate("Home")}}
          >
          <Ionicons  name="arrow-back-outline" size={30} color= "black"/>
          </TouchableOpacity>
          <RNPickerSelect
          items={[
            { label: "REVENUE", value: "REVENUE" },
            { label: "EXPENDITURE", value: "EXPENDITURE" },
          ]}
          onValueChange={(value) => {
            setCategory(value);
          }}
          itemKey={`key` + 1}
/*           style={pickerSelectStyles}
 */       value={category}
          useNativeAndroidPickerStyle={false}
          key={`key`}

          Icon={() => (
            <View
              style={{
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              <AntDesign name="caretdown" size={24} color="black" />
            </View>
          )}>
          </RNPickerSelect>
          <TouchableOpacity onPress={()=>navigation.navigate("HistoryItem")}>
          <FontAwesome name="history" size={30} color="black" />          
          </TouchableOpacity>
        </View>
      )
    } 

    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
 
      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
      setTextDate(fDate + ", " +fTime)
 
      console.log(fDate + '(' + fTime + ')')
   }
 
   const showModeDate = (currentMode) => {
     setShow(true);
     setMode(currentMode);
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
            alignItems:'center',
          }}
          >
          <AntDesign name="questioncircle" size={24} color="black" />
          <RNPickerSelect
          items={category === "REVENUE" ? dataREVENUE : dataEXPENDITURE}
          onValueChange={(value) => {setGenre(value)}}
          style={styles.dropdown}
          value={genre}
          useNativeAndroidPickerStyle={false}
          key={`key` + 2}
          ></RNPickerSelect>
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
            <View
            style={{
              flexDirection:'row',
              padding:12,
              margin:5
            }}
            >
            <View>
              <TouchableOpacity
              style={{
                width:170,
                height:40,
                borderBottomWidth:1,
                justifyContent:'center',
                alignItems:'center',
              }}
              onPress={()=> showModeDate('date')}
              >
                <Text
                style = {{
                  color:'#AFAFAF'}}
                >Select Date</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
              style={{
                width:170,
                height:40,
                borderBottomWidth:1,
                justifyContent:'center',
                alignItems:'center',
              }}
              onPress={()=> showModeDate('time')}
              >
                <Text
                style = {{
                  color:'#AFAFAF'
                }}>Select Time</Text>
              </TouchableOpacity>
            </View>
            </View>
            <View style = {{ alignItems:'center', justifyContent:'center'}}>
            <Text
            style={{
              paddingTop:20
            }}
            >{textDate}</Text>
            </View>

          {show &&(
            <DateTimePicker
            testID='dateTimePicker'
            value={date}
/*             mode={date}
 */            is24Hour={true}
            display='default'
            onChange={onChangeDate} 
            ></DateTimePicker>
          )}
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
/*             style={{ width: width - 32, height: width / 2 }}
 */          />
        ) : null}

        <TouchableOpacity
        style = {{
          height:50,
          backgroundColor:'#169BD5',
          marginVertical:25,
          borderRadius:5,
          width:300,
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
          >Save</Text>
        </TouchableOpacity>
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
  width:350,
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

export default CreateNew;