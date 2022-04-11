import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { db } from '../data/FirebaseConfig';
import { collection, getDocs, query, orderBy } from "firebase/firestore"


const Home = () => {

  
/*   const docRef = doc(db, "informattion", "Amount");
  const docSnap = await getDocs(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  } */
  



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
          }}>CASH:                             {"80.00$"}</Text>
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
    height:500,
    marginHorizontal:15,
    marginTop:10,
    borderRadius:10
  },
  spendContainer:{
    backgroundColor:'#D9001B',
    height:500,
    marginHorizontal:15,
    marginTop:10,
    borderRadius:10
  }
})
export default Home;