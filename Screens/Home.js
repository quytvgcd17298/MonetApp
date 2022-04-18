import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { db, dbFireStore, auth } from '../data/FirebaseConfig';
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";
import Icons from "@expo/vector-icons/Ionicons";

const dataFilter = [
  { label: "To Day", value: "ToDay" },
  { label: "Month", value: "Month" },
  { label: "Year", value: "Year" },
];

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
const dataCategory = [
  { label: "REVENUE", value: "REVENUE" },
  { label: "EXPENDITURE", value: "EXPENDITURE" },
];
const Home = () => {

  const [category, setCategory] = useState(dataCategory[0].value);

  const [data, setData] = useState([]);
  const [dataFilterPieChart, setDataFilterPieChart] = useState([]);

  const [dataCash, setDataCash] = useState([]);

  const [filter, setFilter] = useState(dataFilter[0].value);  

/*   const docRef = doc(db, "informattion", "Amount");
  const docSnap = await getDocs(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  } */
useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "Information"));
    let data = [];
    querySnapshot.forEach((doc) => {
      if (
        filter === dataFilter[0]?.value &&
        auth.currentUser.uid === doc.data()?.arrayHistory[0]?.uid &&
        doc.data()?.create_date === moment().format("DD/MM/YYYY")
      ) {
        data.push({ id: doc.id, ...doc.data() });
      } else if (
        filter === dataFilter[1]?.value &&
        auth.currentUser.uid === doc.data()?.arrayHistory[0]?.uid &&
        moment().startOf("month").valueOf() <=
        moment(
          moment(doc.data()?.create_date, "DD/MM/YYYY").format("YYYY-MM-DD")
        ).valueOf() &&
      moment(
        moment(doc.data()?.create_date, "DD/MM/YYYY").format("YYYY-MM-DD")
      ).valueOf() <=
        new Date(moment().endOf("month").format("YYYY-MM-DD")).getTime()
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
}, [/* isFocused */, filter]);

useEffect(async () => {
  const querySnapshot = await getDocs(collection(db, "Information"));
  let data = [];
  querySnapshot.forEach((doc) => {
    if (auth.currentUser.uid === doc.data()?.arrayHistory[0]?.uid) {
      data.push({ id: doc.id, ...doc.data() });
    }
  });
  setDataCash(data);

  return () => {
    setDataCash([]);
  };
}, [/* isFocused */, filter]);

const getMoneyByMonth = (month) => {
  let sumCashMoney = 0;
  var date = new Date(),
    y = date.getFullYear();
  var firstDay = new Date(y, month - 1, 1).getTime();
  var lastDay = new Date(y, month, 0).getTime();
  dataCash.forEach((value) => {
    value.arrayHistory?.forEach((obj) => {
      for (let property in obj) {
        if (property === "totalMoney" && obj["category"] == category) {
          if (
            firstDay <=
              moment(
                moment(obj["create_date"], "DD/MM/YYYY").format("YYYY-MM-DD")
              ).valueOf() &&
            moment(
              moment(obj["create_date"], "DD/MM/YYYY").format("YYYY-MM-DD")
            ).valueOf() <= lastDay
          ) {
            sumCashMoney += obj[property];
          }
        }
      }
    });
  });
  return {
    sumCashMoney,
  };
};
const getCashOut = (data) => {
  let sumCash = 0;
  let SumEXPENDITUREAll = 0;
  let SumRevenueAll = 0;
  let sumFOOD = 0;
  let sumBreakfast = 0;
  let sumLunch = 0;
  let sumDinner = 0;
  let sumCoffee = 0;
  let sumRestaurant = 0;
  let sumLIVINGSERVICE = 0;
  let sumElectric = 0;
  let sumTelephone = 0;
  let sumGas = 0;
  let sumWater = 0;
  let sumInternet = 0;
  let sumPERSONAL = 0;
  let sumClothes = 0;
  let sumAccessory = 0;
  let sumGirl = 0;
  let sumParty = 0;
  let sumENJOYMENT = 0;
  let sumShopping = 0;
  let sumEntertainment = 0;
  let sumTravel = 0;
  let sumMovie = 0;
  let sumBeautify = 0;
  let sumMOVEMENT = 0;
  let sumGasoline = 0;
  let sumTaxi = 0;
  let sumCarRepair = 0;
  let sumOther = 0;
  let sumHEALTHY = 0;
  let sumHealthcare = 0;
  let sumMedicine = 0;
  let sumSport = 0;
  data.forEach((value) => {
    value.arrayHistory?.forEach((obj) => {
      for (let property in obj) {
        if (property === "totalMoney" && obj["category"] !== "REVENUE") {
          SumEXPENDITUREAll += obj[property];
          if (obj["genre"] === dataEXPENDITURE[0].value) {
            sumFOOD += obj[property];
          } else if (obj["genre"] === dataEXPENDITURE[1].value) {
            sumBreakfast += obj[property];
          } 
          else if (obj["genre"] === dataEXPENDITURE[2].value) {
            sumLunch += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[3].value) {
            sumDinner += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[4].value) {
            sumCoffee += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[5].value) {
            sumRestaurant += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[6].value) {
            sumLIVINGSERVICE += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[7].value) {
            sumElectric += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[8].value) {
            sumTelephone += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[9].value) {
            sumGas += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[10].value) {
            sumWater += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[11].value) {
            sumInternet += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[12].value) {
            sumPERSONAL += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[13].value) {
            sumClothes += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[14].value) {
            sumAccessory += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[15].value) {
            sumGirl += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[16].value) {
            sumParty += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[17].value) {
            sumENJOYMENT += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[18].value) {
            sumShopping += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[19].value) {
            sumEntertainment += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[20].value) {
            sumTravel += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[21].value) {
            sumMovie += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[22].value) {
            sumBeautify += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[23].value) {
            sumMOVEMENT += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[24].value) {
            sumGasoline += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[25].value) {
            sumTaxi += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[26].value) {
            sumCarRepair += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[27].value) {
            sumOther += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[28].value) {
            sumHEALTHY += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[29].value) {
            sumHealthcare += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[30].value) {
            sumMedicine += obj[property];
          } else {
            sumSport += obj[property];
          }
          
        } else if (
          property === "totalMoney" &&
          obj["category"] === "REVENUE"
        ) {
          SumRevenueAll += obj[property];
        }
      }
    });
  });
  sumCash = SumRevenueAll - SumEXPENDITUREAll;
  return {
   sumCash,
   SumRevenueAll,
   SumEXPENDITUREAll,
   sumFOOD,
   sumBreakfast,
   sumLunch,
   sumDinner,
   sumCoffee,
   sumRestaurant,
   sumLIVINGSERVICE,
   sumElectric,
   sumTelephone,
   sumGas,
   sumWater,
   sumInternet,
   sumPERSONAL,
   sumClothes,
   sumAccessory,
   sumGirl,
   sumParty,
   sumENJOYMENT,
   sumShopping,
   sumEntertainment,
   sumTravel,
   sumMovie,
   sumBeautify,
   sumMOVEMENT,
   sumGasoline,
   sumTaxi,
   sumCarRepair,
   sumOther,
   sumHEALTHY,
   sumHealthcare,
   sumMedicine,
   sumSport,
  };
};


  return (
    <View
    style={styles.container}
    >
      <ScrollView>
        <View
        style={{
          justifyContent:'center',
          alignItems:'center',
          paddingTop:40
        }}>
        <Text
        style={{
          fontSize:40,
          color:'#02F08C',
          fontWeight:'bold',
        }}>MONET</Text>
        </View>
        <View
        style={styles.cashContainer}>
          <Text
          style={{
            fontWeight:"bold",
            fontSize:24,
            marginLeft:10,
            color:'white'
          }}>CASH:                             ${getCashOut(dataCash).sumCash}</Text>
          <Text
          style={{
            marginTop:30,
            marginLeft:10,
            fontWeight:"bold",
            color:"white"
          }}
          >My cash on hand</Text>
        </View>

          <View
          style={styles.analysContainer}
          >
            <Text
            style={{
              textAlign:'center',
              fontWeight:'bold',
              color:'white',
              fontSize:30
            }}
            >Revenue And Expenditure</Text>
            <View style ={{flexDirection:"row", alignItems:'center'}}>
            <Icons name="calendar" size={24} />
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
              />
              <Text style={{ marginLeft: 10, fontSize:20, textTransform:"capitalize" }}>
              01/01/2022 -<Text>31/12/2022</Text>
            </Text>
            </View>
            <View
              style={{
                marginBottom: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "40%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: "green",
                      marginRight: 10,
                    }}
                  />
                  <Text>Revenue</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: "red",
                      marginRight: 10,
                    }}
                  />

                  <Text>Expenditure</Text>
                </View>
              </View>
              <View style={{ width: "60%", alignItems: "flex-end" }}>
                <Text style={{ color: "green", fontSize: 15 }}>
                  {getCashOut(data).SumRevenueAll}
                </Text>
                <View style={{ height: 10 }} />
                <Text style={{ color: "red", fontSize: 15 }}>
                  {getCashOut(data).SumEXPENDITUREAll}
                </Text>
                <View style={{ height: 10 }} />
                <Text>{getCashOut(data).sumCash}</Text>
              </View>
            </View>
            {data ? (
              <BarChart
                data={{
                  labels: ["REVENUE", "EXPENDITURE"],
                  datasets: [
                    {
                      data: [
                        getCashOut(data).SumRevenueAll,
                        getCashOut(data).SumEXPENDITUREAll,
                      ],
                      colors: [
                        (opacity = 1) => `green`,
                        (opacity = 1) => `red`,
                      ],
                      withScrollableDot: true,
                      withDots: 20,
                    },
                  ],
                }}
                showValuesOnTopOfBars={true}
                showBarTops={false}
                yAxisLabel={"$"}
                withCustomBarColorFromData={true}
                flatColor={true}
                fromZero={true}
                width={Dimensions.get("window").width - 56}
                height={Dimensions.get("window").width * 0.8}
                chartConfig={{
                  backgroundGradientFrom: "#F59A32",
                  backgroundGradientTo: "#F59A32",
                  decimalPlaces: 2,
                  color: (opacity = 255) => `black`,
                  propsForHorizontalLabels: {
                    fontSize: 11,
                  },
                }}
                style={{
                  alignItems:'center',
                  justifyContent:'center',
                  // marginVertical: 8,
                  borderRadius: 8,
                }}
                withInnerLines={false}
              />
            ) : null}
            <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              padding: 12,
            }}
          >
            {getCashOut(data).sumEducation ||
            getCashOut(data).sumEating ||
            getCashOut(data).sumLiving ||
            getCashOut(data).sumSports ? (
              <PieChart
                data={[
                  {
                    name: dataEXPENDITURE[0].label,
                    population: getCashOut(data).sumEating,
                    color: "rgba(131, 167, 234, 1)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 12,
                  },
                  {
                    name: dataEXPENDITURE[1].label,
                    population: getCashOut(data).sumLiving,
                    color: "yellow",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 12,
                  },
                  {
                    name: dataEXPENDITURE[2].label,
                    population: getCashOut(data).sumSports,
                    color: "green",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 12,
                  },
                  {
                    name: dataEXPENDITURE[3].label,
                    population: getCashOut(data).sumEducation,
                    color: "rgb(0, 0, 255)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 12,
                  },
                ]}
                width={Dimensions.get("window").width - 32}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#fb8c00",
                  color: (opacity = 255) => `black`,
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                // center={[10, 50]}
              />
            ) : (
              <View style ={{height:400, borderTopWidth:4 }}>
              <Text style={{ textAlign: "center", fontSize:30, justifyContent:"center", alignItems:'center' }}>No data</Text>
              </View>
            )}
          </View>
          </View>
            
          <View
          style={styles.spendContainer}
          >
             <Text
            style={{
              textAlign:'center',
              fontWeight:'bold',
              color:'white',
              fontSize:30
            }}
            >Spending Analysis</Text>
            <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={375} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignItems:'center'
          }}
        />
      </View>
          </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgb(32,53,70)',
    alignContent:'center',
    justifyContent:'center'
  },
  cashContainer:{
    backgroundColor:'#02F08C',
    height:100,
    marginHorizontal:15,
    borderRadius:10
    },
  analysContainer:{
    backgroundColor:'#F59A32',
    height:1000,
    marginHorizontal:15,
    marginTop:10,
    borderRadius:10,
  },
  spendContainer:{
    backgroundColor:'#D9001B',
    height:500,
    marginHorizontal:15,
    marginTop:10,
    borderRadius:10
  }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    textAlign: "center",
    width: 100,
  },
});
export default Home;