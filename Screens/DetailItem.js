import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Alert, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CurrencyInput from "react-native-currency-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icons from "@expo/vector-icons/Ionicons";
import {
    collection,
    deleteDoc,
    deleteField,
    doc,
    getDocs,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DetailItem = () => {
  return (
      <View>
        <Text></Text>
      </View>

  )
}

export default DetailItem