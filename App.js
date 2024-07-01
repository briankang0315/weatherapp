import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Fontisto } from '@expo/vector-icons';


const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "1d90d4d7eda8ed0a6c203daf7fe32725";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};
export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
      return;
    }
    try{
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    if(location.length>0){
      setCity(location[0].city || "City Not Found");
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    console.log("API Response:", json);
    if (json && json.list) {
      setDays(
        json.list.filter((weather) => {
          if (weather.dt_txt.includes("00:00:00")) {
            return weather;
          }
        })
      );
    } else {
      console.error("API response does not contain list property:", json);
      setDays([]);
    }
  } catch (error) {
    console.error(error);
    setCity("Location Not Found");
    setDays([]);
  }
};


  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}> {city} </Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days === undefined ? (
          <View style={{...styles.day, alignItems: "center"}}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View style = {{flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between"}}>
                <Text style={styles.temp}>
                  {parseFloat(day.main.temp).toFixed(1)}
                </Text>
                <Fontisto name={icons[day.weather[0].main]} size={68} color="white"/>
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 38,
    fontWeight: "500",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 50,
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 100,
    color: "white",
  },
  description: {
    marginTop: -30,
    fontSize: 60,
    color: "white",
    fontWeight: "500",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    paddingLeft: 5,
  },
});