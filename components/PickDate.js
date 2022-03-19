import { View, Text, Platform, TouchableOpacity, Button, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState } from    'react'
import DateTimePicker from '@react-native-community/datetimepicker'

const PickDate = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState('Time is empty')

  const onChange = (event, selectedDate) => {
     const currentDate = selectedDate || date;
     setShow(Platform.OS === 'ios');
     setDate(currentDate);

     let tempDate = new Date(currentDate);
     let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
     let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
     setTextDate(fDate + "," + " " + " " + " " + " " + " " + " " + " " + " "  + fTime)

     console.log(fDate + '(' + fTime + ')')
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  return(
    <View style={styles.container}>
      <View
      style={{
        flexDirection:'row',
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
        onPress={()=> showMode('date')}
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
        onPress={()=> showMode('time')}
        >
          <Text
          style = {{
            color:'#AFAFAF'
          }}>Select Time</Text>
        </TouchableOpacity>
      </View>
      </View>
      <Text
      style={{
        paddingTop:20
      }}
      >{textDate}</Text>

    {show &&(
      <DateTimePicker
      testID='dateTimePicker'
      value={date}
      mode={mode}
      is24Hour={true}
      display='default'
      onChange={onChange} 
      ></DateTimePicker>
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    margin:5,
    padding:10
  }
})
export default PickDate;