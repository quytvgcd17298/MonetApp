import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet, Dimensions, Image } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import RNPickerSelect from "react-native-picker-select";
import moment from "moment";
import Icons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";

import { db, dbFireStore, auth  } from '../data/FirebaseConfig';
import { collection, getDocs, deleteDoc, query, orderBy, doc, updateDoc } from "firebase/firestore"

const dataFilter = [
  { label: "To Day", value: "ToDay" },
  { label: "Month", value: "Month" },
  { label: "Year", value: "Year" },
];

export  const HistoryItem = ( {navigation} ) => {
  const [filter, setFilter] = useState(dataFilter[0].value);
  const [data, setData] = useState([]);
  const [sumRevenue, setSumRevenue] = useState(0);
  const [sumExpenditure, setSumExpenditure] = useState(0);
  const isFocused = useIsFocused();


/*   const deleteItem = async (id) => {
    const itemDoc = doc(db, "information", id);
    await deleteDoc(itemDoc);
    navigation.navigate("Monet");
  };


  useEffect(()=>{
    const getMonetData = async () => {
    const mySnapshot = await getDocs(dataCollectionRef);
    setMonetData(mySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getMonetData();
  }, []);


   const detailPress= () =>{
    navigation.navigate("ItemInputDetail");
  }; */

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "Information"));
    let data = [];
    querySnapshot.forEach((doc) => {
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);

      if (
        filter === dataFilter[0]?.value &&
        auth.currentUser.uid === doc.data()?.arrayHistory[0]?.uid &&
        doc.data()?.create_date === moment().format("DD/MM/YYYY")
      ) {
        data.push({ id: doc.id, ...doc.data() });
      } else if (
        filter === dataFilter[1]?.value &&
        auth.currentUser.uid === doc.data()?.arrayHistory[0]?.uid &&
        firstDay <=
          moment(
            moment(doc.data()?.create_date, "DD/MM/YYYY").format("YYYY-MM-DD")
          ).valueOf() &&
        moment(
          moment(doc.data()?.create_date, "DD/MM/YYYY").format("YYYY-MM-DD")
        ).valueOf() <= lastDay
      ) {
        data.push({ id: doc.id, ...doc.data() });
      } else {
        if (
          filter === dataFilter[2]?.value &&
          auth.currentUser.uid === doc.data()?.arrayHistory[0]?.uid &&
          moment().startOf("year").valueOf() <=
            moment(new Date()).valueOf() <=
            moment().endOf("year").valueOf()
        ) {
          data.push({ id: doc.id, ...doc.data() });
        }
      }
    });
    setData(data);

    return () => {
      setData([]);
    };
  }, [isFocused, filter]);

  const getSumRevenueAll = () => {
    let sum = 0;

    data.forEach((value) => {
      value.arrayHistory?.forEach((obj) => {
        for (let property in obj) {
          if (property === "totalMoney" && obj["category"] === "REVENUE") {
            sum += obj[property];
          }
        }
      });
    });
    return sum;
  };
  const getSumEXPENDITUREAll = () => {
    let sum = 0;

    data.forEach((value) => {
      value.arrayHistory?.forEach((obj) => {
        for (let property in obj) {
          if (property === "totalMoney" && obj["category"] !== "REVENUE") {
            sum += obj[property];
          }
        }
      });
    });
    return sum;
  };

  const _renderItem = ({ item, index }) => {
    const idHistory = item.id;
    const getREVENUE = () => {
      let sumRevenue = 0;
      item.arrayHistory?.forEach((obj) => {
        for (let property in obj) {
          if (property === "totalMoney" && obj["category"] === "REVENUE") {
            sumRevenue += obj[property];
          }
        }
      });
      return sumRevenue;
    };

    const getEXPENDITURE = () => {
      let sumEXPENDITURE = 0;
      item.arrayHistory?.forEach((obj) => {
        for (let property in obj) {
          if (property === "totalMoney" && obj["category"] === "EXPENDITURE") {
            sumEXPENDITURE += obj[property];
          }
        }
      });
      return sumEXPENDITURE;
    };
    if (item?.arrayHistory?.length === 0) {
      return null;
    }
    return (
      <>
        {index == 0 ? null : (
          <View
            style={{
              height: 10,
              backgroundColor: "#324562",
              marginHorizontal: 16,
            }}
          />
        )}
        <View style={{ padding: 16 }}>
          <View
            style={{
              backgroundColor: "#D7E9F5",
              borderRadius: 8,
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingLeft: 10,
                }}
              >
                {item.create_date}
              </Text>
              <View style={{ paddingRight: 10 }}>
                {getREVENUE() ? (
                  <Text
                    style={{

                      fontSize: 14,
                      fontWeight: "bold",
                      color: "green",
                    }}
                  >
                    ${getREVENUE()}
                  </Text>
                ) : null}

                {getEXPENDITURE() ? (
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    ${getEXPENDITURE()}
                  </Text>
                ) : null}
              </View>
            </View>

            <View
              style={{
                height: 2,
                backgroundColor: "#000",
                marginHorizontal: 12,
                marginTop: 5,
              }}
            />
            <View
              style={{
                padding: 12,
                backgroundColor: "#D7E9F5",
                borderRadius: 8,
              }}
            >
              {item?.arrayHistory?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ flexDirection: "row", marginBottom: 10 }}
                    onPress={() =>
                      navigation.navigate('DetailItem', {
                        history: item,
                        idHistory,
                      })
                    }
                  >
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{
                        width: 50,
                        height: 50,
                        marginRight: 10,
                      }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{}}>Genre: {item.genre}</Text>
                        <Text style={{}}>Description: {item.description}</Text>
                      </View>
                      <Text
                        style={{
                          flex: 0.7,
                          textAlign: "right",
                          color: item.category !== "REVENUE" ? "red" : "green",
                          fontSize: 15,
                          fontWeight: "bold",
                        }}
                      >
                        ${item.totalMoney}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </>
    );
  }

  

  function renderNavBar() {
    return(
      <View>
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
          onPress={()=>{navigation.navigate("Monet")}}>
          <Ionicons  name="arrow-back-outline" size={30} color= "black"/>
          </TouchableOpacity>
          <Text
          style={{
            fontSize:30,
            marginBottom:5,
            fontWeight:'bold',
            textTransform:'uppercase',
            paddingRight:85
          }}
          >HISTORY ITEM</Text>
        </View>
    </View>
    )
  }
  
    return (
    <View
    style={{
      flex:1,
      backgroundColor:'#B3D3C2',
    }}
    >
      {renderNavBar()}
      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <RNPickerSelect
          items={dataFilter}
          onValueChange={(value) => {
            setFilter(value);
          }}
          itemKey={`key` + 1}
          style={pickerSelectStyles}
          value={filter}
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
              <Icons name="chevron-down-outline" size={24} />
            </View>
          )}
        />
      </View>

      {data && data?.length > 0 ? (
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            paddingHorizontal: 16,
            justifyContent:'space-between',
          }}
        >
          <View
            style={{
              width: 150,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 1.84,
              backgroundColor: "white",
              elevation: 2,
              borderRadius: 4,
              alignItems: "center",
              justifyContent: "center",
              margin: 4,
              padding: 8,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "green" }}>
              REVENUE
            </Text>
            <Text style={{ fontSize: 15, color: "green" }}>
              ${getSumRevenueAll()}
            </Text>
          </View>
          <View
            style={{
              margin: 4,
              width: 150,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 1.84,
              backgroundColor: "white",
              borderRadius: 4,
              elevation: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
              EXPENDITURE
            </Text>
            <Text style={{ fontSize: 15, color: "red" }}>
              ${getSumEXPENDITUREAll()}
            </Text>
          </View>
        </View>
      ) : null}

      {data && data?.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View
          style={{ 
            alignItems: "center", 
            justifyContent: "center", 
            flex: 1 
          }}
        >
          <Text style={{ fontSize: 20 }}>No Data...</Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#02F08C',
    alignContent:'center',
    justifyContent:'center',
  },
  button:{
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    width:150,
    height:50,
    backgroundColor:'white',
    borderWidth:1,
    borderRadius:5,
    marginBottom:10
  },
  childContainer:{
    backgroundColor: '#B3D3C2',
  }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, 
  },
});
