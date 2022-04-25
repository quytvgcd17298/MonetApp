import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert, Keyboard, Platform, Dimensions, Image, ActivityIndicator } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import CurrencyInput from 'react-native-currency-input';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
/* import DateTimePicker from '@react-native-community/datetimepicker' */
import { auth, db } from '../data/FirebaseConfig'
import uuid from "react-native-uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useIsFocused } from "@react-navigation/native";

import { getDoc, doc, collection, getDocs, documentId, setDoc, addDoc } from "firebase/firestore";
import ButtonCustom from '../components/ButtonCustom';

const dataEXPENDITURE = [
  {
    label: 'FOOD',
    value: 'FOOD',
},
{
    label: 'LIVING SERVICE',
    value: 'LIVING SERVICE',
},

{
    label: 'PERSONAL SERVICE',
    value: 'PERSONAL SERVICE',
},
{
    label: 'ENJOYMENT',
    value: 'ENJOYMENT',
},

{
    label: "MOVEMENT",
    value: "MOVEMENT",
},
{
    label: "EDUCATION",
    value: "EDUCATION",
},
{
    label: "HEALTHY",
    value: "HEALTHY",
},
];
const dataREVENUE  = [
  { label: "Monthly salary", value: "Salary" },
  { label: "Bonus", value: "Bonus" },
  { label: "Interest", value: "Interest" },
];

const CreateNew = ({navigation}) => {
  const [category, setCategory] = useState("REVENUE");
  const [genre, setGenre] = useState(
    category === "REVENUE" ? dataREVENUE[0].value : dataEXPENDITURE[0].value
  );

  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const [totalMoney, setTotalMoney] = useState(0);

  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
/*   const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState('Time is empty') */


  const [description, setDescription] = useState("");
  const [event, setEvent] = useState("");
  const [who, setWho] = useState("");
  const [location, setLocation]=useState("");
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

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
              withwho: who,
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
              withwho: who,
              location: location,
              imageUrl,
            },
          ];
          addDoc(reference, {
            create_date: date,
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
          withwho: who,
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

  const clearInput = () => {
    setDate("");
    setWho(""),
    setEvent(""),
    setLocation(""),
    setDescription("");
    setImage("");
    setTotalMoney(0);
  };

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "Information"));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setData(data);
  }, [isFocused]);
  const onPressSave = async () => {
    Keyboard.dismiss();

    try {
      if (description && totalMoney !== 0 && event && who && location && image && date) {
        if (data?.length > 0) {
          const checkId = data.filter((v) => v.create_date === date);
          if (checkId.length > 0) {
            console.log(checkId[0]?.id);
            uploadImageAsync(image, checkId, "key");
          } else {
            uploadImageAsync(image, checkId, "key");
          }
        } else {
          uploadImageAsync(image);
        }
      } else {
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
          <View
          style={{
            height:50,
            width:150
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
          <TouchableOpacity onPress={()=>navigation.navigate("HistoryItem")}>
          <FontAwesome name="history" size={30} color="black" />          
          </TouchableOpacity>
        </View>
      )
    } 

    /* const onChangeDate = (event, selectedDate) => {
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
   } */


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

        <ButtonCustom
          title="SAVE"
          backgroundColor={'#169BD5'}
          width={"80%"}
          isLoading={isLoadingImage || isLoadingSave}
          disabled={isLoadingImage || isLoadingSave}
          onPress={() => {onPressSave()}}
        >
        </ButtonCustom>
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

export default CreateNew;