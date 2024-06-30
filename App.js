import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}> Kuala Lumpur </Text>
      </View>
      <View style = {styles.weather}>
        <View style = {styles.day}>
          <Text style= {styles.temp}>27</Text>
          <Text style = {styles.description}>Sunny</Text>
        </View>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:"tomato"
  },
  city:{
    flex:1.2,
    justifyContent:"center",
    alignItems: "center",
  },
  cityName:{
    color: "black",
    fontSize: 30,
    fontWeight: "500",
  },
  weather:{
    flex:3,
  },
  day:{
    flex:1,
    alignItems: "center",

  },
  temp:{
    marginTop: 50,
    fontSize: 168,
  },
  description:{
    marginTop: -20,
    fontSize: 40,
  }
})