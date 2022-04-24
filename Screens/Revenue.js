import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '../data/FirebaseConfig'
import { useIsFocused } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import Icons from "@expo/vector-icons/Ionicons";
import { BarChart } from "react-native-chart-kit";
import moment from "moment";

const Revenue = () => {
    const [dataCash, setDataCash] = useState([]);
    const isFocused = useIsFocused();

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
      }, [isFocused]);

      const getMoneyByMonth = (month) => {
        let sumCashMoney = 0;
        var date = new Date(),
          y = date.getFullYear();
        var firstDay = new Date(y, month - 1, 1).getTime();
        var lastDay = new Date(y, month, 0).getTime();
        dataCash.forEach((value) => {
          value.arrayHistory?.forEach((obj) => {
            for (let property in obj) {
              if (property === "totalMoney" && obj["category"] == "REVENUE") {
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
    return (
        <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              marginTop: 10,
              borderRadius: 8,
              paddingTop: 10,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 12,
                }}
              >
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "black",
                    flex: 1,
                  }}
                >
                  Revenue Analytics
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 12,
              }}
            >
              <Icons name="calendar" size={24} />
              <Text style={{ marginLeft: 10 }}>
                01/01/2022 -<Text>31/12/2022</Text>
              </Text>
            </View>
            <BarChart
              data={{
                labels: [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                ],
                datasets: [
                  {
                    data: [
                      getMoneyByMonth(1).sumCashMoney,
                      getMoneyByMonth(2).sumCashMoney,
                      getMoneyByMonth(3).sumCashMoney,
                      getMoneyByMonth(4).sumCashMoney,
                      getMoneyByMonth(5).sumCashMoney,
                      getMoneyByMonth(6).sumCashMoney,
                      getMoneyByMonth(7).sumCashMoney,
                      getMoneyByMonth(8).sumCashMoney,
                      getMoneyByMonth(9).sumCashMoney,
                      getMoneyByMonth(10).sumCashMoney,
                      getMoneyByMonth(11).sumCashMoney,
                      getMoneyByMonth(12).sumCashMoney,
                    ],
                    colors: [
                      (opacity = 1) => `yellow`,
                      (opacity = 1) => `red`,
                      (opacity = 1) => `green`,
                      (opacity = 1) => `blue`,
                      (opacity = 1) => `#9DA3AF`,
                      (opacity = 1) => `#424242`,
                      (opacity = 1) => `#FFCC66`,
                      (opacity = 1) => `#FF99FF`,
                      (opacity = 1) => `#00CC66`,
                      (opacity = 1) => `#CCCC33`,
                      (opacity = 1) => `#FFCC99`,
                      (opacity = 1) => `#FF9966`,
                    ],
                    withScrollableDot: true,
                  },
                ],
              }}
              showBarTops={true}
              yAxisLabel={"$"}
              withCustomBarColorFromData={true}
              flatColor={true}
              fromZero={true}
              width={Dimensions.get("window").width}
              height={Dimensions.get("window").width}
              chartConfig={{
                backgroundGradientFrom: "#9AF9D1",
                backgroundGradientTo: "#2DC475",
                decimalPlaces: 2,
                color: (opacity = 255) => `black`,
                linejoinType: "miter",
                propsForHorizontalLabels: {
                  fontSize: 10,
                },
                barPercentage: 0.4,
                backgroundColor: "red",
              }}
              verticalLabelRotation={0}
              style={{
                // marginVertical: 8,
                borderRadius: 8,
              }}
              withInnerLines={false}
            />
          </View>
        </ScrollView>
      </View>
    );
}
export default Revenue

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#9AF9D1",
    },
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
      borderWidth: 0.5,
      borderColor: "purple",
      borderRadius: 8,
      color: "black",
      textAlign: "center",
      width: 100,
    },
  });
  