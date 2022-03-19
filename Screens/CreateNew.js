import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import CurrencyInput from 'react-native-currency-input';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import ListItem from '../components/ListItem';
import PickDate from '../components/PickDate';


const CreateNew = ({navigation}) => {
  const [moneyValue, setMoneyValue] = React.useState(""); // can also be null
  const [itemValue, setItemValue] = useState("");
  const [date, setDate]= useState("");
  const [description, setDescription] = useState("");
  const [event, setEvent] = useState("");
  const [who, setWho] = useState("");
  const [location, setLocation]=useState("");
  const [picture, setPicture] = useState("")
  const [open, setOpen] = useState(false)


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
          <TouchableOpacity>
          <Ionicons  name="arrow-back-outline" size={30} color= "black"/>
          </TouchableOpacity>
          <Text
          style={{
            fontSize:26,
            marginBottom:5,
            fontWeight:'bold'
          }}
          >Revenue</Text>
          <TouchableOpacity
          onPress={()=>navigation.navigate("History")}
          >
          <FontAwesome name="history" size={30} color="black" />          
          </TouchableOpacity>
        </View>
      )
    } 

    /* function openCamera(){
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false
      }).then(image => {
        console.log(image);
      });
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
        }}
        >
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
          <PickDate></PickDate>
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

export default CreateNew;