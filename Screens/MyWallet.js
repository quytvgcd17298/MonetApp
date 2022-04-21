import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { db, auth } from '../data/FirebaseConfig';
import Icons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const MyWallet = ({navigation}) => {
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
  const getCashOut = (data) => {
    let sumCash = 0;
    let SumEXPENDITUREAll = 0;

    let SumRevenueAll = 0;
    data.forEach((value) => {
      value.arrayHistory?.forEach((obj) => {
        for (let property in obj) {
          if (property === "totalMoney" && obj["category"] !== "REVENUE") {
            SumEXPENDITUREAll += obj[property];
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
    };
  };
  return (
    <View style={[styles.container, { paddingTop: 20 }]}>
      <View
        style={[styles.headerContainer, { backgroundColor: "#02F08C"}]}
        >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={24} color={"black"} />
        </TouchableOpacity>
        <Text style={styles.title}>WALLET BALANCE</Text>
      </View>
      <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
        <View
          style={{
            height: width / 3,
            width: "100%",
            backgroundColor: "#9AF9D1",
            borderRadius: 10,
            padding: 12,
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 25, color: "black", fontWeight: "bold" }}>
              CASH
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: "black",
                fontWeight: "bold",
                maxWidth: width * 0.5,
              }}
            >
              ${getCashOut(dataCash).sumCash}
            </Text>
          </View>
          <Text
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              fontSize: 20,
              color: "black",
            }}
          >
            My cash on hand
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MyWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});