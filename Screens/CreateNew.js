import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import CurrencyInput from 'react-native-currency-input';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 


const CreateNew = ({navigation}) => {
  const [value, setValue] = React.useState(""); // can also be null
  const [item, setItem] = useState("");


    function renderNavBar() {
      return(
        <View
          style={{
            flexDirection:"row",
            height:60,
            justifyContent:"space-between",
            alignItems:'flex-end',
            paddingHorizontal:15,
            backgroundColor:'#02F08C'
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
          <TouchableOpacity>
          <FontAwesome name="history" size={30} color="black" />          
          </TouchableOpacity>
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
            backgroundColor: "#02F08C",
            color: "black",
            width: 350,
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius:5,
          }}
          value={value}
          onChangeValue={setValue}
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
          <AntDesign name="questioncircle" size={30} color="black" />
          <TextInput
          style={styles.input}
          value = {item}
          onPressIn={()=> {navigation.navigate("ListItem")}}
          onChangeText={(value) => setItem(value)}
/*           onChangeValue={callBack}
 */          >
          </TextInput>

          </View>
          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center',
          }}
          >
          <MaterialIcons name="date-range" size={24} color="black" />
          <TextInput
          style={styles.input}></TextInput>
          </View>
          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center',
          }}
          >
          <MaterialIcons name="description" size={30} color="black" />
          <TextInput
          style={styles.input}></TextInput>
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
          style={styles.input}></TextInput>
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
          style={styles.input}></TextInput>
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
          style={styles.input}></TextInput>
          </View>
          <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center',
          }}
          >
          <FontAwesome name="picture-o" size={24} color="black" />
          <TextInput
          style={styles.input}></TextInput>
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
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "black",
    width: 350,
    height: 40,
    margin: 12,
    borderWidth: 1,
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