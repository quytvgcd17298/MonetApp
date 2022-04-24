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
import { AntDesign } from '@expo/vector-icons'; 
import { db, dbFireStore, auth } from '../data/FirebaseConfig';
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";
import Icons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";

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
const dataCategory = [
  { label: "REVENUE", value: "REVENUE" },
  { label: "EXPENDITURE", value: "EXPENDITURE" },
];
const Home = ({navigation}) => {

  const [category, setCategory] = useState(dataCategory[0].value);

  const [data, setData] = useState([]);
  const [dataFilterPieChart, setDataFilterPieChart] = useState([]);

  const [dataCash, setDataCash] = useState([]);

  const [filter, setFilter] = useState(dataFilter[0].value);  
  const isFocused = useIsFocused();

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
}, [isFocused, filter]);

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
}, [isFocused, filter]);

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
  let sumLIVINGSERVICE = 0;
  let sumPERSONAL = 0;
  let sumENJOYMENT = 0;
  let sumMOVEMENT = 0;
  let sumEDUCATION = 0;
  let sumHEALTHY = 0;
  let sumSalary = 0;
  let sumBonus = 0;
  let sumInterest = 0;

  data.forEach((value) => {
    value.arrayHistory?.forEach((obj) => {
      for (let property in obj) {
        if (property === "totalMoney" && obj["category"] !== "REVENUE") {
          SumEXPENDITUREAll += obj[property];
          if (obj["genre"] === dataEXPENDITURE[0].value) {
            sumFOOD += obj[property];
          } else if (obj["genre"] === dataEXPENDITURE[1].value) {
            sumLIVINGSERVICE += obj[property];
          } 
          else if (obj["genre"] === dataEXPENDITURE[2].value) {
            sumPERSONAL += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[3].value) {
            sumENJOYMENT += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[4].value) {
            sumMOVEMENT += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[5].value) {
            sumEDUCATION += obj[property];
          }
          else if (obj["genre"] === dataEXPENDITURE[6].value) {
            sumHEALTHY += obj[property];
          }
        } 
        if ( property === "totalMoney" && obj["category"] === "REVENUE") 
        { 
          SumRevenueAll += obj[property];
          if (obj["genre"] === dataREVENUE[0].value) {
            sumSalary += obj[property];
          } else if (obj["genre"] === dataREVENUE[1].value) {
            sumBonus += obj[property];
          } 
          else if (obj["genre"] === dataREVENUE[2].value) {
            sumInterest += obj[property];
          }
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
   sumLIVINGSERVICE,
   sumPERSONAL,
   sumENJOYMENT,
   sumMOVEMENT,
   sumEDUCATION,
   sumHEALTHY,
   sumSalary,
   sumBonus,
   sumInterest,
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
         <View style={{flexDirection:'row', paddingHorizontal: 15 ,justifyContent:'space-between'}}>
         <Text
          style={{
            fontWeight:"bold",
            fontSize:24,
            marginLeft:10,
            color:'white'
          }}>CASH:</Text>
          <Text
           style={{
            fontWeight:"bold",
            fontSize:24,
            marginLeft:10,
            color:'white'
          }}
          >${getCashOut(dataCash).sumCash}</Text>
         </View>
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
              <View style={{ width: "60%", alignItems: "flex-end", paddingRight:5 }}>
                <Text style={{ color: "green", fontSize: 15 }}>
                  {getCashOut(data).SumRevenueAll} $
                </Text>
                <View style={{ height: 10 }} />
                <Text style={{ color: "red", fontSize: 15 }}>
                  {getCashOut(data).SumEXPENDITUREAll} $
                </Text>
                <View style={{ height: 10 }} />
                <Text>{getCashOut(data).sumCash} $</Text>
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
            >Revenue Analysis</Text>
            <View
            style={{
              borderRadius: 8,
              shadowColor: "#02F08C",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            {getCashOut(data).sumSalary ||
            getCashOut(data).sumBonus ||
            getCashOut(data).sumInterest ? (
              <View>
              <PieChart
                data={[
                  {
                    name: dataREVENUE[0].label,
                    population: getCashOut(data).sumSalary,
                    color: "lightgreen",
                    legendFontColor: "white",
                    legendFontSize: 12,
                  },
                  {
                    name: dataREVENUE[1].label,
                    population: getCashOut(data).sumBonus,
                    color: "yellow",
                    legendFontColor: "white",
                    legendFontSize: 12,
                  },
                  {
                    name: dataREVENUE[2].label,
                    population: getCashOut(data).sumInterest,
                    color: "blue",
                    legendFontColor: "white",
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
              <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
              <TouchableOpacity
              style={{height:30, width:"30%"}}
              onPress={()=>{navigation.navigate("Revenue")}}
              >
                <View style={{flexDirection:'row'}}>
                <Text style={{fontStyle:'italic', fontWeight:'bold'}}>More Detail</Text>
                <AntDesign name="caretright" size={24} color="black" />
                </View>
              </TouchableOpacity>
              </View>
              </View>
            ) : (
              <View style ={{height:250, borderTopWidth:4, justifyContent:"center", alignItems:'center' }}>
              <Text style={{ textAlign: "center", fontSize:24, color:'white', fontStyle:'italic', textTransform:'uppercase', fontWeight:"bold"}}>No data</Text>
              </View>
            )}
          </View>

          <Text
            style={{
              textAlign:'center',
              fontWeight:'bold',
              color:'white',
              fontSize:30
            }}
            >Spending Analysis</Text>
            <View
            style={{
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            {getCashOut(data).sumFOOD ||
            getCashOut(data).sumLIVINGSERVICE ||
            getCashOut(data).sumPERSONAL ||
            getCashOut(data).sumENJOYMENT ||
            getCashOut(data).sumMOVEMENT ||
            getCashOut(data).sumEDUCATION ||
            getCashOut(data).sumHEALTHY ? (
              <View>
              <PieChart
                data={[
                  {
                    name: dataEXPENDITURE[0].label,
                    population: getCashOut(data).sumFOOD,
                    color: "brown",
                    legendFontColor: "white",
                    legendFontSize: 12,
                  },
                  {
                    name: dataEXPENDITURE[1].label,
                    population: getCashOut(data).sumLIVINGSERVICE,
                    color: "yellow",
                    legendFontColor: "white",
                    legendFontSize: 12,
                  },
                  {
                    name: dataEXPENDITURE[2].label,
                    population: getCashOut(data).sumPERSONAL,
                    color: "#000000",
                    legendFontColor: "white",
                    legendFontSize: 12,
                  },
                  {
                    name: dataEXPENDITURE[3].label,
                    population: getCashOut(data).sumENJOYMENT,
                    color: "#00FF00",
                    legendFontColor: "white",
                    legendFontSize: 12,
                  },
                  {
                    name: dataEXPENDITURE[4].label,
                    population: getCashOut(data).sumMOVEMENT,
                    color: "gray",
                    legendFontColor: "white",
                    legendFontSize: 12,
                  },
                  {
                    name: dataEXPENDITURE[5].label,
                    population: getCashOut(data).sumEDUCATION,
                    color: "#FF66FF",
                    legendFontColor: "white",
                    legendFontSize: 12,
                  },
                  {
                    name: dataEXPENDITURE[6].label,
                    population: getCashOut(data).sumHEALTHY,
                    color: "#3366CC",
                    legendFontColor: "white",
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
              <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
              <TouchableOpacity
              style={{height:30, width:"30%"}}
              onPress={()=>{navigation.navigate("Spending")}}
              >
                <View style={{flexDirection:'row'}}>
                <Text style={{fontStyle:'italic', fontWeight:'bold'}}>More Detail</Text>
                <AntDesign name="caretright" size={24} color="black" />
                </View>
              </TouchableOpacity>
              </View>
              </View>
            ) : (
              <View style ={{height:250, borderTopWidth:4, justifyContent:"center", alignItems:'center' }}>
              <Text style={{ textAlign: "center", fontSize:24, color:'white', fontStyle:'italic', textTransform:'uppercase', fontWeight:"bold"}}>No data created</Text>
              </View>
            )}
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
    height:550,
    marginHorizontal:15,
    marginTop:10,
    borderRadius:10,
  },
  spendContainer:{
    backgroundColor:'#D9001B',
    height:620,
    marginHorizontal:15,
    marginTop:10,
    borderRadius:10,
    paddingVertical:12
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