import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { API_KEY } from './utils/settings';

import Weather from './component/Weather';



export default class App extends React.Component {
  state = {
    isLoading: true,
    temperatur: 0,
    weatherCondition: null,
    error: null,
  };


  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: "Error Getting Weather Condition"
        })
      }
      );
  }

  fetchWeather(lat = 25, lon = 25){
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
    .then(res => res.json())
    .then(json => { console.log(json)
    })
  }



  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text> Fetching the Weather </Text>
        ) : (
          <Weather />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
