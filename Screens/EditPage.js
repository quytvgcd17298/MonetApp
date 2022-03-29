import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, useEffect } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import CurrencyInput from 'react-native-currency-input';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import ListItem from '../components/ListItem';

import DateTimePicker from '@react-native-community/datetimepicker'

import { db } from '../data/FirebaseConfig';
import { collection, updateDoc, doc } from "firebase/firestore"

const EditPage = ({route, navigation}) => {
  const [moneyValue, setMoneyValue] = React.useState(""); // can also be null
  const [itemValue, setItemValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState('Time is empty')
  const [description, setDescription] = useState("");
  const [event, setEvent] = useState("");
  const [who, setWho] = useState("");
  const [location, setLocation]=useState("");

  const dataCollectionRef = collection(db, "Information");

  const updateInput = async ( id, ) => {
    await updateDoc(dataCollectionRef, { Amount: moneyValue, Item: itemValue, Date: textDate, Description: description, Event: event, WithWho: who, Location: location })
    navigation.navigate("HistoryItem");
    console.log("Done")
  }

    function renderNavBar() {
      return(
        <View
          style={{
            flexDirection:"row",
            height:60,
            justifyContent:"space-between",
            alignItems:'flex-end',
            paddingHorizontal:15,
            backgroundColor:'#6699FF',
          }}
        >
          <TouchableOpacity
          onPress={()=>{navigation.navigate("Home")}}
          >
          <Ionicons  name="arrow-back-outline" size={30} color= "black"/>
          </TouchableOpacity>
          <Text
          style={{
            fontSize:26,
            marginBottom:5,
            fontWeight:'bold',
            marginRight:170,
          }}>EDIT</Text>
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
            backgroundColor: "#6699FF",
            color: "black",
            width: 350,
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius:5,
          }}
          value={moneyValue}
          onChangeValue={setMoneyValue}
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
          <ListItem
          onChangeValue={(value) => {
            setItemValue(value);
          }}
          value={itemValue}
          setValue={setItemValue}
          ></ListItem>
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
            mode={mode}
            is24Hour={true}
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
          >Add Image</Text>
          </TouchableOpacity>
          </View>
        <Text
        style={{
          fontSize:26,
          textTransform:'uppercase'
        }}
        >Scan Recept</Text>
        <TouchableOpacity
        style = {styles.button}>
          <Entypo name="camera" size={24} color="black" />
        </TouchableOpacity>
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
        >
          <Text
          style={{
            fontSize:24,
            textTransform:'uppercase',
            color:'white'
          }}
          onPress={createInput}
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
  button:{
    alignItems:'center',
    justifyContent:'center',
    height:40,
    width:180,
    backgroundColor:"#02F08C",
    borderRadius:5,   
  }
})

export default EditPage;